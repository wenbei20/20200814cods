/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataManageRouter = {
  path: '/dataManage',
  component: Layout,
  redirect: '/dataManage/unifiedCode',
  name: 'DataManage',
  meta: {
    title: '数据管理',
    icon: 'table'
  },
  children: [
    {
      path: 'unifiedCode',
      component: () => import('@/views/dataManage/unifiedCode'),
      name: 'UnifiedCode',
      meta: { title: '统一代码管理' }
    },
    {
      path: 'unifiedCode/:id(\\d+)',
      component: () => import('@/views/dataManage/details'),
      name: 'UnifiedCodeDetails',
      meta: { title: '统一社会信用代码详情', noCache: true, activeMenu: '/dataManage/unifiedCode' },
      hidden: true
    },
    {
      path: 'extendedInformation',
      component: () => import('@/views/dataManage/extendedInformation'),
      name: 'ExtendedInformation',
      meta: { title: '扩展信息管理' }
    },
    {
      path: 'extendedInformation/:id(\\d+)',
      component: () => import('@/views/dataManage/details'),
      name: 'ExtendedInformationDetails',
      meta: { title: '统一社会信用代码详情', noCache: true, activeMenu: '/dataManage/extendedInformation' },
      hidden: true
    },
    {
      path: 'queryStatistics',
      component: () => import('@/views/dataManage/queryStatistics'),
      name: 'QueryStatistics',
      meta: { title: '查询统计' }
    }
  ]
}
export default dataManageRouter
