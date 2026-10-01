# Pinia 状态管理基础

> **学习目标：**defineStore、state/getters/actions 与解构。约 25 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

当多个页面共享同一份业务状态时，可使用官方推荐的 Pinia。Store 通常由 state、getters 和 actions 组成；Setup Store 也可直接返回 refs、computed 和函数。

组件中通过 store 读取和调用；需要解构响应式状态时应使用 `storeToRefs`，动作方法则可以直接解构。不要将所有短暂的 UI 状态都上升为全局 Store。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```ts
// stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCounter = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increase() { count.value++ }
  return { count, double, increase }
})
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

请安装 pinia 并在入口调用 `app.use(createPinia())` 才能在组件中使用 Store；此学习项目的主应用暂未依赖 Pinia。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 建立购物车 Store，提供 add/remove 与总价 getter，并在两个组件中读取同一份状态。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

Pinia 位于独立仓库；阅读 Vue 的 effectScope 理解 Store 的响应式基础。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/reactivity/src/effectScope.ts`](source:packages/reactivity/src/effectScope.ts#effectScope)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/scaling-up/state-management.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
