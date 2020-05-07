import Vue from 'vue'
import Api from '@/plugins/axios'
import App from './App.vue'
import router from './router'
import './router/intercept'
import store from './store'
import 'lib-flexible'
import './utils/directive'

Vue.prototype.$Api = Api; //注入Api对象
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')