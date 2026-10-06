# 插槽与作用域插槽

> **学习目标**：默认、具名及插槽 Props。约 23 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

插槽允许父组件向子组件传入可渲染的模板内容。`<slot>` 是子组件中的占位出口；`v-slot`（简写 `#`）用于绑定具名插槽或接收子组件提供的插槽 Props。

把结构和视觉容器封装在子组件，把具体内容交给父组件决定。作用域插槽是子组件把自己掌握的数据提供给父组件的模板使用。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<!-- Panel.vue -->
<template>
  <section>
    <header><slot name="header">默认标题</slot></header>
    <main><slot :message="'来自 Panel 的数据'" /></main>
  </section>
</template>

<!-- 父组件用法 -->
<!-- <Panel><template #header>概览</template>
     <template #default="{ message }">{{ message }}</template></Panel> -->
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

插槽内容在父组件的作用域内求值，不能在父组件模板里直接访问子组件的私有变量；需由子组件显式暴露 slot props。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 制作 Card 组件，支持 header、default、footer 三个插槽，并给 default 提供一个状态值。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

从组件 slots 规范化与 renderSlot 跟踪插槽如何执行。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/componentSlots.ts`](source:packages/runtime-core/src/componentSlots.ts#initSlots)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/components/slots.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
