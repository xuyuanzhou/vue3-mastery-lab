<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Bookmark, Clock, ArrowRight, BookOpen } from 'lucide-vue-next'
import { chapters, linkTo } from '../data/course'
import { workspace } from '../composables/useWorkspace'
const saved = computed(()=>workspace.bookmarks.map(id=>chapters.find(c=>c.id===id)).filter((c):c is typeof chapters[number]=>Boolean(c)))
const recent = computed(()=>workspace.recent.map(id=>chapters.find(c=>c.id===id)).filter((c):c is typeof chapters[number]=>Boolean(c)).slice(0,8))
</script>
<template><div class="page saved-page"><div class="eyebrow"><Bookmark :size="14"/> YOUR LIBRARY</div><h1>我的学习空间</h1><p class="muted">收藏重要章节，沿着上次中断的位置继续学习。记录仅保存在当前浏览器中。</p><div class="section-heading lower"><h2>收藏的章节 <small>{{saved.length}}</small></h2></div><div v-if="!saved.length" class="empty-state"><Bookmark :size="33"/><h3>还没有收藏章节</h3><p>打开章节后点击右上角的书签按钮，即可添加到这里。</p><RouterLink :to="linkTo(chapters[0]!.id)" class="secondary">开始学习 <ArrowRight :size="14"/></RouterLink></div><div v-else class="item-list"><RouterLink v-for="c in saved" :key="c.id" :to="linkTo(c.id)"><BookOpen :size="18"/><span><b>{{c.title}}</b><small>{{c.subtitle}}</small></span><span class="list-meta"><Clock :size="13"/> {{c.minutes}} min</span><ArrowRight :size="16"/></RouterLink></div><div class="section-heading lower"><h2>最近阅读</h2></div><div v-if="!recent.length" class="muted">阅读课程后，这里会显示最近打开的章节。</div><div v-else class="item-list"><RouterLink v-for="c in recent" :key="c.id" :to="linkTo(c.id)"><Clock :size="17"/><span><b>{{c.title}}</b><small>{{c.subtitle}}</small></span><ArrowRight :size="16"/></RouterLink></div></div></template>
