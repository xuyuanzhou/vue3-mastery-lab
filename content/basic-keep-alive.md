# KeepAlive 与动态组件

> **学习目标**：缓存组件实例、激活和失活。约 18 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`<KeepAlive>` 缓存被切换离开的组件实例，保留表单输入、滚动位置或昂贵的本地状态。与普通卸载不同，缓存实例可触发 `onActivated` 和 `onDeactivated`。

缓存应有明确的范围，必要时通过 include/exclude/max 控制成本。数据新鲜度不能仅靠 KeepAlive 保证，重新激活时是否请求要由业务决定。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref } from 'vue'
import TabA from './TabA.vue'
import TabB from './TabB.vue'
const active = ref('A')
</script>
<template>
  <button @click="active = active === 'A' ? 'B' : 'A'">切换</button>
  <KeepAlive><component :is="active === 'A' ? TabA : TabB" /></KeepAlive>
</template>
```

**试着分析**：这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

KeepAlive 的激活/失活不是每次都重新挂载和卸载；需要响应激活状态时应使用对应钩子。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 在 TabA 写入输入框，切换 TabB 再返回；移除 KeepAlive 比较输入框值是否保留。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

阅读 KeepAlive 的缓存 Key 与生命周期处理。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件**：[`packages/runtime-core/src/components/KeepAlive.ts`](source:packages/runtime-core/src/components/KeepAlive.ts#KeepAlive)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程**：[打开本章对应的官网指南](https://cn.vuejs.org/guide/built-ins/keep-alive.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
