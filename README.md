# Vue 3 Mastery Lab · Vue 3 源码学习实验室

以 React Mastery Lab 的三栏学习体验为参考，用 **Vue 3 + TypeScript + Vite + Vue Router** 实现的独立课程项目。从零学习 Vue 3 基础，再逐步深入源码和实现层。新增基础内容与 Vue 3 官网指南保持主题一致，采用原创中文解释、示例和练习，不复制官网原文。

## 已实现

- **58 篇中文课程**：新增 30 篇 Vue 3 基础课程（认识与上手、模板与响应式、组件通信、工程实践），原有 28 篇源码课程完整保留；共十个学习阶段。基础章节提供官网直达入口、代码示例、常见问题、动手练习、自检与关联源码。
- **三栏阅读器**：左侧章节，中间 Markdown 教材，右侧固定 `vuejs/core@v3.5.43` 官方源码与 Mini Vue 的独立切换；支持关键词过滤文件、跳转函数、外部 GitHub 阅读。
- **6 个交互实验**：依赖收集、computed 缓存、调度与 nextTick、Keyed Diff/LIS、生命周期、模板编译。部分直接调用 Vue API 和 `@vue/compiler-dom`，其余明确标注为教学模拟。
- **学习管理**：全文搜索（`⌘/Ctrl + K`）、已完成进度、书签、最近阅读、深浅色、响应式布局；保存在浏览器 localStorage。
- **Mini Vue**：可独立运行/测试的 JS 教学实现，包含 Proxy、effect、ref、computed、watch、去重调度器、LIS 和宿主操作注入式简单渲染器。
- **静态部署**：`base: './'`、Hash History，适合 GitHub Pages 仓库子路径，提供 GitHub Actions 配置。

**源码边界**：课程绑定 Vue 官方 `v3.5.43` tag（Vue 3.5 稳定分支）。官方源码在右侧通过 `raw.githubusercontent.com` 按需加载，需要能够访问 GitHub；网络不可用时可通过 Mini Vue 标签离线阅读教学代码。教学代码并非 Vue 内部真实实现，尤其 `Dep/Link`、完整组件与 Diff、调度排序和编译优化均以官方文件为准。Vue Router、Pinia 来自独立仓库，生态课程给出相应仓库链接。源码版权归原作者；本项目不打包或修改 Vue 的官方源码。

基础章节以 Vue 3 官网的 Essentials、Components In-Depth、Reusability、Built-in Components、Scaling Up 和 TypeScript 为章节依据。官网会更新，本文不是官网的镜像或逐字转载；源码面板仍固定 Vue `v3.5.43`。

## 本地启动

要求 Node.js **20.19+**，首次安装依赖需要联网：

```bash
npm install
npm run dev
```

在终端显示的 Vite 地址打开网站（通常是 `http://localhost:5173/`），不要直接双击 `index.html`。`npm run build` 生成部署用 `dist/`，`npm run preview` 预览构建结果。

无需下载依赖也可直接运行 Mini Vue（需要 Node.js 20+）：

```bash
npm test
npm run mini:demo
```

## 工程目录

```text
content/                  58 篇 Markdown 课程（30 篇基础 + 28 篇源码），每章可独立编辑
mini-vue/src/             可运行的独立响应式、Diff 和渲染器教学实现
mini-vue/test/            Node 内置测试
src/data/course.ts        分组、章节、官方源码路径与文章索引
src/composables/          阅读进度/主题/源码面板的响应式工作区状态
src/components/           目录侧栏与双模式源码阅读器
src/views/                首页、课程阅读、实验室、收藏夹
src/features/diff.ts      浏览器实验使用的类型安全教学 Diff
src/style.css             暗/亮两套主题和桌面/移动响应式布局
.github/workflows/        GitHub Pages 发布
```

`content/*.md` 自动通过 Vite `import.meta.glob(...?raw)` 收录；新增课程还需在 `src/data/course.ts` 中加入章节元数据。课程里可使用 `source:packages/...#symbol` 与 `mini:effect.mjs#effect` 这样的自定义链接，点击后在右侧打开对应源码。

## 部署 GitHub Pages

1. 创建新仓库（如 `vue3-mastery-lab`），将**本项目文件**上传仓库根目录。不要同时放原 React 项目的 `index.html`，也不要把 Vite 源入口单独作为 Pages 根目录。
2. 执行 `npm install` 生成并提交 `package-lock.json`（`npm ci` 需要 lock 文件；仓库的工作流使用 `npm install`，没有 lock 也可以安装）。
3. GitHub 仓库设置 **Settings → Pages → Build and deployment → GitHub Actions**。
4. 推送到 `main` 后，工作流运行测试与构建，并部署 `dist/`。GitHub Pages URL 类似 `https://用户名.github.io/vue3-mastery-lab/`。

`vite.config.ts` 的 `base: './'` 使 JS/CSS/静态文件使用相对路径；Vue Router 的 `createWebHashHistory()` 避免刷新子路径时服务器返回 404。

## 阅读建议

**入门路线：**按「认识 Vue 3 → 创建项目 → SFC → 模板与响应式 → 组件通信 → Composables/Router/Pinia」学习，基础章均链接对应 [Vue 中文官网](https://cn.vuejs.org/guide/introduction.html)。

**源码路线：**完成基础后，从「源码阅读路线」和「Proxy、Reflect 与微任务」开始，然后依次学习 `reactive → ref → track/trigger → effect → computed/watch → VNode → setup → patch → Diff → scheduler → compiler`。每章按「原理 → 源码 → 实验 → 自检」走完后再标记完成。
