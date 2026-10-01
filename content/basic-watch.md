# 侦听器 watch 与 watchEffect

> **学习目标：**数据源、immediate、清理和 flush。约 25 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`watch` 显式指定数据源，回调能够拿到新旧值；`watchEffect` 在同步执行期间自动收集读取到的依赖。典型用途是搜索条件变化后的请求、持久化、与外部系统同步等副作用。

`watch` 可以监听 ref、reactive、getter 或多个来源。异步请求注意竞态，必要时在清理回调中取消旧请求；执行时机通过 `flush` 指定。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref, watch } from 'vue'
const keyword = ref('')
watch(keyword, async (value, _oldValue, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  if (!value) return
  await fetch('/api/search?q=' + encodeURIComponent(value), { signal: controller.signal })
})
</script>
<template><input v-model="keyword" /></template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

示例省略了网络异常处理，取消请求时需要按业务区分 AbortError 和真实错误。watchEffect 在首次 `await` 之后访问的依赖不会被该轮自动追踪。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 增加 300ms 防抖，连续输入时只提交最后一次查询；说明清理应发生在何处。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

关联 reactivity 的 watch 与 runtime-core 中侦听器的调度整合。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/reactivity/src/watch.ts`](source:packages/reactivity/src/watch.ts#watch)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/watchers.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
