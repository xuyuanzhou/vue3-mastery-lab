# 列表渲染 v-for 与 key

> **学习目标**：数组更新、过滤排序及节点身份。约 21 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`v-for` 能遍历数组、对象和数值范围。列表中需要稳定且唯一的 `key`，让 Vue 在更新过程中识别相同业务项，从而正确复用组件和 DOM 状态。

展示派生列表时用 computed 过滤/排序，不要原地修改仅用于展示的源数据。复杂列表抽成子组件，并为每一项提供稳定的业务 ID。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref, computed } from 'vue'
const items = ref([{ id: 1, name: 'Vue' }, { id: 2, name: 'Vite' }])
const ordered = computed(() => [...items.value].reverse())
</script>
<template>
  <ul><li v-for="item in ordered" :key="item.id">{{ item.name }}</li></ul>
</template>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

可增删和重排的列表不要随意使用数组下标作为 key；节点复用可能导致输入框内容或子组件内部状态错位。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 为每个 li 加上输入框，尝试头部插入、倒序、删除，比较使用稳定 ID 与下标 key 的表现。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

对应 patchKeyedChildren 的节点复用与移动逻辑。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/renderer.ts`](source:packages/runtime-core/src/renderer.ts#patchKeyedChildren)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/list.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
