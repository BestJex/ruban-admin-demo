import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/hidden',
    hidden: true,
    component: Layout,
    hidden: true,
    children: [{
      name: '实例信息',
      path: 'instance',
      component: () => import('@/views/flow/instance/index')
    }]
  },
  {
    path: '/myBench',
    component: Layout,
    name: '我的工作台',
    meta: { title: '我的工作台', icon: 'example' },
    children: [
      {
        path: 'demo',
        name: '发起示例',
        component: () => import('@/views/flow/demo/index'),
        meta: { title: '发起示例', icon: 'table' }
      },
      {
        path: 'todo',
        name: '我的待办',
        component: () => import('@/views/flow/todo/index'),
        meta: { title: '我的待办', icon: 'table' }
      },
      {
        path: 'done',
        name: '我的已办',
        component: () => import('@/views/table/index'),
        meta: { title: '我的已办', icon: 'table' }
      },
      {
        path: 'his',
        name: '我的办结',
        component: () => import('@/views/table/index'),
        meta: { title: '我的办结', icon: 'table' }
      },
      {
        path: 'start',
        name: '我的发起',
        meta: { title: '我的发起', icon: 'table' },
        children: [
          {
            path: 'doing',
            name: '办理中',
            component: () => import('@/views/table/index'),
            meta: { title: '办理中', icon: 'table' }
          },
          {
            path: 'his',
            name: '已办结',
            component: () => import('@/views/table/index'),
            meta: { title: '已办结', icon: 'table' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
