import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/components/index/indexList'
import index from '@/components/livePlay/PlayDetail' 
import More from '@/components/scenery/More'
import Test from '@/components/index/test'
import vue from '@/components/vue'

import SceneryPlayDetail from '@/components/scenery/sceneryPlayDetail'


Vue.use(Router)

export default new Router({
  routes: [ 
    // {
    //   path: '/',
    //   name: 'sg',
    //   component: sg
    // },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/sceneryPlayDetail',
      name: 'SceneryPlayDetail',
      component: SceneryPlayDetail
    },
    // {
    //   path: '/',
    //   name: 'vue',
    //   component: vue
    // },
    {
      path: '/',
      name: 'IndexList',
      component: IndexList
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/More',
      name: 'More',
      component: More
    }
  ],
})
