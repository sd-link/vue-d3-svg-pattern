import Vue from 'vue'
import Router from 'vue-router'
import DrawingSvg from '@/components/DrawingSvg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DrawingSvg',
      component: DrawingSvg
    }
  ]
})
