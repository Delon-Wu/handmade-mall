import Vue from 'vue'
import Router from 'vue-router'
import Index from './view/Index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/management',
        name: 'Management',
        component: ()=> import('@/view/Management.vue'),
        children: [
          {
            path: '/',
            name: 'Statistics',
            component: () => import('@/components/Statistics.vue')
          },
          {
            path: '/management/upload',
            name: 'Upload',
            component: () => import('@/components/Upload.vue')
          },
          {
            path: '/management/orders',
            name: 'Orders',
            component: () => import('@/components/Orders.vue')
          },
          {
            path: '/management/communications',
            name: 'Communications',
            component: () => import('@/components/Communications.vue')
          },
          {
            path: '/management/logistics',
            name: 'Logistics',
            component: () => import('@/components/Logistics.vue')
          }
        ]
      }
    ]
  })