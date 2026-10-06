# 组件基础与注册

> **学习目标**：拆分 UI、局部导入及单向数据流。约 22 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

组件是 Vue UI 的基本复用单位，负责封装自己的模板、状态和行为。使用 SFC 时，父组件在 `<script setup>` 导入子组件后即可在模板中使用；按需要拆分，不要把整个页面写成一个巨型组件。

从父到子通过 Props 传入输入，子组件通过事件向父通知变化，复杂模板内容通过 slots 交由父组件传入。优先让每个状态拥有清晰的所有者。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<!-- Parent.vue -->
<script setup>
import UserCard from './UserCard.vue'
</script>
<template><UserCard name="小周" /></template>

<!-- UserCard.vue -->
<script setup>
defineProps<{ name: string }>()
</script>
<template><article>你好，{{ name }}</article></template>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

示例展示两个文件，使用时需分别保存为 Parent.vue 与 UserCard.vue，不能把多个顶层 SFC 粘贴到同一个文件。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 拆分一个待办列表为 TodoPage、TodoForm、TodoItem，明确每层的 Props 和事件。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

从 setupComponent 跟踪一个组件的初始化。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/component.ts`](source:packages/runtime-core/src/component.ts#setupComponent)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/component-basics.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
