# VNode、ShapeFlags 与规范化

> **本章目标**：用轻量结构描述 UI 而不是创建真实 DOM。建议预留约 24 分钟，先理解机制，再沿源码验证。

## 一、理解核心原理

VNode 是普通 JavaScript 对象，携带 type、props、children、key、shapeFlag、patchFlag 等。其作用是描述期望 UI，而非立即创建 DOM 节点。

这一步先明确**哪个对象持有状态、哪个动作导致状态变化、哪个函数接收变化**，再把同一套概念对照实际代码；直接背 API 很难解释异常行为。

## 二、源码追踪与调用链

固定源码文件：[`packages/runtime-core/src/vnode.ts`](source:packages/runtime-core/src/vnode.ts#createVNode)。建议先在右侧搜索 `createVNode`，必要时点击右上角链接在 GitHub 查看当前 tag 的完整上下文。

h/createVNode → 规范化 props、children → renderer.patch → 根据 type 和 shapeFlag 分派宿主操作。

重点确认函数的参数、返回值、依赖的上下文，以及执行前后哪些数据结构被改变。遇到其他文件里的函数调用时，记录跨文件边界，不要只在单个函数里阅读。

## 三、最小可验证示例

```ts
import { h, createVNode, Fragment } from 'vue'
const node = h('div', { class: 'card' }, 'Hello')
const list = createVNode(Fragment, null, [h('span','A'), h('span','B')])
```

试着预测每一次读取、写入或渲染的输出顺序。与 [Mini Vue 的教学实现](mini:effect.mjs#effect) 对比时，注意它只复刻某些核心不变量，没有覆盖 Vue 3.5 的全部优化和边界行为。

## 四、容易理解错的地方

key 是节点复用身份提示，不是一个可传入 DOM 的普通属性；编译器提供的 patchFlag 优化不替代正确的 diff 语义。

阅读源码时，区分**公开 API 合约**、**当前 v3.5.43 实现细节**和**教学模型**；版本更新可能改变内部字段、调度细节与优化分支，不能把某个版本的内部结构当成永久保证。

## 五、动手练习

1. 不看文章，用 3～5 个步骤画出本章的核心调用链，并给每一步标出对应源文件。
2. 在示例中加入一项数据变化或一个边界条件，先写出预期，再在浏览器 Console 或实验室验证。
3. 对比右侧**官方源码**与 **Mini Vue**，记录至少一个教学实现未覆盖的优化或边界。

## 六、自检与复盘

**问**：用轻量结构描述 UI 而不是创建真实 DOM涉及的关键机制怎样在真实项目中帮助排查问题？

<details><summary>展开参考思路</summary>

从可观察现象出发，按「触发条件 → 依赖/实例或 AST 数据结构 → 运行时/编译器处理 → 最终结果」解释。对于本章，关键链路为：h/createVNode → 规范化 props、children → renderer.patch → 根据 type 和 shapeFlag 分派宿主操作。 特别留意：key 是节点复用身份提示，不是一个可传入 DOM 的普通属性；编译器提供的 patchFlag 优化不替代正确的 diff 语义。

</details>

---

完成练习后可点击页面顶部的**标记完成**，进度将保存在当前浏览器。
