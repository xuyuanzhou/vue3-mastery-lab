// Set 去重；用 Promise 微任务把同一轮同步操作合并。
const jobs = new Set()
const resolved = Promise.resolve()
let currentFlushPromise = null
export function queueJob(job) {
  jobs.add(job)
  if (!currentFlushPromise) currentFlushPromise = resolved.then(flushJobs)
}
function flushJobs() {
  try {
    while (jobs.size) {
      const tasks = [...jobs]
      jobs.clear()
      for (const task of tasks) task()
    }
  } finally { currentFlushPromise = null }
}
export function nextTick(fn) { const pending = currentFlushPromise || resolved; return fn ? pending.then(fn) : pending }
export const queueSize = () => jobs.size
