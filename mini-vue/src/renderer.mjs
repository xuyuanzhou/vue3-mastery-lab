// 可注入宿主操作的简易 renderer：只支持元素/文本及简单 children（不含组件、Teleport、Hydration）。
export const h = (type,props=null,children=null) => ({type,props:props||{},children,key:props?.key,el:null})
export function createRenderer(host) {
  function patch(oldNode,newNode,container,anchor=null) {
    if(oldNode && (oldNode.type!==newNode.type || oldNode.key!==newNode.key)) {
      host.remove(oldNode.el);oldNode=null
    }
    if(!oldNode)mount(newNode,container,anchor)
    else {
      newNode.el=oldNode.el
      for(const key of Object.keys(oldNode.props))if(key!=='key' && !(key in newNode.props))host.patchProp(newNode.el,key,null)
      for(const key of Object.keys(newNode.props))if(key!=='key' && oldNode.props[key]!==newNode.props[key])host.patchProp(newNode.el,key,newNode.props[key])
      patchChildren(oldNode,newNode)
    }
  }
  function mount(vnode,container,anchor) {
    const el=vnode.el=host.createElement(vnode.type)
    for(const [key,value] of Object.entries(vnode.props))if(key!=='key')host.patchProp(el,key,value)
    if(Array.isArray(vnode.children))vnode.children.forEach(child=>patch(null,child,el))
    else if(vnode.children!=null)host.setElementText(el,String(vnode.children))
    host.insert(el,container,anchor)
  }
  function patchChildren(oldNode,nextNode) {
    const el=nextNode.el,old=oldNode.children,next=nextNode.children
    if(typeof next==='string'||typeof next==='number') {
      if(Array.isArray(old))old.forEach(v=>host.remove(v.el))
      if(old!==next)host.setElementText(el,String(next))
    } else if(Array.isArray(next)) {
      if(Array.isArray(old)) {
        // 教学版从右往左定位新锚点，未实现 Vue 的中间区间和 LIS 优化。
        const byKey=new Map(old.map((v,i)=>[v.key??`index-${i}`,v]))
        const used=new Set();let anchor=null
        for(let i=next.length-1;i>=0;i--){const n=next[i],key=n.key??`index-${i}`;const before=byKey.get(key)
          if(before && before.type===n.type){patch(before,n,el);used.add(before)}
          else patch(null,n,el,anchor)
          host.insert(n.el,el,anchor);anchor=n.el
        }
        old.filter(v=>!used.has(v)).forEach(v=>host.remove(v.el))
      }else{if(old!=null)host.setElementText(el,'');next.forEach(v=>patch(null,v,el))}
    } else {if(Array.isArray(old))old.forEach(v=>host.remove(v.el));else if(old!=null)host.setElementText(el,'')}
  }
  let oldRoot=null
  return {render(vnode,container){if(vnode){patch(oldRoot,vnode,container);oldRoot=vnode}else if(oldRoot){host.remove(oldRoot.el);oldRoot=null}}}
}
