import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "",
      name: "public",
      component: () => import('../layouts/PublicLayout.vue'),
      children: [
        {
          path: 'auctions',
          name: 'public-auctions',
          component: () => import('../views/public/AuctionsView.vue'),
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'login',
          name: 'auth-login',
          component: () => import('../views/auth/LoginView.vue'),
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/AdminUsersView.vue')
        },
        {
          path: 'auctions',
          name: 'admin-auctions',
          component: () => import('../views/admin/AdminAuctionsView.vue')
        },
      ]
    }
  ]
})

export default router
