import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/testComponent'
import testCompo from '@/components/test_project/test_project_compo.vue'
Vue.use(Router)
Vue.prototype.$_serverName = window.location.hostname;

export default new Router({
   mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test/ronoktest',
      component: test
     },
      {
      path: '/test/compo',
      component: testCompo
     },

  ]
})
