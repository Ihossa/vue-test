import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CurrentFilm from "@/views/CurrentFilm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:id',
      name: 'film',
      component: CurrentFilm
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
