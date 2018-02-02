import Vue from 'vue'
import Router from 'vue-router'
import DrawingSvg from '@/components/DrawingSvg'
window.$ = window.jQuery = require('jquery')
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
