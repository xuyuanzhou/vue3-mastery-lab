/** 独立教学讲解：不复制/修改 Vue 官方源码。锚点基于 vuejs/core v3.5.43。 */
export type SourceNote = { symbol: string; summary: string; focus: string; chapter: string }
export const sourceNotes: Record<string,SourceNote[]> = {
 'packages/reactivity/src/reactive.ts': [
  {symbol:'reactive',summary:'公开的深度响应式转换入口。',focus:'继续跟 createReactiveObject：缓存代理、选择 handler，以及为什么重复转换复用已有代理。',chapter:'reactive'},
  {symbol:'createReactiveObject',summary:'建立 Proxy 时的类型判定、缓存与代理处理器选择。',focus:'比较 mutable/readonly 及对象/集合处理器，注意不可观察目标和身份检查。',chapter:'reactive'}],
 'packages/reactivity/src/ref.ts': [
  {symbol:'ref',summary:'把一个值转换成具有 .value 的响应式引用。',focus:'从 createRef 进入 RefImpl；对照 shallowRef、对象值转换和 set 时的变化判断。',chapter:'ref'},
  {symbol:'RefImpl',summary:'ref 内部持有原始值、响应式值及订阅关系。',focus:'观察 .value getter/setter 的依赖追踪与通知。',chapter:'ref'}],
 'packages/reactivity/src/dep.ts': [
  {symbol:'track',summary:'按 target 与 key 定位需要收集的依赖。',focus:'对照 Vue 3.5 的 Dep/Link 模型及开发态调试事件，不能简单等同教学 Set。',chapter:'dep'},
  {symbol:'trigger',summary:'属性变化后按操作类型选择需要通知的依赖。',focus:'比较 SET、ADD、DELETE 以及数组与集合迭代相关分支。',chapter:'dep'}],
 'packages/reactivity/src/effect.ts': [
  {symbol:'ReactiveEffect',summary:'响应式订阅者，封装 run、stop 和 scheduler。',focus:'重点跟踪活跃订阅者、依赖链接维护和清理，比较同步执行与 scheduler。',chapter:'effect'},
  {symbol:'effect',summary:'创建 ReactiveEffect 并根据参数立即运行或按需执行。',focus:'观察 runner 与底层订阅者的关系；它与组件 render effect 不完全等同。',chapter:'effect'}],
 'packages/reactivity/src/computed.ts': [
  {symbol:'computed',summary:'构造一个惰性、可缓存的派生 ref。',focus:'关注上游依赖的版本与失效处理，理解为什么多次读取不重复运行 getter。',chapter:'computed'}],
 'packages/reactivity/src/watch.ts': [
  {symbol:'watch',summary:'建立来源与回调之间的订阅关系。',focus:'区别 getter 来源、oldValue、cleanup、immediate 和调度职责。',chapter:'watch'}],
 'packages/reactivity/src/effectScope.ts': [
  {symbol:'EffectScope',summary:'把多个副作用和清理回调归入同一生命周期。',focus:'阅读 run 和 stop 的实现，观察嵌套 scope 与 detached 的不同。',chapter:'effect-scope'}],
 'packages/runtime-core/src/vnode.ts': [
  {symbol:'createVNode',summary:'构造包含 type、props、children、shapeFlag 的 VNode。',focus:'关注子节点规范化和动态优化标记；VNode 不等于真实 DOM。',chapter:'vnode'}],
 'packages/runtime-dom/src/index.ts': [
  {symbol:'createApp',summary:'将平台无关渲染器包装成浏览器应用入口。',focus:'继续追踪 ensureRenderer、mount 以及 runtime-dom 提供的宿主操作。',chapter:'create-app'}],
 'packages/runtime-core/src/component.ts': [
  {symbol:'setupComponent',summary:'组件初始化阶段：props、slots、setup 及其返回值。',focus:'区别 setupState、render、instance.proxy 和依赖注入的上下文。',chapter:'component'}],
 'packages/runtime-core/src/apiLifecycle.ts': [
  {symbol:'onMounted',summary:'注册 mounted 钩子而不是立即执行回调。',focus:'追踪 injectHook 到 renderer 的调用阶段，注意同步注册需要实例上下文。',chapter:'lifecycle'}],
 'packages/runtime-core/src/apiInject.ts': [
  {symbol:'provide',summary:'在当前实例上提供可沿祖先原型链查找的值。',focus:'为什么首次提供时需要新建以父级 provides 为原型的对象。',chapter:'provide'}],
 'packages/runtime-core/src/renderer.ts': [
  {symbol:'patch',summary:'对比旧、新 VNode 并按节点类型进行分派。',focus:'查看不同 type 的卸载策略，进入 processElement/processComponent 和子树协调。',chapter:'render'},
  {symbol:'patchKeyedChildren',summary:'处理带稳定 key 的子节点序列。',focus:'依次定位双端同步、新 key 映射、LIS 和从右往左的宿主插入/移动。',chapter:'keyed-diff'},
  {symbol:'setupRenderEffect',summary:'为组件建立负责首次挂载和后续更新的响应式副作用。',focus:'连接 trigger、queueJob、renderComponentRoot 和 patch。',chapter:'component-update'},
  {symbol:'patchBlockChildren',summary:'利用编译期收集的动态后代列表减少比较范围。',focus:'与完整 children patch 对比，理解 Block Tree 优化场景。',chapter:'optimization'}],
 'packages/runtime-core/src/scheduler.ts': [
  {symbol:'queueJob',summary:'把组件作业放入可去重的刷新队列。',focus:'结合 flushJobs、作业优先级和 nextTick 区分同步修改与 DOM 更新时点。',chapter:'scheduler'}],
 'packages/compiler-core/src/compile.ts': [
  {symbol:'baseCompile',summary:'compiler-core 的 parse、transform、generate 编译入口。',focus:'查看传给各阶段的 AST、选项和生成结果。',chapter:'compiler'}],
 'packages/compiler-core/src/parser.ts': [
  {symbol:'baseParse',summary:'将模板解析为保留节点类型和源位置信息的 AST。',focus:'追踪标签、插值和指令节点的解析分支。',chapter:'parse'}],
 'packages/compiler-core/src/transform.ts': [
  {symbol:'transform',summary:'执行 AST 节点转换并收集代码生成所需的信息。',focus:'寻找转换插件的进入/退出顺序及 helper 记录。',chapter:'transform'}],
 'packages/compiler-core/src/codegen.ts': [
  {symbol:'generate',summary:'从转换后 AST 输出 render 代码。',focus:'重点观察函数前导、helper 引用和各类表达式生成。',chapter:'codegen'}],
 'packages/compiler-sfc/src/compileScript.ts': [
  {symbol:'compileScript',summary:'处理 script setup 及 defineProps 等编译宏。',focus:'宏处理、绑定元数据与模板编译之间的联系。',chapter:'sfc'}]
}
