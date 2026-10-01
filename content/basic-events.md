# 事件处理与事件修饰符

> **学习目标：**方法处理器、内联处理器及 .stop/.prevent。约 18 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`@click` 是 `v-on:click` 的简写。既可以绑定方法，也可以写简短的内联表达式；Vue 提供 `.stop`、`.prevent`、`.once`、键盘修饰符等，帮助把事件细节写在模板层。

事件处理函数更适合承载用户交互引发的状态修改；与之不同，computed 用来声明计算结果，watch 用来响应状态变化的副作用。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref } from 'vue'
const name = ref('')
function submit() { alert(name.value) }
</script>
<template>
  <form @submit.prevent="submit">
    <input v-model="name" @keyup.enter="submit" />
    <button type="submit">提交</button>
  </form>
</template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

示例中按 Enter 键时，键盘处理器与原生表单提交可能都触发；真实页面应合理选择一种提交入口，避免重复提交。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 实现一个带父子容器的点击示例，在子级增加 `.stop`，观察事件冒泡是否停止。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

查看 DOM 事件监听器的包装与更新。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-dom/src/modules/events.ts`](source:packages/runtime-dom/src/modules/events.ts#patchEvent)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/event-handling.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
