# Transition 与 TransitionGroup

> **学习目标**：进出场动画和列表过渡。约 21 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`<Transition>` 为一个子元素或组件的进入、离开提供 CSS 过渡/动画钩子。`<TransitionGroup>` 适用于列表项的插入、删除和移动过渡；列表项需要稳定 key。

Vue 通过切换约定的 CSS 类实现过渡，也能配合 JS hooks。动画可改善交互反馈，但不应让关键操作依赖动画是否播放完成。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref } from 'vue'
const visible = ref(true)
</script>
<template>
  <button @click="visible = !visible">切换</button>
  <Transition name="fade"><p v-if="visible">渐入渐出</p></Transition>
</template>
<style scoped>
.fade-enter-active,.fade-leave-active { transition: opacity .2s }
.fade-enter-from,.fade-leave-to { opacity: 0 }
</style>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

Transition 默认只处理一个待切换子节点；多个列表项请使用 TransitionGroup。涉及无障碍时应尊重用户减少动态效果的系统偏好。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 把 v-for 待办列表改成 TransitionGroup，分别验证新增、删除与交换位置的视觉效果。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

关注 runtime-dom 的 CSS 过渡包装及节点移动时的行为。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-dom/src/components/Transition.ts`](source:packages/runtime-dom/src/components/Transition.ts#Transition)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/built-ins/transition.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
