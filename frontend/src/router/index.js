import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '@/template/Default.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Default,
    redirect: 'Home',
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },

      {
        path: '/listproducts',
        name: 'ListProducts',
        component: () => import('../views/ListProducts.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
