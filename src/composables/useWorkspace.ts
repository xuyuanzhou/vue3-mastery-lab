import { computed, reactive, ref, watch } from 'vue'
import type { Chapter } from '../data/course'
export type Theme = 'dark' | 'light'
type Saved = { read: string[]; bookmarks: string[]; recent: string[]; theme: Theme; sourceWidth: number }
const defaults: Saved = { read: [], bookmarks: [], recent: [], theme: 'dark', sourceWidth: 460 }
function load(): Saved {
  try {
    const obj = JSON.parse(localStorage.getItem('vue3-mastery-v1') || '{}') as Partial<Saved>
    return { read: Array.isArray(obj.read) ? obj.read.filter((x): x is string => typeof x === 'string') : [],
      bookmarks: Array.isArray(obj.bookmarks) ? obj.bookmarks.filter((x): x is string => typeof x === 'string') : [],
      recent: Array.isArray(obj.recent) ? obj.recent.filter((x): x is string => typeof x === 'string').slice(0,12) : [],
      theme: obj.theme === 'light' ? 'light' : 'dark',
      sourceWidth: typeof obj.sourceWidth === 'number' && obj.sourceWidth >= 330 && obj.sourceWidth <= 900 ? obj.sourceWidth : 460 }
  } catch { return { ...defaults } }
}
export const workspace = reactive<Saved>(load())
export const storageError = ref(false)
watch(workspace, () => {
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = workspace.theme
  try { localStorage.setItem('vue3-mastery-v1', JSON.stringify(workspace)); storageError.value = false }
  catch { storageError.value = true }
}, { deep: true, immediate: true })
export const completedCount = (chapters: Chapter[]) => computed(() => chapters.filter(c => workspace.read.includes(c.id)).length)
export const toggleBookmark = (id: string) => { workspace.bookmarks = workspace.bookmarks.includes(id) ? workspace.bookmarks.filter(x => x !== id) : [...workspace.bookmarks,id] }
export const toggleComplete = (id: string) => { workspace.read = workspace.read.includes(id) ? workspace.read.filter(x => x !== id) : [...workspace.read,id] }
export const recordVisit = (id: string) => { workspace.recent = [id, ...workspace.recent.filter(x => x !== id)].slice(0, 12) }
export const sourceOpen = ref(typeof window !== 'undefined' && window.innerWidth >= 1180)
export const sidebarOpen = ref(false)
export const sourcePath = ref('packages/reactivity/src/effect.ts')
export const sourceSymbol = ref('ReactiveEffect')
export const sourceMode = ref<'official'|'mini'>('official')
export function openSource(path: string, symbol = '', mode: 'official'|'mini' = 'official') {
  sourcePath.value = path; sourceSymbol.value = symbol; sourceMode.value = mode; sourceOpen.value = true
}
