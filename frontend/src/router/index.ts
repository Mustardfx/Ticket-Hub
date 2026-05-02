// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/useStores'
import { isAuthenticated } from '@/utils/auth'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/objects/:id',
    name: 'ObjectDetail',
    component: () => import('@/pages/ObjectDetail.vue'),
    props: true,
    meta: { layout: 'default' },
  },
  {
    path: '/profile',
    name: 'ProfileLayout',
    meta: { requiresAuth: true, layout: 'default' },
    children: [
      {
        path: 'settings',
        name: 'ProfileSettings',
        component: () => import('@/pages/profile/ProfileSettings.vue'),
        meta: { requiresAuth: true, roles: ['user', 'admin', 'controller'] },
      },
      {
        path: 'tickets',
        name: 'MyTickets',
        component: () => import('@/pages/profile/MyTickets.vue'),
        meta: { requiresAuth: true, roles: ['user'] },
      },
      {
        path: 'bank-cards',
        name: 'BankCards',
        component: () => import('@/pages/profile/BankCards.vue'),
        meta: { requiresAuth: true, roles: ['user'] },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['admin'], layout: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/MainDashboard.vue'),
      },
      { 
        path: 'objects', 
        name: 'AdminObjects', 
        component: () => import('@/pages/admin/AdminObjects.vue') },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/pages/admin/AdminOrders.vue'),
      },
      {
        path: 'details/:id',
        name: 'AdminDetails',
        component: () => import('@/pages/admin/AdminDetails.vue'),
      },
      {
        path: 'exports',
        name: 'AdminObjectExports',
        component: () => import('@/pages/admin/AdminObjectExports.vue'),
      },
      {
        path: 'sales-of-objects',
        name: 'AdminSalesOfObjects',
        component: () => import('@/pages/admin/AdminSalesOfObjects.vue'),
      },
      {
        path: 'unique-visitors',
        name: 'AdminUniqueVisitors',
        component: () => import('@/pages/admin/AdminUniqueVisitors.vue'),
      },
      {
        path: 'tickets-objects',
        name: 'AdminTicketsOfObjects',
        component: () => import('@/pages/admin/AdminTicketsOfObjects.vue'),
      },
      {
        path: 'sales-marketing',
        name: 'AdminSalesMarketing',
        component: () => import('@/pages/admin/AdminSalesMarketing.vue'),
      },
    ],
  },
  {
    path: '/controller',
    name: 'ControllerDashboard',
    component: () => import('@/pages/controller/ControllerDashboard.vue'),
    meta: { requiresAuth: true, roles: ['controller'], layout: 'controller' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/RegisterPage.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('@/pages/AccessDenied.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: { layout: 'default' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Если есть токен, но store пустой (например после F5), подтягиваем юзера
  // if (!userStore.isLoggedIn && localStorage.getItem('access')) {
  //   await userStore.fetchUser()
  // }

  // 1. Проверка авторизации
  // if (to.meta.requiresAuth && !isAuthenticated()) {
  //   return next({ path: '/login', query: { redirect: to.fullPath } })
  // }
  // // 2. Проверка ролей
  // if (to.meta.roles && !to.meta.roles.includes(userStore.userRole)) {
  //  return next('/access-denied')
  // }


  next()
})

export default router
