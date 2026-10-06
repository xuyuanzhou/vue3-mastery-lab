import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import MarkdownIt from 'markdown-it'
const markdown = new MarkdownIt()
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => readFileSync(resolve(root,path), 'utf8')
const course = read('src/data/course.ts')
const metadata = [...course.matchAll(/id:'([^']+)',group:'([^']+)',title:'([^']+)',subtitle:'([^']+)',minutes:(\d+),source:'([^']+)',symbol:'([^']+)'/g)]
assert.equal(metadata.length,58,'58 篇课程应完整注册')
assert.equal(new Set(metadata.map(x=>x[1])).size,58,'章节 id 不可重复')
const ids = metadata.map(x=>x[1])
const content = readdirSync(resolve(root,'content')).filter(x=>x.endsWith('.md'))
assert.equal(content.length,58,'Markdown 章数与目录一致')
for(const row of metadata){const id=row[1],path=`content/${id}.md`,body=read(path)
 assert.ok(!/\*\*(学习目标|本章目标|试着分析|问)/.test(markdown.render(body)),`${id} 中文加粗标记未正确渲染`)
 assert.ok(body.length>500,`${id} 正文过短`)
 assert.ok(body.includes(id.startsWith('basic-')?'## 二、动手示例':'## 二、源码追踪'),`${id} 缺少主体章节`)
 assert.ok(body.includes(row[6]),`${id} 未引用对应源码`)
 if(id.startsWith('basic-'))assert.ok(body.includes('https://cn.vuejs.org/'),`${id} 缺少官网链接`)
}
for(const path of ['src/App.vue','src/main.ts','src/views/HomeView.vue','src/views/ArticleView.vue','src/views/LabsView.vue','src/views/SavedView.vue','src/components/Sidebar.vue','src/components/SourcePanel.vue','mini-vue/src/effect.mjs','mini-vue/src/reactive.mjs','mini-vue/src/scheduler.mjs','mini-vue/src/diff.mjs','mini-vue/src/renderer.mjs','vite.config.ts','.github/workflows/deploy-pages.yml'])assert.ok(existsSync(resolve(root,path)),`${path} 不存在`)
assert.ok(read('vite.config.ts').includes("base: './'"),'构建资源必须使用相对路径')
assert.ok(read('src/main.ts').includes('createWebHashHistory'),'静态部署必须使用 Hash 路由')
assert.ok(read('src/views/ArticleView.vue').includes('chapter.officialDoc'),'基础章节需要官网文档入口')
assert.ok(read('index.html').includes('src/main.ts'),'Vite 开发入口必须存在')
console.log(`项目结构校验通过：${ids.length} 章、6 个页面组件、Mini Vue 源码与相对部署配置。`)
