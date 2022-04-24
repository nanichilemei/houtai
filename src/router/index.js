import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页管理', icon: 'el-icon-s-help' }
    }]

  },
  {
    path: '/jurisdiction',
    component: Layout,
    redirect: '/jurisdiction/userId',
    name: 'Jurisdiction',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userId',
        name: 'UserId',
        component: () => import('@/views/jurisdiction/userId'),
        meta: { title: '账号管理', icon: 'table' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/jurisdiction/role'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import('@/views/jurisdiction/resources'),
        meta: { title: '资源管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: 'Goods',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'GoodsList',
        component: () => import('@/views/goods/list'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'add/detail',
        name: 'GoodsDetailAdd',
        hidden: true,
        component: () => import('@/views/goods/list/detail'),
        meta: { title: '新增商品', icon: 'table', activeMenu: '/goods/list' }
      },
      {
        path: 'edit/detail/:id',
        name: 'GoodsDetailEdit',
        hidden: true,
        component: () => import('@/views/goods/list/detail'),
        meta: { title: '修改商品', icon: 'table', activeMenu: '/goods/list' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/goods/category'),
        meta: { title: '商品分类', icon: 'tree' }
      },
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/goods/brand'),
        meta: { title: '品牌管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
      {
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/order/list/detail'),
        meta: { title: '订单详情', icon: 'table', activeMenu: '/order/list' }
      },
      {
        path: 'back',
        name: 'Back',
        component: () => import('@/views/order/back'),
        meta: { title: '退单列表', icon: 'tree' }
      },
      {
        path: 'backDetail/:id',
        name: 'BackDetail',
        hidden: true,
        component: () => import('@/views/order/back/backdetail'),
        meta: { title: '退单列表', icon: 'tree', activeMenu: '/order/back' }
      },
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/order/address'),
        meta: { title: '地址管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    alwaysShow: true,
    meta: { title: '注册用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/list',
    name: 'Marketing',
    meta: { title: '营销管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/marketing/list'),
        meta: { title: '限时活动', icon: 'table' }
      },
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: () => import('@/views/marketing/advertisement'),
        meta: { title: '广告列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/content/article'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'add/article',
        name: 'articleDetail',
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '新增文章', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'edit/article/:id',
        name: 'articleEdit',
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '编辑文章', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('@/views/content/material'),
        meta: { title: '素材管理', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
