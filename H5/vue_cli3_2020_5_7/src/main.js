import Vue from 'vue'

import App from './App.vue'

// api
import Api from '@/api'
Vue.prototype.$Api = Api; //注入Api对象

// router
import router from '@/router'
import '@/router/intercept'

// vuex
import store from '@/store'

// rem
import 'lib-flexible'

// directive
import '@/utils/directive'

// plugin
import './plugin';

//国际化
import i18n from '@/locale'


Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')