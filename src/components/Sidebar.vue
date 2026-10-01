<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { BookOpen, Home, Bookmark, ChevronDown, Check, GraduationCap } from 'lucide-vue-next'
import { chapters, groups, linkTo } from '../data/course'
import { workspace } from '../composables/useWorkspace'
defineProps<{ activeId: string; open: boolean }>()
const percent = computed(() => Math.round(chapters.filter(c => workspace.read.includes(c.id)).length/chapters.length*100))
</script>
<template>
<aside class="sidebar" :class="{'mobile-open':open}">
 <div class="workspace-name"><span class="workspace-icon"><GraduationCap :size="20"/></span><span>Vue 3 原理精通<small>从使用者，到实现者</small></span></div>
 <div class="side-shortcuts"><RouterLink to="/" active-class="active"><Home :size="16"/>学习路线</RouterLink><RouterLink to="/saved" active-class="active"><Bookmark :size="16"/>我的书签 <span>{{workspace.bookmarks.length}}</span></RouterLink><RouterLink to="/labs" active-class="active"><BookOpen :size="16"/>动手实验</RouterLink></div>
 <div class="sidebar-label">课程目录 <span>{{chapters.length}} 篇</span></div>
 <div class="course-tree"><details v-for="g in groups" :key="g.id" open><summary><ChevronDown :size="13"/>{{g.title}} <small>{{chapters.filter(c=>c.group===g.id).length}}</small></summary><RouterLink v-for="(c,i) in chapters.filter(c=>c.group===g.id)" :key="c.id" :to="linkTo(c.id)" :class="{selected:c.id===activeId}" :title="c.title"><span class="chapter-status" :class="{done:workspace.read.includes(c.id)}"><Check v-if="workspace.read.includes(c.id)" :size="12"/>{{workspace.read.includes(c.id)?'':String(i+1).padStart(2,'0')}}</span><span class="chapter-title">{{c.title}}</span><Bookmark v-if="workspace.bookmarks.includes(c.id)" :size="11"/></RouterLink></details></div>
 <div class="progress-card"><div class="progress-title">学习进度 <b>{{percent}}%</b></div><div class="progress-bar"><i :style="{width:percent+'%'}"/></div><small>已完成 {{workspace.read.filter(id=>chapters.some(c=>c.id===id)).length}} / {{chapters.length}} 篇 · 保存在本地浏览器</small></div>
</aside>
</template>
