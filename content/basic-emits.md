# 组件事件与 defineEmits

> **学习目标：**父子通信、事件载荷及事件命名。约 18 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

组件通过 `defineEmits` 声明自己的自定义事件，父组件通过 `@事件名` 监听。事件是向上通知的接口，不会像原生 DOM 事件那样沿组件层级自动冒泡。

以动词描述事件，比如 `save`、`remove`、`update:modelValue`，并在 TypeScript 中指定载荷类型。将事件视为组件公开 API 的一部分。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<!-- Child.vue -->
<script setup lang="ts">
const emit = defineEmits<{ save: [value: string] }>()
function save() { emit('save', '已保存') }
</script>
<template><button @click="save">保存</button></template>

<!-- Parent.vue -->
<template><Child @save="message => console.log(message)" /></template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

两个文件需要分别保存；在实际 Parent.vue 中还要导入 Child。事件命名在 JS 中可用 camelCase，在模板监听处推荐 kebab-case。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 把 TodoItem 的删除动作改为 emit('remove', id)，让父组件执行真正的数据删除。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

阅读 emit 如何从组件实例找到相应处理器并传递载荷。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/componentEmits.ts`](source:packages/runtime-core/src/componentEmits.ts#emit)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/components/events.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
