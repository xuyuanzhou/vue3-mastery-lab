import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/learn/:id', name: 'learn', component: () => import('./views/ArticleView.vue'), props: true },
    { path: '/labs', name: 'labs', component: () => import('./views/LabsView.vue') },
    { path: '/saved', name: 'saved', component: () => import('./views/SavedView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior: () => ({ top: 0 })
})
createApp(App).use(router).mount('#app')
