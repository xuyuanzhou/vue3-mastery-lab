import { reactive, ref, computed } from './src/reactive.mjs'
import { effect } from './src/effect.mjs'
import { queueJob,nextTick } from './src/scheduler.mjs'
import { keyedDiff } from './src/diff.mjs'
const count=ref(1),double=computed(()=>count.value*2)
const log=[]
let runner
runner=effect(()=>log.push(`render: ${count.value} / computed: ${double.value}`),{lazy:true,scheduler:()=>queueJob(runner)})
runner();count.value=2;count.value=3
await nextTick()
console.log('响应式和批处理：',log)
console.log('Keyed Diff：',keyedDiff(['A','B','C','D'],['B','D','A','C']))
const state=reactive({ok:true,a:1,b:2});let times=0
effect(()=>{times++;return state.ok?state.a:state.b})
state.ok=false;state.a=100
console.log('分支依赖切换后 effect 运行次数：',times)
