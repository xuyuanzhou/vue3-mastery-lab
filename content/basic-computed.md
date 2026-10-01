# 计算属性 computed

> **学习目标：**缓存的派生状态、getter 与 setter。约 19 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`computed` 用于由其他响应式数据推导结果。计算值默认只读，只有相关依赖改变且再次读取时才重新计算；模板中直接调用方法则不会拥有同样的计算结果缓存。

把有返回值的纯计算放进 computed；把网络请求、写入状态等副作用放在事件处理或 watch 中。有需要时可以提供 `get` / `set` 构造可写计算属性。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref, computed } from 'vue'
const price = ref(20)
const quantity = ref(2)
const total = computed(() => price.value * quantity.value)
</script>
<template>
  <input v-model.number="quantity" type="number" />
  <p>总价：{{ total }}</p>
</template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

不要在 computed getter 中修改它依赖的状态，也不要假设计算属性会在没有被读取时主动执行。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 增加一个折扣率 ref，派生 `discountedTotal`，尝试连续读取并用控制台统计 getter 次数。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

对应响应式内核的 computed 缓存、失效与依赖传播。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/reactivity/src/computed.ts`](source:packages/reactivity/src/computed.ts#computed)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/computed.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
