<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import { BookOpen, Search, FlaskConical, Bookmark, Github, PanelRightOpen, PanelRightClose, Menu, X, Sun, Moon, Command, ArrowUpRight } from 'lucide-vue-next'
import Sidebar from './components/Sidebar.vue'
import SourcePanel from './components/SourcePanel.vue'
import { articles, chapters, chapterMap, linkTo } from './data/course'
import { workspace, storageError, sourceOpen, sidebarOpen, recordVisit } from './composables/useWorkspace'
const route = useRoute(), router = useRouter()
const searchOpen = ref(false), query = ref(''), searchInput = ref<HTMLInputElement | null>(null)
const activeId = computed(() => typeof route.params.id === 'string' ? route.params.id : '')
const matches = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return chapters.filter(c => workspace.recent.includes(c.id)).slice(0,6)
  return chapters.map(c => {
    const hay = (c.title+' '+c.subtitle+' '+(articles[c.id] ?? '')).toLowerCase()
    const t = (c.title+' '+c.subtitle).toLowerCase().includes(q)
    const ix = hay.indexOf(q)
    return { c,score:t?3:ix>=0?1:0 }
  }).filter(x => x.score).sort((a,b) => b.score-a.score).slice(0,16).map(x => x.c)
})
watch(() => route.fullPath, () => { sidebarOpen.value = false; searchOpen.value = false; if (activeId.value && chapterMap.has(activeId.value)) recordVisit(activeId.value) }, { immediate:true })
watch(searchOpen, async v => { if (v) { query.value = ''; const { nextTick } = await import('vue'); await nextTick(); searchInput.value?.focus() } })
function shortcut(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchOpen.value = !searchOpen.value }
  if (e.key === 'Escape') { searchOpen.value = false; sidebarOpen.value = false }
}
onMounted(() => window.addEventListener('keydown', shortcut))
onUnmounted(() => window.removeEventListener('keydown', shortcut))
function startResize(e: PointerEvent) {
  e.preventDefault()
  const startX=e.clientX, startWidth=workspace.sourceWidth
  const move=(ev:PointerEvent) => { workspace.sourceWidth = Math.min(900, Math.max(330,startWidth + startX - ev.clientX)) }
  const stop=() => { window.removeEventListener('pointermove',move); window.removeEventListener('pointerup',stop) }
  window.addEventListener('pointermove',move);window.addEventListener('pointerup',stop)
}
const themeToggle = () => { workspace.theme = workspace.theme === 'dark' ? 'light' : 'dark' }
</script>
<template>
  <div class="app" :class="{ 'source-hidden': !sourceOpen }" :style="{ '--source-width': workspace.sourceWidth+'px' }">
    <header class="topbar">
      <button class="mobile-trigger icon-button" aria-label="打开目录" @click="sidebarOpen = !sidebarOpen"><Menu :size="20"/></button>
      <RouterLink class="brand" to="/"><span class="brand-mark"><svg viewBox="0 0 40 35" width="25" height="24" aria-hidden="true"><path fill="currentColor" d="M0 0h9l11 19L31 0h9L20 35Z"/><path fill="var(--panel)" d="M9 0h7l4 7 4-7h7L20 20Z"/></svg></span><span><b>Vue Mastery</b><small>SOURCE LEARNING LAB</small></span></RouterLink>
      <nav class="topnav"><RouterLink to="/"><BookOpen :size="15"/>学习路线</RouterLink><RouterLink to="/labs"><FlaskConical :size="15"/>交互实验 <span>6</span></RouterLink><RouterLink to="/saved"><Bookmark :size="15"/>收藏夹</RouterLink></nav>
      <button class="global-search" @click="searchOpen=true"><Search :size="15"/><span>搜索章节、源码原理...</span><kbd>⌘ K</kbd></button>
      <div class="top-actions"><button class="icon-button" :title="workspace.theme === 'dark' ? '切换浅色模式':'切换深色模式'" @click="themeToggle"><Sun v-if="workspace.theme==='dark'" :size="18"/><Moon v-else :size="18"/></button><button class="icon-button" :title="sourceOpen?'关闭源码':'打开源码'" @click="sourceOpen=!sourceOpen"><PanelRightClose v-if="sourceOpen" :size="18"/><PanelRightOpen v-else :size="18"/></button><span class="version">Vue 3.5</span><a class="github-icon" href="https://github.com/vuejs/core" target="_blank" rel="noopener noreferrer" aria-label="Vue 官方仓库"><Github :size="19"/></a></div>
    </header>
    <div v-if="sidebarOpen" class="mobile-backdrop" @click="sidebarOpen=false"></div>
    <Sidebar :active-id="activeId" :open="sidebarOpen"/>
    <main class="main-content" id="main-content"><div v-if="storageError" class="storage-note">浏览器禁止本地存储：当前进度不会在刷新后保留。</div><RouterView :key="route.fullPath"/></main>
    <template v-if="sourceOpen"><div class="resize-handle" role="separator" aria-label="调整源码面板宽度" aria-orientation="vertical" tabindex="0" @pointerdown="startResize" @keydown.left.prevent="workspace.sourceWidth=Math.min(900,workspace.sourceWidth+24)" @keydown.right.prevent="workspace.sourceWidth=Math.max(330,workspace.sourceWidth-24)"></div><SourcePanel/></template>
    <div v-if="searchOpen" class="modal-backdrop" @click.self="searchOpen=false"><section class="search-dialog" role="dialog" aria-modal="true" aria-label="搜索课程"><div class="search-field"><Search :size="20"/><input ref="searchInput" v-model="query" aria-label="搜索内容" placeholder="搜索 Vue 原理、函数或章节..." @keydown.enter="matches.length && router.push(linkTo(matches[0]!.id))"/><button aria-label="关闭搜索" @click="searchOpen=false"><X :size="18"/></button></div><div class="search-results"><div class="modal-label">{{query?'搜索结果':'最近阅读'}} <span>{{matches.length}} 项</span></div><RouterLink v-for="c in matches" :key="c.id" :to="linkTo(c.id)"><BookOpen :size="16"/><span><b>{{c.title}}</b><small>{{c.subtitle}}</small></span><ArrowUpRight :size="15"/></RouterLink><div v-if="!matches.length" class="empty-results">没有找到匹配的章节，请尝试其他关键词。</div></div><footer class="search-foot"><Command :size="12"/> + K 打开搜索 · Enter 打开章节 · Esc 关闭</footer></section></div>
  </div>
</template>
