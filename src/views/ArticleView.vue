<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'
import { Bookmark, Check, ArrowLeft, ArrowRight, Clock, Code2, BookOpen, ExternalLink, List } from 'lucide-vue-next'
import { articles, chapterMap, chapters, groups, linkTo, officialUrl } from '../data/course'
import { workspace, toggleBookmark, toggleComplete, openSource, sourcePath, sourceSymbol } from '../composables/useWorkspace'
hljs.registerLanguage('typescript',typescript);hljs.registerLanguage('ts',typescript);hljs.registerLanguage('javascript',javascript);hljs.registerLanguage('js',javascript);hljs.registerLanguage('html',xml);hljs.registerLanguage('xml',xml);hljs.registerLanguage('bash',bash)
const props=defineProps<{id:string}>()
const chapter=computed(()=>chapterMap.get(props.id))
const position=computed(()=>chapters.findIndex(c=>c.id===props.id))
const isBasic=computed(()=>props.id.startsWith('basic-'))
const markdown=computed(()=>articles[props.id] || '# 章节内容不可用\n请检查本地 content 目录。')
const toc=computed(()=>markdown.value.split('\n').filter(line=>/^#{2,3}\s/.test(line)).map((line,i)=>({id:'heading-'+i,title:line.replace(/^#+\s/,''),depth:line.match(/^#+/)![0].length})))
const md: MarkdownIt=new MarkdownIt({html:true,linkify:true,typographer:true,highlight(code,lang): string {if(lang&&hljs.getLanguage(lang)){try{return `<pre class="hljs"><code>${hljs.highlight(code,{language:lang,ignoreIllegals:true}).value}</code></pre>`}catch{}}return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`}})
const defaultHeadingOpen=md.renderer.rules.heading_open
let headingIndex=0
md.renderer.rules.heading_open=(tokens,idx,options,env,self)=>{tokens[idx]!.attrSet('id','heading-'+headingIndex++);return defaultHeadingOpen?defaultHeadingOpen(tokens,idx,options,env,self):self.renderToken(tokens,idx,options)}
const html=computed(()=>{headingIndex=0;return md.render(markdown.value)})
function articleClick(e:MouseEvent) {
 const target=e.target as HTMLElement, a=target.closest('a');if(!a)return
 const href=a.getAttribute('href')||''
 if(href.startsWith('source:')||href.startsWith('mini:')) {
  e.preventDefault();const isMini=href.startsWith('mini:');const info=href.slice(href.indexOf(':')+1);const [path,symbol]=info.split('#');if(path)openSource(path,symbol||'',isMini?'mini':'official')
 }
}
function scrollToHeading(id:string){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
watch(chapter, c=>{if(c){sourcePath.value=c.source;sourceSymbol.value=c.symbol;document.title=c.title+' · Vue Mastery Lab';nextTick(()=>document.getElementById('main-content')?.scrollTo(0,0))}},{immediate:true})
onMounted(()=>{if(chapter.value)document.title=chapter.value.title+' · Vue Mastery Lab'})
</script>
<template><div v-if="chapter" class="article-layout"><article class="article-content"><div class="article-breadcrumb"><RouterLink to="/">学习路线</RouterLink><span>/</span><span>{{groups.find(g=>g.id===chapter?.group)?.title}}</span><span>/</span><span>当前章节</span></div><div class="article-eyebrow"><BookOpen :size="14"/> {{isBasic ? 'VUE 3 FOUNDATION' : 'SOURCE LEARNING'}} · {{chapter.level.toUpperCase()}}</div><h1 class="article-title">{{chapter.title}}</h1><p class="article-subtitle">{{chapter.subtitle}}</p><div class="article-toolbar"><span><Clock :size="14"/> 约 {{chapter.minutes}} 分钟</span><button :class="{selected:workspace.bookmarks.includes(id)}" @click="toggleBookmark(id)"><Bookmark :size="15" :fill="workspace.bookmarks.includes(id)?'currentColor':'none'"/> {{workspace.bookmarks.includes(id)?'已收藏':'收藏'}}</button><button :class="{selected:workspace.read.includes(id)}" @click="toggleComplete(id)"><Check :size="15"/> {{workspace.read.includes(id)?'已完成':'标记完成'}}</button><a v-if="chapter.officialDoc" class="article-official-link" :href="chapter.officialDoc" target="_blank" rel="noopener noreferrer"><ExternalLink :size="14"/> 官网教程</a><button @click="openSource(chapter.source,chapter.symbol)"><Code2 :size="15"/> 关联源码</button></div><div class="article-separator"/><div class="markdown-body" @click="articleClick" v-html="html"/><div class="chapter-source-card"><div><Code2 :size="20"/><span><b>{{isBasic ? '关联 Vue 源码' : '对应源码'}}</b><small>{{chapter.source}} · {{chapter.symbol}}</small></span></div><button @click="openSource(chapter.source,chapter.symbol)">右侧查看 <ArrowRight :size="15"/></button><a :href="officialUrl(chapter.source)" target="_blank" rel="noopener noreferrer" title="在 GitHub 打开"><ExternalLink :size="15"/></a></div><div class="end-completion"><div><b>完成本章学习了吗？</b><p>尝试独立回答自检问题，再将章节标记为完成。</p></div><button class="secondary" @click="toggleComplete(id)"><Check :size="15"/>{{workspace.read.includes(id)?'取消完成':'标记已完成'}}</button></div><nav class="article-navigation"><RouterLink v-if="position>0" :to="linkTo(chapters[position-1]!.id)"><ArrowLeft :size="17"/><span><small>上一章</small>{{chapters[position-1]!.title}}</span></RouterLink><span v-else/><RouterLink v-if="position<chapters.length-1" :to="linkTo(chapters[position+1]!.id)"><span><small>下一章</small>{{chapters[position+1]!.title}}</span><ArrowRight :size="17"/></RouterLink></nav></article><aside class="article-toc"><div><List :size="14"/> 本页目录</div><button v-for="entry in toc" :key="entry.id" :class="{'toc-sub':entry.depth===3}" @click="scrollToHeading(entry.id)">{{entry.title}}</button><div class="toc-tip">源码版本 <b>v3.5.43</b><small>教学内容与源码相互验证</small></div></aside></div><div v-else class="page"><h1>章节不存在</h1><RouterLink to="/">返回学习路线</RouterLink></div></template>
