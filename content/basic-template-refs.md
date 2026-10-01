# 模板引用与 DOM 操作

> **学习目标：**ref、挂载时机及组件实例引用。约 16 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

模板 ref 用于访问真实 DOM 元素或子组件公开的实例能力。首次渲染之前元素尚不存在，因此操作 DOM 的逻辑通常放在 `onMounted` 或 `nextTick` 之后。

Vue 3.5+ 可用 `useTemplateRef()` 按模板 ref 名称取值；也可以使用同名 ref 变量。组件 ref 的对外暴露内容可以由子组件的 `defineExpose` 控制。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { onMounted, useTemplateRef } from 'vue'
const input = useTemplateRef('nameInput')
onMounted(() => input.value?.focus())
</script>
<template><input ref="nameInput" placeholder="页面挂载后聚焦" /></template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

本项目使用 Vue 3.5 系列，因此示例采用 useTemplateRef；低于 3.5 的项目需改用普通 ref。不要在创建阶段假定 DOM 已存在。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 实现点击按钮后切换 v-if 创建输入框，并在 nextTick 后对新输入框执行 focus。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

阅读 setRef 如何与组件渲染提交关联。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/rendererTemplateRef.ts`](source:packages/runtime-core/src/rendererTemplateRef.ts#setRef)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/template-refs.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
