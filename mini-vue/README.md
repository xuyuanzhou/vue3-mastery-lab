# Mini Vue 教学实现

`src/effect.mjs`：WeakMap/Map/Set 依赖模型、ReactiveEffect 和 stop。
`src/reactive.mjs`：Proxy 深层响应式、ref、computed。
`src/scheduler.mjs`：微任务队列去重和 nextTick。
`src/watch.mjs`：watch/watchEffect 的教学实现。
`src/diff.mjs`：keyed diff 匹配与最长递增子序列分析。
`src/renderer.mjs`：通过宿主操作注入实现的基础元素渲染器。

运行 `npm run mini:demo`、`npm test`；这些命令只需要 Node.js 20+，不用安装第三方依赖。

**边界**：本实现是刻意压缩的教学模型，不是 Vue 源码复制，也不是可替代生产环境 Vue 的运行时。特别是 Vue 3.5 的 Dep/Link/版本缓存、组件逻辑、完整 patchKeyedChildren、编译器、集合响应式、数组优化和调度器作业排序均以官方源码为准。
