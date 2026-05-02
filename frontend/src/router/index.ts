import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SkillsView from '@/views/SkillsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/skills',
      name: 'skill',
      component: () => import('../views/SkillsView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      // Lazy-loading: this file is only downloaded when the user clicks the button!
      // This makes your initial page load incredibly fast.
      component: () => import('../views/ProjectsView.vue'),
    },
  ],
})

export default router
