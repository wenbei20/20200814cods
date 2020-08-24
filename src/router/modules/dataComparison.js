/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataComparisonRouter = {
  path: '/dataComparison',
  component: Layout,
  redirect: '/dataComparison/comparisonTask',
  name: 'DataComparison',
  meta: {
    title: '数据比对',
    icon: 'table'
  },
  children: [
    {
      path: 'comparisonTask',
      component: () => import('@/views/dataComparison/comparisonTask'),
      name: 'ComparisonTask',
      meta: { title: '比对任务' }
    },
    {
      path: 'dataCompare',
      component: () => import('@/views/dataComparison/dataCompare'),
      name: 'DataCompare',
      meta: { title: '数据比对' }
    },
    {
      path: 'comparisonResultQuery',
      component: () => import('@/views/dataComparison/comparisonResultQuery'),
      name: 'ComparisonResultQuery',
      meta: { title: '比对结果查询' }
    },
    {
      path: 'comparisonResultStatistics',
      component: () => import('@/views/dataComparison/comparisonResultStatistics'),
      name: 'ComparisonResultStatistics',
      meta: { title: '比对结果统计' }
    }
  ]
}
export default dataComparisonRouter
