# Class 与 Style 绑定

> **学习目标**：对象语法、数组语法与动态样式。约 15 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`class` 和 `style` 可以通过 `v-bind` 绑定字符串、对象和数组。对象语法适合根据布尔状态切换类，数组语法适合合并多个 class；内联 style 也支持对象和数组。

优先通过 CSS class 管理视觉状态，避免将复杂样式全部塞进模板。Vue 会帮你合并传给组件根元素的 class，具体效果和组件根结构有关。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref } from 'vue'
const active = ref(false)
const color = ref('seagreen')
</script>
<template>
  <button :class="{ active, disabled: !active }"
          :style="{ color }" @click="active = !active">切换状态</button>
</template>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

对象键是 CSS 类名、对象值是条件；不要把 `:class="{ active }"` 误解为设置 HTML 属性 `active`。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 使用 class 对象为一个任务卡添加 `done` 状态，并让样式和文字随状态一起变化。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

关联 runtime-dom 中 class/style 的 DOM 更新逻辑。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-dom/src/modules/class.ts`](source:packages/runtime-dom/src/modules/class.ts#patchClass)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/class-and-style.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
