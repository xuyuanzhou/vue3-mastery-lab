export type DiffOp = { type: 'keep'|'move'|'create'; key: string; index: number }
export function lisIndices(values: number[]) {
 const predecessor=values.slice(),tails:number[]=[]
 for(let i=0;i<values.length;i++){
  const val=values[i]!
  if(val<0)continue
  let low=0,high=tails.length
  while(low<high){const mid=(low+high)>>1;if(values[tails[mid]!]!<val)low=mid+1;else high=mid}
  if(low>0)predecessor[i]=tails[low-1]!
  tails[low]=i
 }
 let n=tails.length,cursor=tails[n-1],res=Array<number>(n)
 while(n>0){res[--n]=cursor!;cursor=predecessor[cursor!]}
 return res
}
export function simulateDiff(before:string[],after:string[]) {
 if(new Set(before).size!==before.length||new Set(after).size!==after.length)throw Error('同一列表中的 key 必须唯一')
 const indices=after.map(x=>before.indexOf(x)),keep=new Set(lisIndices(indices))
 const operations:DiffOp[]=after.map((key,i)=>({type:indices[i]===-1?'create':keep.has(i)?'keep':'move',key,index:i}))
 return {indices,removed:before.filter(x=>!after.includes(x)),operations,lis:operations.filter(o=>o.type==='keep').map(o=>o.key)}
}
