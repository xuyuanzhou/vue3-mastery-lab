# 组件 v-model 双向协议

> **学习目标：**defineModel 与 update:modelValue。约 21 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

组件 `v-model` 本质是父组件向子组件传值，子组件发事件通知更新。Vue 3.4+ 可以使用 `defineModel()` 简化常见的 `modelValue` / `update:modelValue` 配对。

多个 v-model 可以通过参数命名，如 `v-model:first-name`。复杂组件应明确对外的 model 值类型、默认值和修改行为，避免与本地暂存状态混淆。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<!-- SearchBox.vue -->
<script setup lang="ts">
const keyword = defineModel<string>({ required: true })
</script>
<template><input v-model="keyword" placeholder="输入关键词" /></template>

<!-- 父组件模板中 -->
<!-- <SearchBox v-model="search" /> -->
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

如果子组件设置 default 但父组件未传任何值，双方初始值可能不同步；需要由父组件明确初始化，或统一约定默认值来源。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 不用 defineModel，手写 `modelValue` Props + `update:modelValue` 事件，解释它们如何等价。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

源码中查找 useModel 辅助函数与 v-model 编译转换。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/helpers/useModel.ts`](source:packages/runtime-core/src/helpers/useModel.ts#useModel)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/components/v-model.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
