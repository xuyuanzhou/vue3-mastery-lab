<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight, BookOpen, FlaskConical, Code2, Sparkles, Clock, Check } from 'lucide-vue-next'
import { chapters, groups, linkTo, officialUrl } from '../data/course'
import { workspace, openSource } from '../composables/useWorkspace'
const next = computed(() => workspace.recent.find(id=>chapters.some(c=>c.id===id && !workspace.read.includes(id))) || chapters.find(c=>!workspace.read.includes(c.id))?.id || chapters[0]!.id)
const modules = [
  {id:'basic-start',number:'01',hint:'Vue 3 · Vite · SFC'},
  {id:'basic-essentials',number:'02',hint:'模板 · ref/reactive · 表单 · 生命周期'},
  {id:'basic-components',number:'03',hint:'组件 · Props · Emits · Slots'},
  {id:'basic-practice',number:'04',hint:'Composables · Router · Pinia · TypeScript'},
  {id:'start',number:'05',hint:'JavaScript · Monorepo · 源码工具'},
  {id:'reactivity',number:'06',hint:'reactive · ref · effect · computed'},
  {id:'runtime',number:'07',hint:'VNode · setup · 生命周期'},
  {id:'renderer',number:'08',hint:'patch · Diff · Scheduler'},
  {id:'compiler',number:'09',hint:'Parse · Transform · Codegen'},
  {id:'ecosystem',number:'10',hint:'Router · Pinia · SSR · 调试'}
]
const featuredIds = ['basic-intro','basic-reactivity','basic-components','reactive']

</script>
<template><div class="page home-page">
<section class="welcome"><div class="hero-copy"><div class="eyebrow"><span class="status-dot"/> YOUR VUE LEARNING JOURNEY</div><h1>从 Vue 3 基础出发。<br/>理解原理，深入源码。</h1><p>从模板、组件与响应式的基本用法，到一次组件更新抵达屏幕。<br/>官方指南、中文教材、动手练习与源码对照，在一个学习空间完成。</p><RouterLink class="primary" :to="linkTo(next)">{{workspace.recent.length?'继续学习':'开始第一课'}} <ArrowRight :size="17"/></RouterLink></div><div class="vue-art"><div class="art-ring art-ring-one"/><div class="art-ring art-ring-two"/><svg viewBox="0 0 80 69" aria-label="Vue 标志"><path fill="#41b883" d="M0 0h18L40 38 62 0h18L40 69Z"/><path fill="#d9f5e6" d="M18 0h14l8 14 8-14h14L40 38Z"/></svg><span>VUE <b>3.5</b></span><i class="art-dot"/></div></section>
<div class="stats"><div><BookOpen :size="20"/><span><b>{{chapters.length}}</b> 学习章节</span></div><div><FlaskConical :size="20"/><span><b>6</b> 交互实验</span></div><div><Code2 :size="20"/><span>固定源码 <b>v3.5.43</b></span></div></div>
<div class="section-heading"><div><div class="section-kicker">LEARNING ROADMAP</div><h2>按能力前进，不设毕业时限</h2></div><a href="https://cn.vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Vue 3 官方指南 <ArrowUpRight :size="14"/></a></div>
<div class="roadmap"><RouterLink v-for="m in modules" :key="m.id" :to="linkTo(chapters.find(c=>c.group===m.id)!.id)" class="roadmap-card"><span class="module-number">{{m.number}}</span><div><h3>{{groups.find(g=>g.id===m.id)?.title.split(' · ')[1]}}</h3><p>{{m.hint}}</p><small>{{chapters.filter(c=>c.group===m.id).length}} 章节 · {{chapters.filter(c=>c.group===m.id && workspace.read.includes(c.id)).length}} 已学</small></div><ArrowUpRight class="module-arrow" :size="18"/></RouterLink></div>
<div class="section-heading lower"><div><div class="section-kicker">START HERE</div><h2>从基础开始，再深入原理</h2></div><RouterLink to="/labs">查看所有实验 <ArrowRight :size="14"/></RouterLink></div>
<div class="featured-grid"><RouterLink v-for="(c,i) in featuredIds.map(id=>chapters.find(c=>c.id===id)!)" :key="c.id" :to="linkTo(c.id)" class="featured-card"><div class="featured-top"><span class="feature-symbol">{{['{ }','→','<>','⌁'][i]}}</span><span class="tag">{{c.level}}</span></div><h3>{{c.title}}</h3><p>{{c.subtitle}}</p><div class="feature-foot"><span><Clock :size="13"/> {{c.minutes}} 分钟</span><span v-if="workspace.read.includes(c.id)" class="finished"><Check :size="12"/> 已完成</span><ArrowRight v-else :size="15"/></div></RouterLink></div>
<div class="bottom-note"><Sparkles :size="18"/><p><b>以原理为中心，而不是只记 API。</b> 教材中的代码包含公开 API 示例和明确标注的教学模型；右侧可浏览固定版本的 Vue 官方源码，Mini Vue 可在本地运行与测试。</p><button @click="openSource('effect.mjs','effect','mini')">打开 Mini Vue <ArrowRight :size="15"/></button></div>
</div></template>
