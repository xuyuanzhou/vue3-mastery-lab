# Props 与单向数据流

> **学习目标**：声明、校验、默认值及解构注意事项。约 22 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

Props 是父组件传入子组件的只读输入。`defineProps()` 支持运行时声明或 TypeScript 类型声明；复杂对象 Props 也应遵循单向数据流，避免子组件悄悄修改父状态。

想让子组件改变外部数据，应发出事件或通过组件 v-model 协议更新。Vue 3.5+ 在同一 `<script setup>` 中支持对 `defineProps` 解构变量的响应式追踪，但传给普通函数时仍需注意值与 getter 的区别。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  count?: number
}>(), { count: 0 })
</script>
<template><h3>{{ props.title }}（{{ props.count }}）</h3></template>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

Props 只读约束不能替你防止嵌套对象被间接修改；团队内要明确谁有修改权。`withDefaults` 适用于基于类型的 props 默认值声明。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 给 UserCard 添加可选的年龄 Props 与默认值，并模拟父组件更新，观察子组件如何刷新。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

关联 initProps 如何建立组件 Props 数据结构。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/componentProps.ts`](source:packages/runtime-core/src/componentProps.ts#initProps)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/components/props.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
