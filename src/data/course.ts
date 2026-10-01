export type Chapter = {
  id: string; group: string; title: string; subtitle: string; minutes: number;
  source: string; symbol: string; officialDoc?: string; level: '入门' | '进阶' | '深入';
}
export const groups: { id: string; title: string; description: string }[] = [
  { id: 'basic-start', title: '基础 01 · 认识与上手', description: 'Vue 3、Vite、单文件组件' },
  { id: 'basic-essentials', title: '基础 02 · 模板与响应式', description: '指令、响应式、表单、侦听器和生命周期' },
  { id: 'basic-components', title: '基础 03 · 组件与通信', description: 'Props、事件、v-model、插槽和注入' },
  { id: 'basic-practice', title: '基础 04 · 工程与实践', description: 'Composables、内置组件、Router、Pinia 和 TS' },
  { id: 'start', title: '00 · 阅读起点', description: '准备知识、仓库导航与调用链' },
  { id: 'reactivity', title: '01 · 响应式系统', description: 'Proxy、依赖、effect 与衍生状态' },
  { id: 'runtime', title: '02 · 运行时与组件', description: 'VNode、组件实例、挂载和生命周期' },
  { id: 'renderer', title: '03 · 渲染与更新', description: 'patch、Diff、调度队列与性能优化' },
  { id: 'compiler', title: '04 · 编译器与 SFC', description: '模板解析、AST、转换与代码生成' },
  { id: 'ecosystem', title: '05 · 生态与工程', description: 'Router、Pinia、SSR、调试和面试' },
]
export const chapters: Chapter[] = [
  { id:'basic-intro',group:'basic-start',title:'Vue 3 是什么',subtitle:'声明式渲染、组件化与两种 API 风格',minutes:14,source:'packages/vue/src/index.ts',symbol:'Vue',officialDoc:'https://cn.vuejs.org/guide/introduction.html',level:'入门' },
  { id:'basic-quick-start',group:'basic-start',title:'创建第一个 Vue 项目',subtitle:'create-vue、Vite、目录与开发命令',minutes:17,source:'packages/runtime-dom/src/index.ts',symbol:'createApp',officialDoc:'https://cn.vuejs.org/guide/quick-start.html',level:'入门' },
  { id:'basic-sfc',group:'basic-start',title:'单文件组件与 script setup',subtitle:'template、script、style scoped 的职责',minutes:19,source:'packages/compiler-sfc/src/compileScript.ts',symbol:'compileScript',officialDoc:'https://cn.vuejs.org/guide/scaling-up/sfc.html',level:'入门' },
  { id:'basic-template',group:'basic-essentials',title:'模板语法与数据绑定',subtitle:'插值、v-bind、v-on、v-html 与表达式',minutes:22,source:'packages/compiler-core/src/parser.ts',symbol:'baseParse',officialDoc:'https://cn.vuejs.org/guide/essentials/template-syntax.html',level:'入门' },
  { id:'basic-reactivity',group:'basic-essentials',title:'响应式基础：ref 与 reactive',subtitle:'声明状态、修改 .value 与解包规则',minutes:26,source:'packages/reactivity/src/ref.ts',symbol:'ref',officialDoc:'https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html',level:'入门' },
  { id:'basic-computed',group:'basic-essentials',title:'计算属性 computed',subtitle:'缓存的派生状态、getter 与 setter',minutes:19,source:'packages/reactivity/src/computed.ts',symbol:'computed',officialDoc:'https://cn.vuejs.org/guide/essentials/computed.html',level:'入门' },
  { id:'basic-class-style',group:'basic-essentials',title:'Class 与 Style 绑定',subtitle:'对象语法、数组语法与动态样式',minutes:15,source:'packages/runtime-dom/src/modules/class.ts',symbol:'patchClass',officialDoc:'https://cn.vuejs.org/guide/essentials/class-and-style.html',level:'入门' },
  { id:'basic-conditional',group:'basic-essentials',title:'条件渲染 v-if / v-show',subtitle:'挂载卸载与 CSS 显隐的选择',minutes:18,source:'packages/runtime-core/src/renderer.ts',symbol:'patch',officialDoc:'https://cn.vuejs.org/guide/essentials/conditional.html',level:'入门' },
  { id:'basic-list',group:'basic-essentials',title:'列表渲染 v-for 与 key',subtitle:'数组更新、过滤排序及节点身份',minutes:21,source:'packages/runtime-core/src/renderer.ts',symbol:'patchKeyedChildren',officialDoc:'https://cn.vuejs.org/guide/essentials/list.html',level:'入门' },
  { id:'basic-events',group:'basic-essentials',title:'事件处理与事件修饰符',subtitle:'方法处理器、内联处理器及 .stop/.prevent',minutes:18,source:'packages/runtime-dom/src/modules/events.ts',symbol:'patchEvent',officialDoc:'https://cn.vuejs.org/guide/essentials/event-handling.html',level:'入门' },
  { id:'basic-forms',group:'basic-essentials',title:'表单绑定 v-model',subtitle:'input、checkbox、radio、select 与修饰符',minutes:24,source:'packages/runtime-dom/src/directives/vModel.ts',symbol:'vModelText',officialDoc:'https://cn.vuejs.org/guide/essentials/forms.html',level:'入门' },
  { id:'basic-watch',group:'basic-essentials',title:'侦听器 watch 与 watchEffect',subtitle:'数据源、immediate、清理和 flush',minutes:25,source:'packages/reactivity/src/watch.ts',symbol:'watch',officialDoc:'https://cn.vuejs.org/guide/essentials/watchers.html',level:'入门' },
  { id:'basic-template-refs',group:'basic-essentials',title:'模板引用与 DOM 操作',subtitle:'ref、挂载时机及组件实例引用',minutes:16,source:'packages/runtime-core/src/rendererTemplateRef.ts',symbol:'setRef',officialDoc:'https://cn.vuejs.org/guide/essentials/template-refs.html',level:'入门' },
  { id:'basic-lifecycle',group:'basic-essentials',title:'生命周期与 nextTick',subtitle:'挂载、更新、卸载及 DOM 提交时机',minutes:23,source:'packages/runtime-core/src/apiLifecycle.ts',symbol:'onMounted',officialDoc:'https://cn.vuejs.org/guide/essentials/lifecycle.html',level:'入门' },
  { id:'basic-components',group:'basic-components',title:'组件基础与注册',subtitle:'拆分 UI、局部导入及单向数据流',minutes:22,source:'packages/runtime-core/src/component.ts',symbol:'setupComponent',officialDoc:'https://cn.vuejs.org/guide/essentials/component-basics.html',level:'入门' },
  { id:'basic-props',group:'basic-components',title:'Props 与单向数据流',subtitle:'声明、校验、默认值及解构注意事项',minutes:22,source:'packages/runtime-core/src/componentProps.ts',symbol:'initProps',officialDoc:'https://cn.vuejs.org/guide/components/props.html',level:'入门' },
  { id:'basic-emits',group:'basic-components',title:'组件事件与 defineEmits',subtitle:'父子通信、事件载荷及事件命名',minutes:18,source:'packages/runtime-core/src/componentEmits.ts',symbol:'emit',officialDoc:'https://cn.vuejs.org/guide/components/events.html',level:'入门' },
  { id:'basic-component-model',group:'basic-components',title:'组件 v-model 双向协议',subtitle:'defineModel 与 update:modelValue',minutes:21,source:'packages/runtime-core/src/helpers/useModel.ts',symbol:'useModel',officialDoc:'https://cn.vuejs.org/guide/components/v-model.html',level:'入门' },
  { id:'basic-slots',group:'basic-components',title:'插槽与作用域插槽',subtitle:'默认、具名及插槽 Props',minutes:23,source:'packages/runtime-core/src/componentSlots.ts',symbol:'initSlots',officialDoc:'https://cn.vuejs.org/guide/components/slots.html',level:'入门' },
  { id:'basic-provide-inject',group:'basic-components',title:'依赖注入 provide / inject',subtitle:'跨层级共享与响应式注入',minutes:20,source:'packages/runtime-core/src/apiInject.ts',symbol:'provide',officialDoc:'https://cn.vuejs.org/guide/components/provide-inject.html',level:'入门' },
  { id:'basic-async-components',group:'basic-components',title:'异步组件 defineAsyncComponent',subtitle:'按需加载、加载态与失败重试',minutes:18,source:'packages/runtime-core/src/apiAsyncComponent.ts',symbol:'defineAsyncComponent',officialDoc:'https://cn.vuejs.org/guide/components/async.html',level:'入门' },
  { id:'basic-composables',group:'basic-practice',title:'组合式函数 Composables',subtitle:'复用有状态逻辑与资源清理',minutes:24,source:'packages/reactivity/src/effectScope.ts',symbol:'EffectScope',officialDoc:'https://cn.vuejs.org/guide/reusability/composables.html',level:'入门' },
  { id:'basic-directives',group:'basic-practice',title:'自定义指令',subtitle:'DOM 行为复用与指令钩子',minutes:17,source:'packages/runtime-core/src/directives.ts',symbol:'withDirectives',officialDoc:'https://cn.vuejs.org/guide/reusability/custom-directives.html',level:'入门' },
  { id:'basic-transition',group:'basic-practice',title:'Transition 与 TransitionGroup',subtitle:'进出场动画和列表过渡',minutes:21,source:'packages/runtime-dom/src/components/Transition.ts',symbol:'Transition',officialDoc:'https://cn.vuejs.org/guide/built-ins/transition.html',level:'入门' },
  { id:'basic-keep-alive',group:'basic-practice',title:'KeepAlive 与动态组件',subtitle:'缓存组件实例、激活和失活',minutes:18,source:'packages/runtime-core/src/components/KeepAlive.ts',symbol:'KeepAlive',officialDoc:'https://cn.vuejs.org/guide/built-ins/keep-alive.html',level:'入门' },
  { id:'basic-teleport',group:'basic-practice',title:'Teleport 跨 DOM 层级渲染',subtitle:'弹窗、定位与组件逻辑层级',minutes:18,source:'packages/runtime-core/src/components/Teleport.ts',symbol:'TeleportImpl',officialDoc:'https://cn.vuejs.org/guide/built-ins/teleport.html',level:'入门' },
  { id:'basic-router',group:'basic-practice',title:'Vue Router 使用基础',subtitle:'路由表、RouterView、RouterLink 和守卫',minutes:26,source:'packages/runtime-core/src/component.ts',symbol:'setupComponent',officialDoc:'https://cn.vuejs.org/guide/scaling-up/routing.html',level:'入门' },
  { id:'basic-pinia',group:'basic-practice',title:'Pinia 状态管理基础',subtitle:'defineStore、state/getters/actions 与解构',minutes:25,source:'packages/reactivity/src/effectScope.ts',symbol:'effectScope',officialDoc:'https://cn.vuejs.org/guide/scaling-up/state-management.html',level:'入门' },
  { id:'basic-typescript',group:'basic-practice',title:'Vue 3 与 TypeScript',subtitle:'defineProps/defineEmits 类型、ref 推断',minutes:22,source:'packages/compiler-sfc/src/compileScript.ts',symbol:'compileScript',officialDoc:'https://cn.vuejs.org/guide/typescript/composition-api.html',level:'入门' },
  { id:'basic-testing',group:'basic-practice',title:'测试、调试与项目实践',subtitle:'组件测试、Vue Devtools 和性能排查',minutes:22,source:'packages/runtime-core/src/renderer.ts',symbol:'patch',officialDoc:'https://cn.vuejs.org/guide/scaling-up/testing.html',level:'入门' },
  { id:'reading',group:'start',title:'源码阅读路线与 Vue Monorepo',subtitle:'从公开 API 定位具体实现与测试',minutes:14,source:'packages/vue/src/index.ts',symbol:'Vue',level:'入门' },
  { id:'javascript',group:'start',title:'JS 基础：Proxy、Reflect 与微任务',subtitle:'读懂响应式和调度器的前置概念',minutes:22,source:'packages/reactivity/src/reactive.ts',symbol:'createReactiveObject',level:'入门' },
  { id:'reactive',group:'reactivity',title:'reactive 与 readonly',subtitle:'对象代理、缓存、深浅代理与身份约束',minutes:26,source:'packages/reactivity/src/reactive.ts',symbol:'reactive',level:'进阶' },
  { id:'ref',group:'reactivity',title:'ref 与 toRef / toRefs',subtitle:'统一的 .value 访问及属性代理',minutes:23,source:'packages/reactivity/src/ref.ts',symbol:'ref',level:'进阶' },
  { id:'dep',group:'reactivity',title:'track / trigger 与 Dep',subtitle:'读写时收集依赖，变化时通知订阅者',minutes:32,source:'packages/reactivity/src/dep.ts',symbol:'track',level:'深入' },
  { id:'effect',group:'reactivity',title:'ReactiveEffect 与依赖清理',subtitle:'活跃订阅者、分支切换与 stop',minutes:29,source:'packages/reactivity/src/effect.ts',symbol:'ReactiveEffect',level:'深入' },
  { id:'computed',group:'reactivity',title:'computed 缓存与失效',subtitle:'按需求值、版本检测与只读计算',minutes:23,source:'packages/reactivity/src/computed.ts',symbol:'computed',level:'深入' },
  { id:'watch',group:'reactivity',title:'watch / watchEffect 源码',subtitle:'依赖来源、清理回调与 flush 时机',minutes:29,source:'packages/reactivity/src/watch.ts',symbol:'watch',level:'深入' },
  { id:'effect-scope',group:'reactivity',title:'effectScope 与 onScopeDispose',subtitle:'把多个副作用绑定到共同生命周期',minutes:17,source:'packages/reactivity/src/effectScope.ts',symbol:'EffectScope',level:'进阶' },
  { id:'vnode',group:'runtime',title:'VNode、ShapeFlags 与规范化',subtitle:'用轻量结构描述 UI 而不是创建真实 DOM',minutes:24,source:'packages/runtime-core/src/vnode.ts',symbol:'createVNode',level:'进阶' },
  { id:'create-app',group:'runtime',title:'createApp 与应用挂载',subtitle:'从公开入口到 renderer.render 的完整路径',minutes:22,source:'packages/runtime-dom/src/index.ts',symbol:'createApp',level:'进阶' },
  { id:'component',group:'runtime',title:'组件实例与 setup',subtitle:'props、slots、代理对象和 setupContext',minutes:33,source:'packages/runtime-core/src/component.ts',symbol:'setupComponent',level:'深入' },
  { id:'lifecycle',group:'runtime',title:'组件生命周期与卸载',subtitle:'onMounted 为什么不在 setup 中直接执行',minutes:24,source:'packages/runtime-core/src/apiLifecycle.ts',symbol:'onMounted',level:'进阶' },
  { id:'provide',group:'runtime',title:'provide / inject 与插槽',subtitle:'原型链继承和组件作用域传递',minutes:20,source:'packages/runtime-core/src/apiInject.ts',symbol:'provide',level:'进阶' },
  { id:'render',group:'renderer',title:'渲染器：patch 与处理分支',subtitle:'挂载、更新、卸载以及宿主环境抽象',minutes:34,source:'packages/runtime-core/src/renderer.ts',symbol:'patch',level:'深入' },
  { id:'keyed-diff',group:'renderer',title:'双端 Diff 与最长递增子序列',subtitle:'key 如何指导复用、删除和移动',minutes:39,source:'packages/runtime-core/src/renderer.ts',symbol:'patchKeyedChildren',level:'深入' },
  { id:'component-update',group:'renderer',title:'组件更新与 render effect',subtitle:'响应式变化如何最终成为 DOM patch',minutes:31,source:'packages/runtime-core/src/renderer.ts',symbol:'setupRenderEffect',level:'深入' },
  { id:'scheduler',group:'renderer',title:'调度器、nextTick 与更新批处理',subtitle:'队列去重、pre/post flush 和微任务',minutes:31,source:'packages/runtime-core/src/scheduler.ts',symbol:'queueJob',level:'深入' },
  { id:'optimization',group:'renderer',title:'PatchFlags、Block Tree 与静态提升',subtitle:'编译期信息如何缩小运行时比较范围',minutes:27,source:'packages/runtime-core/src/renderer.ts',symbol:'patchBlockChildren',level:'深入' },
  { id:'compiler',group:'compiler',title:'编译全链路：template 到 render',subtitle:'baseCompile 和 transform/codegen 的分工',minutes:32,source:'packages/compiler-core/src/compile.ts',symbol:'baseCompile',level:'深入' },
  { id:'parse',group:'compiler',title:'Parse：从模板到 AST',subtitle:'节点、指令与源位置的信息保留',minutes:24,source:'packages/compiler-core/src/parser.ts',symbol:'baseParse',level:'深入' },
  { id:'transform',group:'compiler',title:'Transform：指令和优化信息',subtitle:'节点转换、helper 收集和 PatchFlags',minutes:28,source:'packages/compiler-core/src/transform.ts',symbol:'transform',level:'深入' },
  { id:'codegen',group:'compiler',title:'Codegen 与 render 函数',subtitle:'从 AST 生成可执行的渲染代码',minutes:24,source:'packages/compiler-core/src/codegen.ts',symbol:'generate',level:'深入' },
  { id:'sfc',group:'compiler',title:'SFC、script setup 与宏',subtitle:'defineProps 是编译宏而非运行时函数',minutes:30,source:'packages/compiler-sfc/src/compileScript.ts',symbol:'compileScript',level:'深入' },
  { id:'router',group:'ecosystem',title:'Vue Router 的响应式导航',subtitle:'路由匹配、守卫与视图渲染',minutes:23,source:'packages/runtime-core/src/component.ts',symbol:'setupComponent',level:'进阶' },
  { id:'pinia',group:'ecosystem',title:'Pinia：状态、getter 与 action',subtitle:'组合式 Store 如何借助 Vue 响应式',minutes:23,source:'packages/reactivity/src/effectScope.ts',symbol:'effectScope',level:'进阶' },
  { id:'ssr',group:'ecosystem',title:'SSR、Hydration 与客户端接管',subtitle:'服务端 HTML 和客户端 VNode 如何对齐',minutes:28,source:'packages/runtime-core/src/hydration.ts',symbol:'createHydrationFunctions',level:'深入' },
  { id:'debug',group:'ecosystem',title:'断点调试、性能优化与源码面试',subtitle:'用真实调用链解释一次响应式更新',minutes:28,source:'packages/runtime-core/src/renderer.ts',symbol:'patch',level:'进阶' }
]
export const chapterMap = new Map(chapters.map(c => [c.id, c]))
const raw = import.meta.glob('../../content/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
export const articles: Record<string, string> = Object.fromEntries(
  Object.entries(raw).map(([path, value]) => [path.split('/').pop()!.replace(/\.md$/, ''), value])
)
export const linkTo = (id: string) => `/learn/${id}`
export const officialUrl = (path: string) => `https://github.com/vuejs/core/blob/v3.5.43/${path}`
export const sourceRawUrl = (path: string) => `https://raw.githubusercontent.com/vuejs/core/v3.5.43/${path}`
