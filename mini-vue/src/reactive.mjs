import { track, trigger, ITERATE_KEY, effect } from './effect.mjs'
const reactiveCache = new WeakMap()
const rawLookup = new WeakMap()
const isObject = value => value !== null && typeof value === 'object'
export const toRaw = value => rawLookup.get(value) || value
export function reactive(target) {
  if (!isObject(target)) return target
  if (rawLookup.has(target)) return target
  if (reactiveCache.has(target)) return reactiveCache.get(target)
  const proxy = new Proxy(target, {
    get(raw, key, receiver) {
      const value = Reflect.get(raw, key, receiver)
      track(raw, key)
      return isObject(value) ? reactive(value) : value
    },
    set(raw, key, value, receiver) {
      const existed = Object.prototype.hasOwnProperty.call(raw, key)
      const old = raw[key]
      const ok = Reflect.set(raw, key, toRaw(value), receiver)
      if (ok && toRaw(receiver) === raw) {
        if (!existed) trigger(raw, key, 'add')
        else if (!Object.is(old, value)) trigger(raw, key)
      }
      return ok
    },
    deleteProperty(raw, key) {
      const existed = Object.prototype.hasOwnProperty.call(raw, key)
      const ok = Reflect.deleteProperty(raw, key)
      if (ok && existed) trigger(raw, key, 'delete')
      return ok
    },
    ownKeys(raw) { track(raw, ITERATE_KEY); return Reflect.ownKeys(raw) }
  })
  reactiveCache.set(target, proxy); rawLookup.set(proxy, target)
  return proxy
}
export function ref(value) {
  let raw = value, current = isObject(value) ? reactive(value) : value
  const box = { get value() { track(box,'value'); return current },
    set value(next) { if (!Object.is(raw,next)) { raw=next; current=isObject(next)?reactive(next):next; trigger(box,'value') } } }
  return box
}
export function isRef(value) { return isObject(value) && Object.prototype.hasOwnProperty.call(value, 'value') }
export function computed(getter) {
  let cached, dirty = true
  const box = { get value() {
    track(box,'value')
    if (dirty) { cached = runner(); dirty=false }
    return cached
  } }
  const runner = effect(getter,{lazy:true,scheduler:()=>{ if (!dirty) { dirty=true; trigger(box,'value') } }})
  return box
}
