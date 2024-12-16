import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "public",
      component: () => import('../layouts/PublicLayout.vue'),
      children: [
        {
          path: 'auctions',
          name: 'public-auctions',
          children: [
            {
              path: '',
              name: 'public-auction-home',
              component: () => import('../views/auctions/AuctionsView.vue'),
            },
            {
              path: 'new',
              name: 'public-auction-new',
              component: () => import('../views/auctions/AuctionNewView.vue'),
              meta: {requiresAuth: true}
            },
            {
              path: ':id',
              name: 'public-auction-item',
              component: () => import('../views/auctions/AuctionItemView.vue'),
            },
          ]
        },
        {
          path: 'charities',
          name: 'public-charities',
          children: [
            {
              path: '',
              name: 'public-charity-home',
              component: () => import('../views/charities/CharitiesView.vue'),
            },
            {
              path: 'new',
              name: 'public-charity-new',
              component: () => import('../views/charities/CharityNewView.vue'),
              meta: {requiresAuth: true}
            },
          ]
        },
        {
          path: 'users',
          name: 'public-users',
          children: [
            {
              path: '',
              name: 'public-users-home',
              component: () => import('../views/users/UsersView.vue'),
            },
            {
              path: ':id',
              name: 'public-users-item',
              component: () => import('../views/users/UsersItemView.vue'),
              meta: {requiresAuth: true}
            },
          ]
        },
        {
          path: 'donates',
          name: 'donates',
          children: [
            {
              path: 'my',
              name: 'donates-my',
              component: () => import('../views/donates/MyDonatesView.vue'),
              meta: {requiresAuth: true}
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'auth-login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'auth-register',
          component: () => import('../views/auth/RegisterView.vue'),
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: {requiresAuth: true},
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
