import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/components/index/indexList'
import PlayDetail from '@/components/livePlay/PlayDetail' 
import More from '@/components/scenery/More'

import SceneryPlayDetail from '@/components/scenery/sceneryPlayDetail'


Vue.use(Router) 

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'IndexList',
      component: IndexList
    },
    {
      path: '/sceneryPlayDetail',
      name: 'SceneryPlayDetail',
      component: SceneryPlayDetail
    },
    {
      path: '/PlayDetail',
      name: 'PlayDetail',
      component: PlayDetail
    },
    {
      path: '/More',
      name: 'More',
      component: More
    }
  ],
})
