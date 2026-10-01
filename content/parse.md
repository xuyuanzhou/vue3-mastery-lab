# Parse：从模板到 AST

> **本章目标：**节点、指令与源位置的信息保留。建议预留约 24 分钟，先理解机制，再沿源码验证。

## 一、理解核心原理

baseParse 将模板解析成 Root、Element、Text、Interpolation、Directive 等 AST 节点，保存源位置信息以支持诊断和后续转换。

这一步先明确**哪个对象持有状态、哪个动作导致状态变化、哪个函数接收变化**，再把同一套概念对照实际代码；直接背 API 很难解释异常行为。

## 二、源码追踪与调用链

固定源码文件：[`packages/compiler-core/src/parser.ts`](source:packages/compiler-core/src/parser.ts#baseParse)。建议先在右侧搜索 `baseParse`，必要时点击右上角链接在 GitHub 查看当前 tag 的完整上下文。

parseChildren 循环 → parseElement / parseInterpolation / parseText → 构造嵌套 AST。

重点确认函数的参数、返回值、依赖的上下文，以及执行前后哪些数据结构被改变。遇到其他文件里的函数调用时，记录跨文件边界，不要只在单个函数里阅读。

## 三、最小可验证示例

```html
<div v-if="ok" :class="kind">{{ msg }}</div>
// Root → Element(div) → Interpolation(msg)
// 属性中还有 v-if 和 :class 的指令节点
```

试着预测每一次读取、写入或渲染的输出顺序。与 [Mini Vue 的教学实现](mini:effect.mjs#effect) 对比时，注意它只复刻某些核心不变量，没有覆盖 Vue 3.5 的全部优化和边界行为。

## 四、容易理解错的地方

嵌套标签、引号和指令表达式不能依靠简单正则完整解析；parse 不负责最终 DOM 更新。

阅读源码时，区分**公开 API 合约**、**当前 v3.5.43 实现细节**和**教学模型**；版本更新可能改变内部字段、调度细节与优化分支，不能把某个版本的内部结构当成永久保证。

## 五、动手练习

1. 不看文章，用 3～5 个步骤画出本章的核心调用链，并给每一步标出对应源文件。
2. 在示例中加入一项数据变化或一个边界条件，先写出预期，再在浏览器 Console 或实验室验证。
3. 对比右侧**官方源码**与 **Mini Vue**，记录至少一个教学实现未覆盖的优化或边界。

## 六、自检与复盘

**问：**节点、指令与源位置的信息保留涉及的关键机制怎样在真实项目中帮助排查问题？

<details><summary>展开参考思路</summary>

从可观察现象出发，按「触发条件 → 依赖/实例或 AST 数据结构 → 运行时/编译器处理 → 最终结果」解释。对于本章，关键链路为：parseChildren 循环 → parseElement / parseInterpolation / parseText → 构造嵌套 AST。 特别留意：嵌套标签、引号和指令表达式不能依靠简单正则完整解析；parse 不负责最终 DOM 更新。

</details>

---

完成练习后可点击页面顶部的**标记完成**，进度将保存在当前浏览器。
