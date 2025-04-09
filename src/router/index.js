import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/FrontHome.vue'

const routes = [
  {
    path: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: routes,
})

export default router
