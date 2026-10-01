<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { BookOpen, Home, Bookmark, ChevronDown, Check, GraduationCap } from 'lucide-vue-next'
import { chapters, groups, linkTo } from '../data/course'
import { workspace } from '../composables/useWorkspace'
const props = defineProps<{ activeId: string; open: boolean }>()
const expandedGroup = ref('')
watch(() => props.activeId, id => {
  expandedGroup.value = chapters.find(c => c.id === id)?.group ?? ''
}, { immediate: true })
const sections = [
  { id: 'basic', title: '基础课', description: '先掌握 Vue 的使用', groups: groups.filter(g => g.id.startsWith('basic-')) },
  { id: 'source', title: '源码课', description: '再理解内部实现', groups: groups.filter(g => !g.id.startsWith('basic-')) }
].map(section => ({ ...section, groups: section.groups.map(g => ({
  ...g,
  label: g.title.replace(/^(基础 )?\d+ · /, ''),
  number: String(groups.indexOf(g) + 1).padStart(2, '0'),
  chapters: chapters.filter(c => c.group === g.id).map(c => ({ ...c, number: String(chapters.indexOf(c) + 1).padStart(2, '0') }))
})) }))
const percent = computed(() => Math.round(chapters.filter(c => workspace.read.includes(c.id)).length/chapters.length*100))
</script>
<template>
<aside class="sidebar" :class="{'mobile-open':open}">
 <div class="workspace-name"><span class="workspace-icon"><GraduationCap :size="20"/></span><span>Vue 3 原理精通<small>从使用者，到实现者</small></span></div>
 <div class="side-shortcuts"><RouterLink to="/" active-class="active"><Home :size="16"/>学习路线</RouterLink><RouterLink to="/saved" active-class="active"><Bookmark :size="16"/>我的书签 <span>{{workspace.bookmarks.length}}</span></RouterLink><RouterLink to="/labs" active-class="active"><BookOpen :size="16"/>动手实验</RouterLink></div>
 <div class="sidebar-label">课程目录 <span>{{chapters.length}} 篇</span></div>
 <nav class="course-tree" aria-label="课程目录">
  <section v-for="section in sections" :key="section.id" class="course-section" :aria-labelledby="'section-'+section.id">
   <div class="course-section-heading"><h2 :id="'section-'+section.id">{{section.title}}</h2><small>{{section.description}}</small></div>
   <div v-for="g in section.groups" :key="g.id" class="course-group">
    <button class="course-group-toggle" :class="{'is-open':expandedGroup===g.id,'is-current':g.chapters.some(c=>c.id===activeId)}" :aria-expanded="expandedGroup===g.id" :aria-controls="'group-'+g.id" @click="expandedGroup=expandedGroup===g.id?'':g.id"><ChevronDown :size="13"/><span>{{g.number}} · {{g.label}}</span><small>{{g.chapters.length}}</small></button>
    <div :id="'group-'+g.id" v-show="expandedGroup===g.id" class="course-group-chapters">
     <RouterLink v-for="c in g.chapters" :key="c.id" :to="linkTo(c.id)" :class="{selected:c.id===activeId}" :aria-current="c.id===activeId?'page':undefined" :title="c.title"><span class="chapter-status" :class="{done:workspace.read.includes(c.id)}"><Check v-if="workspace.read.includes(c.id)" :size="12"/>{{workspace.read.includes(c.id)?'':c.number}}</span><span class="chapter-title">{{c.title}}</span><Bookmark v-if="workspace.bookmarks.includes(c.id)" :size="11"/></RouterLink>
    </div>
   </div>
  </section>
 </nav>
 <div class="progress-card"><div class="progress-title">学习进度 <b>{{percent}}%</b></div><div class="progress-bar"><i :style="{width:percent+'%'}"/></div><small>已完成 {{workspace.read.filter(id=>chapters.some(c=>c.id===id)).length}} / {{chapters.length}} 篇 · 保存在本地浏览器</small></div>
</aside>
</template>
