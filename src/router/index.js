import Vue from 'vue'
import Router from 'vue-router'
import IndexList from '@/components/component/indexList'
import index from '@/components/component/PlayDetail'
import More from '@/components/component/More'
import Test from '@/components/component/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
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
  mode:'history'
})
