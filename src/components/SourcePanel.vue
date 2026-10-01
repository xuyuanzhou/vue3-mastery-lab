<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { Code2, ExternalLink, X, Search, BookOpen, FolderOpen, AlertCircle, ArrowRight, Copy, Check } from 'lucide-vue-next'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import { chapters, officialUrl, sourceRawUrl, linkTo } from '../data/course'
import { sourceNotes } from '../data/annotations'
import { RouterLink } from 'vue-router'
import { sourceOpen, sourcePath, sourceSymbol, sourceMode, openSource } from '../composables/useWorkspace'
hljs.registerLanguage('typescript',typescript);hljs.registerLanguage('javascript',javascript)
const miniFiles=import.meta.glob('../../mini-vue/src/*.mjs',{eager:true,query:'?raw',import:'default'}) as Record<string,string>
const miniFileNames=Object.keys(miniFiles).map(p=>p.split('/').pop()!).sort()
const officialFiles=[...new Set(chapters.map(c=>c.source))]
const code=ref(''),error=ref(''),loading=ref(false),copied=ref(false),filter=ref(''),codeBox=ref<HTMLElement|null>(null)
const choices=computed(()=>sourceMode.value==='official'?officialFiles:miniFileNames)
const filtered=computed(()=>choices.value.filter(p=>p.toLowerCase().includes(filter.value.toLowerCase())))
const activeNote=computed(()=>sourceMode.value==='official' ? (sourceNotes[sourcePath.value]||[]).find(n=>n.symbol===sourceSymbol.value) || (sourceNotes[sourcePath.value]||[])[0] : undefined)
const symbolLine=computed(()=>{if(!sourceSymbol.value||!code.value)return 0;const lines=code.value.split('\n');const ix=lines.findIndex(x=>x.includes(sourceSymbol.value));return ix>=0?ix+1:0})
const highlighted=computed(()=>{if(!code.value)return '';try{return hljs.highlight(code.value,{language:sourceMode.value==='mini'?'javascript':'typescript',ignoreIllegals:true}).value}catch{return code.value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}})
async function load() {
  const path=sourcePath.value,mode=sourceMode.value;loading.value=true;error.value='';code.value=''
  if(mode==='mini') {const entry=Object.entries(miniFiles).find(([key])=>key.endsWith('/'+path));code.value=entry?.[1]||'';if(!entry)error.value='没有找到此教学文件';loading.value=false;await scrollSymbol();return}
  try {const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);let response:Response
   try{response=await fetch(sourceRawUrl(path),{signal:controller.signal})}finally{clearTimeout(timeout)}
   if(!response.ok)throw Error('HTTP '+response.status)
   const content=await response.text();if(sourcePath.value!==path||sourceMode.value!==mode)return
   if(content.length>700_000)throw Error('文件过大，请在 GitHub 查看')
   code.value=content;await scrollSymbol()
  }catch(e){if(sourcePath.value===path&&sourceMode.value===mode)error.value='官方源码加载失败（需联网访问 GitHub）：'+String(e instanceof Error?e.message:e)}
  finally{if(sourcePath.value===path&&sourceMode.value===mode)loading.value=false}
}
async function scrollSymbol(){await nextTick();if(codeBox.value)codeBox.value.scrollTop=Math.max(0,(symbolLine.value-5)*20)}
watch([sourcePath,sourceMode],load,{immediate:true});watch(sourceSymbol,scrollSymbol)
function switchMode(mode:'official'|'mini') {sourceMode.value=mode;sourcePath.value=mode==='mini'?'effect.mjs':'packages/reactivity/src/effect.ts';sourceSymbol.value=mode==='mini'?'effect':'ReactiveEffect';filter.value=''}
async function copyCode(){try{await navigator.clipboard.writeText(code.value);copied.value=true;setTimeout(()=>copied.value=false,1600)}catch{error.value='复制失败，浏览器可能禁止读取剪贴板。'}}
onMounted(scrollSymbol)
</script>
<template><aside class="source-panel"><div class="source-heading"><span class="source-label"><Code2 :size="16"/> 源码浏览器</span><button class="icon-button" title="关闭源码面板" aria-label="关闭源码面板" @click="sourceOpen=false"><X :size="17"/></button></div><div class="source-tabs"><button :class="{active:sourceMode==='official'}" @click="switchMode('official')">Vue 官方源码</button><button :class="{active:sourceMode==='mini'}" @click="switchMode('mini')">Mini Vue 实现</button></div><div class="source-search"><Search :size="14"/><input v-model="filter" aria-label="过滤源码文件" placeholder="过滤文件名..."/></div><div class="source-file-list"><button v-for="file in filtered" :key="file" :class="{active:sourcePath===file}" :title="file" @click="openSource(file,'',sourceMode)"><FolderOpen :size="13"/><span>{{file.replace('packages/','')}}</span></button><span v-if="!filtered.length" class="muted">没有匹配文件</span></div><div class="editor-heading"><div class="editor-filename"><Code2 :size="15"/><span :title="sourcePath">{{sourcePath.split('/').at(-1)}}</span><span class="editor-version">{{sourceMode==='mini'?'教学实现':'v3.5.43'}}</span></div><div class="editor-actions"><button v-if="code" title="复制源码" @click="copyCode"><Check v-if="copied" :size="14"/><Copy v-else :size="14"/></button><a v-if="sourceMode==='official'" :href="officialUrl(sourcePath)" target="_blank" rel="noopener noreferrer" title="GitHub 查看原文件"><ExternalLink :size="15"/></a></div></div><div v-if="sourceSymbol" class="symbol-location"><span>函数 / 符号</span><code>{{sourceSymbol}}</code><button v-if="symbolLine" @click="scrollSymbol">L{{symbolLine}} <ArrowRight :size="12"/></button></div><div v-if="activeNote" class="source-annotation"><div><BookOpen :size="13"/> 中文源码讲解 <RouterLink :to="linkTo(activeNote.chapter)">对应教材 <ArrowRight :size="12"/></RouterLink></div><b>{{activeNote.symbol}} · {{activeNote.summary}}</b><p>{{activeNote.focus}}</p></div><div v-if="loading" class="source-state">正在获取固定版本源码...</div><div v-else-if="error" class="source-state source-error"><AlertCircle :size="20"/><p>{{error}}</p><a v-if="sourceMode==='official'" :href="officialUrl(sourcePath)" target="_blank" rel="noopener noreferrer">在 GitHub 打开 <ExternalLink :size="13"/></a><button @click="switchMode('mini')">查看可离线阅读的 Mini Vue <ArrowRight :size="14"/></button></div><div v-else ref="codeBox" class="code-scroll"><pre><code class="hljs" v-html="highlighted"/></pre></div><div class="source-footer"><BookOpen :size="14"/><span>{{sourceMode==='official'?'官方源码经 raw.githubusercontent.com 按需加载。':'教学实现并非官方 Vue 源码，可在本地运行测试。'}}</span></div></aside></template>
