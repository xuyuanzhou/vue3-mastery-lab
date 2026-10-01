# 工程与内容架构

**入口和路由**：`src/main.ts` 使用 Vue Router 的 Hash History；`src/App.vue` 持有全局 shell、搜索对话框及响应式三栏布局。路由页面按需加载，实验页包含 `@vue/compiler-dom`，不进入首页的常规页面代码。

**课程**：`src/data/course.ts` 为课程元数据的单一来源，`import.meta.glob` 在构建阶段收录 `content/*.md` 原文。`ArticleView.vue` 通过 MarkdownIt + highlight.js 展示代码块，标题生成目录，拦截约定的 `source:` / `mini:` 课程链接。

**官方源码**：按固定 Git tag 构造 GitHub raw URL，在 `SourcePanel.vue` 中按需请求，不将外部源码打包进仓库或 JS bundle。断网或被防火墙阻断时使用外链或 Mini Vue。引用的章节路径与 symbol 在 course.ts 维护。

**Mini Vue**：Node ESM 教学代码与浏览器 UI 解耦，源码浏览器通过 `?raw` 加载文本。测试使用 Node 自带 `node:test`。Diff 教学页面使用 TS 同等算法，确保浏览器不需要执行不可信字符串代码。

**持久化和边界**：工作区状态集中在 `src/composables/useWorkspace.ts`，本地 localStorage 存储 read/bookmarks/recent/theme/sourceWidth，写入失败显示提示，不涉及服务端账号或跨设备同步。外部 GitHub raw 的可用性取决于网络。

**部署**：`base: './'` 和 hash 路由保证静态资源子路径正确；生产构建须经 Vite。此项目不是 SSR 服务端工程，也未集成真实登录与后台 API。

## Vue 3 基础扩展（新增）

课程由 30 篇基础 + 28 篇源码构成。`basic-*` 章节是官网知识体系的原创中文教程，每章包含代码、常见问题、练习、官网链接和关联 Vue 内核。首页按十个阶段组织，基础先于源码；全局搜索、书签、进度与导航共用现有数据模型。
