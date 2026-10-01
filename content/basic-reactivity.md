# 响应式基础：ref 与 reactive

> **学习目标：**声明状态、修改 .value 与解包规则。约 26 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`ref()` 可以包装基本类型和对象，通过 `.value` 访问；`reactive()` 通过 Proxy 创建响应式对象。推荐默认使用 `ref` 声明可被整体替换的状态，并理解何时需要对象级的 reactive。

在 `<script setup>` 中更新 `ref` 使用 `.value`，顶层 ref 在模板中通常自动解包。`reactive` 的响应式依赖于代理访问，直接解构普通属性会丢失原对象属性的响应式关联。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref, reactive } from 'vue'
const count = ref(0)
const user = reactive({ name: '小明', score: 1 })
function increase() { count.value++; user.score++ }
</script>
<template>
  <button @click="increase">{{ count }} / {{ user.score }}</button>
</template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

`const { score } = user` 得到的是当前数字，不会随代理属性变化。需要保持引用可使用 `toRef(user, "score")` 或 `toRefs(user)`。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 增加一个 `reset` 按钮，并比较整体替换一个 ref 对象与整体替换 reactive 变量后，原有引用的行为。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

继续深入 ref 的 getter/setter 与 reactive 的 Proxy 代理。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/reactivity/src/ref.ts`](source:packages/reactivity/src/ref.ts#ref)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
