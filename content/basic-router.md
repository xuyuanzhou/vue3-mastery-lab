# Vue Router 使用基础

> **学习目标**：路由表、RouterView、RouterLink 和守卫。约 26 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

Vue Router 为 SPA 管理 URL 与组件之间的映射。通过 `createRouter` 定义路由表，`RouterView` 渲染当前匹配的组件，`RouterLink` 发起客户端导航。

Hash 和 HTML5 History 各有部署要求；路由参数、query 与导航守卫用于描述页面状态和访问流程。路由状态不应成为所有组件内部状态的替代品。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/users/:id', component: () => import('./views/User.vue') }
  ]
})
export default router
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

需要在入口 `app.use(router)`，并让根组件渲染 `<RouterView />`。该示例与本项目的 Hash History 一致；Vue Router 属于独立仓库。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 添加一个用户详情页，读取 route.params.id，再提供返回首页的 RouterLink。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

路由内部源码请从 Vue Router 官方仓库开始，右侧 Vue 核心仅作组件运行时对照。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/component.ts`](source:packages/runtime-core/src/component.ts#setupComponent)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/scaling-up/routing.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
