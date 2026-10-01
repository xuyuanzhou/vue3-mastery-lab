import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reactive, ref, computed, toRaw } from '../src/reactive.mjs'
import { effect,stop } from '../src/effect.mjs'
import { queueJob,nextTick } from '../src/scheduler.mjs'
import { watch } from '../src/watch.mjs'
import { keyedDiff,longestIncreasingSubsequence } from '../src/diff.mjs'
test('reactive 缓存身份和嵌套代理',()=>{const raw={nested:{n:1}};const x=reactive(raw);assert.equal(reactive(raw),x);assert.equal(toRaw(x),raw);x.nested.n=2;assert.equal(raw.nested.n,2)})
test('effect 依赖追踪、分支切换和 stop',()=>{const x=reactive({ok:true,a:1,b:2});let calls=0;const runner=effect(()=>{calls++;return x.ok?x.a:x.b});assert.equal(calls,1);x.ok=false;assert.equal(calls,2);x.a++;assert.equal(calls,2);x.b++;assert.equal(calls,3);stop(runner);x.b++;assert.equal(calls,3)})
test('computed 缓存与下游通知',()=>{const n=ref(1);let calculations=0;const c=computed(()=>{calculations++;return n.value*2});assert.equal(c.value,2);assert.equal(c.value,2);assert.equal(calculations,1);let observed=0;effect(()=>{observed=c.value});n.value=2;assert.equal(observed,4);assert.equal(calculations,2)})
test('调度器微任务合并',async()=>{let calls=0;const job=()=>calls++;queueJob(job);queueJob(job);assert.equal(calls,0);await nextTick();assert.equal(calls,1)})
test('watch 清理和异步合并',async()=>{const n=ref(0);let called=0,cleaned=0;const unwatch=watch(n,(_a,_b,onCleanup)=>{called++;onCleanup(()=>cleaned++)});n.value=1;n.value=2;await nextTick();assert.equal(called,1);n.value=3;await nextTick();assert.equal(cleaned,1);unwatch();assert.equal(cleaned,2)})
test('keyed diff 保留稳定序列并检测重复 key',()=>{const result=keyedDiff(['A','B','C','D'],['B','D','A','C']);assert.equal(result.removed.length,0);assert.equal(result.operations.filter(o=>o.type==='move').length,2);assert.equal(longestIncreasingSubsequence([1,3,0,2]).length,2);assert.throws(()=>keyedDiff(['A','A'],['A']),/唯一/)})
test('简易 renderer：元素挂载、属性更新及 keyed 子节点复用',async()=>{
  const { h, createRenderer } = await import('../src/renderer.mjs')
  const root={type:'root',children:[]}
  const host={
    createElement:type=>({type,props:{},text:'',children:[],parent:null}),
    patchProp:(el,key,value)=>{if(value==null)delete el.props[key];else el.props[key]=value},
    setElementText:(el,text)=>{el.children=[];el.text=text},
    insert:(el,parent,anchor=null)=>{if(el.parent){const list=el.parent.children,at=list.indexOf(el);if(at>=0)list.splice(at,1)}el.parent=parent;const index=anchor?parent.children.indexOf(anchor):-1;if(index>=0)parent.children.splice(index,0,el);else parent.children.push(el)},
    remove:el=>{if(el?.parent){const list=el.parent.children,at=list.indexOf(el);if(at>=0)list.splice(at,1);el.parent=null}}
  }
  const renderer=createRenderer(host)
  renderer.render(h('ul',{id:'list'},[h('li',{key:'A'},'A'),h('li',{key:'B'},'B')]),root)
  const a=root.children[0].children[0]
  const b=root.children[0].children[1]
  renderer.render(h('ul',{class:'new'},[h('li',{key:'B'},'B'),h('li',{key:'A'},'A')]),root)
  assert.equal(root.children[0].props.id,undefined)
  assert.equal(root.children[0].props.class,'new')
  assert.deepEqual(root.children[0].children,[b,a])
  renderer.render(null,root)
  assert.equal(root.children.length,0)
})
