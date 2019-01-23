// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from './assets/js/store/index'
import { routes } from './router/index'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
