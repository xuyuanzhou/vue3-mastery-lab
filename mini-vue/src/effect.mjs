// Mini Vue — 教学版依赖收集。Vue 3.5 官方实现使用 Dep/Link/版本机制；本文件用 Set 便于观察。
const targetMap = new WeakMap()
export const ITERATE_KEY = Symbol('iterate')
let activeEffect
const effectStack = []
function cleanup(subscriber) {
  for (const dep of subscriber.deps) dep.delete(subscriber)
  subscriber.deps.length = 0
}
export class ReactiveEffect {
  constructor(fn, scheduler) { this.fn = fn; this.scheduler = scheduler; this.deps = []; this.active = true }
  run() {
    if (!this.active) return this.fn()
    if (effectStack.includes(this)) return // 教学版防止直接自触发
    cleanup(this)
    try {
      effectStack.push(this); activeEffect = this
      return this.fn()
    } finally {
      effectStack.pop(); activeEffect = effectStack.at(-1)
    }
  }
  stop() { if (this.active) { cleanup(this); this.active = false } }
}
export function effect(fn, options = {}) {
  const subscriber = new ReactiveEffect(fn, options.scheduler)
  const runner = subscriber.run.bind(subscriber)
  runner.effect = subscriber
  if (!options.lazy) runner()
  return runner
}
export function stop(runner) { runner.effect.stop() }
export function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, depsMap = new Map())
  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, dep = new Set())
  if (!dep.has(activeEffect)) { dep.add(activeEffect); activeEffect.deps.push(dep) }
}
export function trigger(target, key, type = 'set') {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const subscribers = new Set(depsMap.get(key))
  if (type === 'add' || type === 'delete') for (const e of depsMap.get(ITERATE_KEY) ?? []) subscribers.add(e)
  for (const sub of subscribers) {
    if (sub === activeEffect || !sub.active) continue
    if (sub.scheduler) sub.scheduler()
    else sub.run()
  }
}
