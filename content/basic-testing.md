# 测试、调试与项目实践

> **学习目标：**组件测试、Vue Devtools 和性能排查。约 22 分钟。本文依据 Vue 3 官方指南组织，用独立示例和练习讲清用法；右侧源码是进一步深入的关联入口。

## 一、概念与适用场景

组件测试关注 Props、用户交互、事件和可观察 DOM；单元测试关注 composable 等纯逻辑；端到端测试验证完整用户流程。Vue Devtools 能帮助检查组件树、状态和性能。

使用测试金字塔安排成本，不必将每个内部方法都写成脆弱的白盒测试。对异步更新，在断言 DOM 前等待相应的渲染刷新。

## 二、动手示例

以下代码用于演示本节要点。多文件片段请按照注释拆分到不同文件；项目使用 Vue 3.5 系列。

```ts
// Counter.spec.ts（示意，需要安装 Vitest 与 @vue/test-utils）
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Counter from './Counter.vue'
it('点击后更新计数', async () => {
  const wrapper = mount(Counter)
  await wrapper.get('button').trigger('click')
  await nextTick()
  expect(wrapper.text()).toContain('1')
})
```

**试着分析：**这里的输入由谁持有？执行什么动作后发生变化？页面或子组件如何接收到变化？能否在不改变数据所有权的前提下完成需求？

## 三、常见问题与边界

示例依赖 Vitest 与 @vue/test-utils，原项目尚未安装这两项；真实测试需先添加依赖并配置运行环境。测试断言应面向行为，而不是内部实现。

建议先观察浏览器运行结果，再通过 Vue Devtools 检查对应组件的状态变化，区分组件传值、代理响应式和 DOM 更新三种不同层次的问题。

## 四、动手练习

1. 为搜索表单编写输入、错误状态和提交事件三个测试，手动调试一次组件更新流程。
2. 预测示例在一次状态变化后的显示结果，实际运行后检查预期；对比异常情况时重点检查模板绑定、数据引用和生命周期。
3. 尝试把示例封装成独立的 `.vue` 组件，写清对外输入与事件（如果本节是构建或测试课程，则整理出运行命令及结果）。

## 五、自检与源码衔接

<details><summary>为什么要在进入源码之前掌握本节？</summary>

从 renderer 的 patch 入口把可观察行为连接到运行时实现。 当你先知道公开 API 应该呈现什么行为，再阅读内部实现，就能够区分用户可依赖的行为与特定版本的优化细节。

</details>

**关联源文件：**[`packages/runtime-core/src/renderer.ts`](source:packages/runtime-core/src/renderer.ts#patch)（Vue 核心 v3.5.43，右侧可查看）。

**Vue 官方教程：**[打开本章对应的官网指南](https://cn.vuejs.org/guide/scaling-up/testing.html)。官网内容会持续更新，与本项目固定的源码 tag 不一定完全同步。

---

完成练习后点击顶部的 **标记完成**，学习进度会保存在本地浏览器。
