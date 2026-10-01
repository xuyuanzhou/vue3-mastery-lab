# reactive 与 readonly

> **本章目标：**对象代理、缓存、深浅代理与身份约束。建议预留约 26 分钟，先理解机制，再沿源码验证。

## 一、理解核心原理

reactive 为对象创建 Proxy，通过 WeakMap 保持 raw → proxy 的身份关系；嵌套对象在 get 时可按需转换，shallowReactive 只处理顶层。

这一步先明确**哪个对象持有状态、哪个动作导致状态变化、哪个函数接收变化**，再把同一套概念对照实际代码；直接背 API 很难解释异常行为。

## 二、源码追踪与调用链

固定源码文件：[`packages/reactivity/src/reactive.ts`](source:packages/reactivity/src/reactive.ts#reactive)。建议先在右侧搜索 `reactive`，必要时点击右上角链接在 GitHub 查看当前 tag 的完整上下文。

reactive(target) → createReactiveObject → 检查类型与代理缓存 → new Proxy(target,handlers) → get/set 调用依赖系统。

重点确认函数的参数、返回值、依赖的上下文，以及执行前后哪些数据结构被改变。遇到其他文件里的函数调用时，记录跨文件边界，不要只在单个函数里阅读。

## 三、最小可验证示例

```ts
import { reactive, shallowReactive, toRaw } from 'vue'
const raw = { child: { count: 0 } }
const a = reactive(raw)
console.log(reactive(raw) === a, toRaw(a) === raw)
console.log(shallowReactive(raw).child === raw.child)
```

试着预测每一次读取、写入或渲染的输出顺序。与 [Mini Vue 的教学实现](mini:effect.mjs#effect) 对比时，注意它只复刻某些核心不变量，没有覆盖 Vue 3.5 的全部优化和边界行为。

## 四、容易理解错的地方

对原对象直接写入不会走代理 trap；reactive 不适用于独立基本类型；toRaw 是调试/特殊场景工具，不宜长期持有并修改。

阅读源码时，区分**公开 API 合约**、**当前 v3.5.43 实现细节**和**教学模型**；版本更新可能改变内部字段、调度细节与优化分支，不能把某个版本的内部结构当成永久保证。

## 五、动手练习

1. 不看文章，用 3～5 个步骤画出本章的核心调用链，并给每一步标出对应源文件。
2. 在示例中加入一项数据变化或一个边界条件，先写出预期，再在浏览器 Console 或实验室验证。
3. 对比右侧**官方源码**与 **Mini Vue**，记录至少一个教学实现未覆盖的优化或边界。

## 六、自检与复盘

**问：**对象代理、缓存、深浅代理与身份约束涉及的关键机制怎样在真实项目中帮助排查问题？

<details><summary>展开参考思路</summary>

从可观察现象出发，按「触发条件 → 依赖/实例或 AST 数据结构 → 运行时/编译器处理 → 最终结果」解释。对于本章，关键链路为：reactive(target) → createReactiveObject → 检查类型与代理缓存 → new Proxy(target,handlers) → get/set 调用依赖系统。 特别留意：对原对象直接写入不会走代理 trap；reactive 不适用于独立基本类型；toRaw 是调试/特殊场景工具，不宜长期持有并修改。

</details>

---

完成练习后可点击页面顶部的**标记完成**，进度将保存在当前浏览器。
