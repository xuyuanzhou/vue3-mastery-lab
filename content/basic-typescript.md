# Vue 3 与 TypeScript

> **学习目标：**defineProps/defineEmits 类型、ref 推断。约 22 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

Vue 3 对 TypeScript 提供良好支持。`<script setup lang="ts">` 能为 Props、事件、ref 和注入等 API 提供静态类型检查；构建流程中可用 vue-tsc 检查 `.vue` 文件。

优先让 TS 推断简单状态，公共组件契约再显式声明类型。模板类型错误同样重要，不能只运行 tsc 而忽略 Vue SFC。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup lang="ts">
import { ref } from 'vue'
interface User { id: number; name: string }
const props = defineProps<{ user: User; active?: boolean }>()
const emit = defineEmits<{ select: [id: number] }>()
const count = ref<number>(0)
function choose() { emit('select', props.user.id); count.value++ }
</script>
<template><button @click="choose">{{ user.name }}（{{ count }}）</button></template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

`ref<T | null>(null)` 访问时应处理 null。`defineProps` 既可以采用类型声明也可以采用运行时声明，注意不要在同一次调用混用两种声明。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 给 TodoItem 的 props 和 remove 事件添加完整的 TypeScript 类型，并运行 `npm run typecheck`。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

查看 compiler-sfc 如何从类型声明生成运行时 Props 信息。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/compiler-sfc/src/compileScript.ts`](source:packages/compiler-sfc/src/compileScript.ts#compileScript)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/typescript/composition-api.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
