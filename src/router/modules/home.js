/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataComparisonRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/index',
  name: 'Home',
  meta: {
    title: '统一社会信用代码',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/home'),
      name: 'Index',
      meta: { title: '首页' }
    }
  ]
}
export default dataComparisonRouter
