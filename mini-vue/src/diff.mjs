// 纯函数模拟 keyed diff 的重要步骤：匹配、LIS、移动/新建/删除。
// Vue 真正的 patchKeyedChildren 还要处理前后缀、锚点、VNode patch 和边界情况。
export function longestIncreasingSubsequence(values) {
  const predecessors = values.slice()
  const tails = []
  for (let i=0;i<values.length;i++) {
    const value=values[i]
    if (value < 0) continue // -1 表示新建，不参与 LIS
    let l=0,r=tails.length
    while(l<r) { const mid=(l+r)>>1; if(values[tails[mid]]<value) l=mid+1; else r=mid }
    if(l>0)predecessors[i]=tails[l-1]
    tails[l]=i
  }
  let cursor=tails.length, last=tails[cursor-1]
  const result=Array(cursor)
  while(cursor>0) {result[--cursor]=last;last=predecessors[last]}
  return result
}
export function keyedDiff(oldKeys, newKeys) {
  if(new Set(oldKeys).size!==oldKeys.length || new Set(newKeys).size!==newKeys.length)
    throw Error('key 必须唯一')
  const oldIndex = new Map(oldKeys.map((key,i)=>[key,i]))
  const newSet = new Set(newKeys)
  const removed = oldKeys.filter(key=>!newSet.has(key))
  const indexed = newKeys.map(key=>oldIndex.has(key)?oldIndex.get(key):-1)
  const keepIndices = new Set(longestIncreasingSubsequence(indexed))
  const operations = newKeys.map((key,i)=>indexed[i]===-1
    ?{type:'create',key,index:i}
    :keepIndices.has(i)?{type:'keep',key,index:i}:{type:'move',key,index:i})
  return {removed,indexed,lis:[...keepIndices].map(i=>newKeys[i]),operations}
}
