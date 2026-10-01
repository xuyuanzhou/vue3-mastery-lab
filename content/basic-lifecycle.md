# 生命周期与 nextTick

> **学习目标：**挂载、更新、卸载及 DOM 提交时机。约 23 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

组件经历创建、挂载、响应式更新和卸载。Composition API 通过 `onMounted`、`onUpdated`、`onUnmounted` 等函数注册钩子，它们应在 setup 的同步阶段注册。

挂载后才能稳定访问 DOM；卸载时清理定时器、事件监听和其他外部资源。Vue 会批处理 DOM 更新，因此刚修改响应式状态后如果需要读取更新后的 DOM，请使用 `await nextTick()`。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
const count = ref(0)
onMounted(() => console.log('已挂载'))
onUnmounted(() => console.log('已卸载'))
async function increase() {
  count.value++
  await nextTick()
  console.log('本轮 DOM 更新结束')
}
</script>
<template><button @click="increase">{{ count }}</button></template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

不要在 onUpdated 内无条件修改它所依赖的状态，否则可能造成无限更新。清理事件/定时器不能只依赖浏览器离开页面。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 制作一个可切换显隐的子组件，用控制台记录挂载、更新、卸载，再观察 keep-alive 的不同表现。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

对照 apiLifecycle 的钩子注册与 scheduler 的刷新时机。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/apiLifecycle.ts`](source:packages/runtime-core/src/apiLifecycle.ts#onMounted)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/lifecycle.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
