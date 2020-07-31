import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import axios from 'axios'
import vuex from 'vuex'
import VueAxios from 'vue-axios'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios,axios)

Vue.prototype.$axios = axios

Vue.config.productionTip = true
new Vue({
  router,
  vuex,
  render: h => h(App),
}).$mount('#app')
