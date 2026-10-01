# 表单绑定 v-model

> **学习目标：**input、checkbox、radio、select 与修饰符。约 24 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

`v-model` 同步表单输入与响应式状态；文本框、复选框、单选按钮和下拉框对应不同的值处理方式。`.trim`、`.number`、`.lazy` 可调整输入值转换与更新时机。

实际业务中需分开处理 UI 表单状态、校验错误和服务端提交结果。`v-model` 是双向绑定语法糖，并不自动做表单校验。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```vue
<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(18)
const accepted = ref(false)
</script>
<template>
  <input v-model.trim="name" placeholder="姓名" />
  <input v-model.number="age" type="number" />
  <label><input v-model="accepted" type="checkbox" />同意条款</label>
  <p>{{ name }} / {{ age }} / {{ accepted }}</p>
</template>
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

`.number` 并不保证任何输入都变成有效数字；转换不成功时可能保留原始字符串。重要数值仍需单独验证。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 写一个注册表单，使用 computed 派生提交按钮的 disabled 状态并显示字段级错误。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

查看不同类型 v-model 指令对 DOM 值和事件的处理。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-dom/src/directives/vModel.ts`](source:packages/runtime-dom/src/directives/vModel.ts#vModelText)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/essentials/forms.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
