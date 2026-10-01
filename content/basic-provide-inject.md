# 依赖注入 provide / inject

> **学习目标：**跨层级共享与响应式注入。约 20 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

祖先组件通过 `provide(key, value)` 为任意层级的后代提供数据；后代通过 `inject(key, defaultValue)` 获取。适合主题、表单上下文、局部服务等深层共享场景。

使用 Symbol 作为注入键可以降低命名冲突。提供 ref 时，注入方拿到原 ref 而不是自动解包后的普通值；如需保护写入权限，可以提供 readonly 状态和独立操作方法。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```ts
<!-- 祖先组件 setup -->
import { ref, provide, readonly } from 'vue'
const theme = ref('dark')
provide('theme', readonly(theme))
provide('changeTheme', (value: string) => { theme.value = value })

<!-- 后代组件 setup -->
import { inject } from 'vue'
const theme = inject('theme', 'light')
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

示例是分别放入不同组件的代码片段；提供 ref 时应让默认值与预期类型保持一致。不要用依赖注入取代所有显式 Props。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 在三层组件树中从最外层提供 theme，让最内层切换主题并观察最外层渲染。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

关联原型链式 provides 的创建与最近祖先匹配规则。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/apiInject.ts`](source:packages/runtime-core/src/apiInject.ts#provide)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/components/provide-inject.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
