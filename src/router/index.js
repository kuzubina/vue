import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: Home
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/product',
    name: 'Product',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/create-product',
    name: 'Create-product',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateProduct.vue')
  },
  {
    path: '/product/:id',
    name: 'Edit-product',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProduct.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue')
  },
  {
    path: '/orders/:id',
    name: 'Orders-item',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders-item.vue')
  },
  {
    path: '/orders/:id',
    name: 'Orders-item-update',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders-item-update.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Clients.vue')
  },
  {
    path: '/clients/:id',
    name: 'Client-profile',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Client-profile.vue')
  },
  {
    path: '/newsletter',
    name: 'Newsletter',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Newsletter.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Setting.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Faq.vue')
  },
  {
    path: '/tarif',
    name: 'tarif',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Tarif.vue')
  },
  {
    path: '/check/:plan/',
    name: 'Check',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Check.vue')
  },
  {
    path: '/tarif/:id',
    name: 'Payments',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Payments.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const localData = JSON.parse(localStorage.getItem("ebot"))
  // const currentUser = localData.userId
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !localData) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
