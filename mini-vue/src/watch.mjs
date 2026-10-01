import { effect, stop } from './effect.mjs'
import { queueJob } from './scheduler.mjs'
export function watch(source, callback, options = {}) {
  const getter = typeof source === 'function' ? source : () => source.value
  let oldValue, cleanup
  const onCleanup = fn => { cleanup = fn }
  let runner
  const job = () => {
    if (!runner.effect.active) return
    const newValue = runner()
    if (!Object.is(newValue, oldValue)) {
      if (cleanup) { const fn=cleanup;cleanup=undefined;fn() }
      callback(newValue, oldValue, onCleanup)
      oldValue = newValue
    }
  }
  runner = effect(getter,{lazy:true,scheduler:()=>options.flush==='sync'?job():queueJob(job)})
  if (options.immediate) job()
  else oldValue = runner()
  return () => { stop(runner);if(cleanup)cleanup() }
}
export function watchEffect(fn) {
  let runner
  runner = effect(fn,{lazy:true,scheduler:()=>queueJob(runner)})
  runner()
  return () => stop(runner)
}
