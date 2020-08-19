import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/index.js'
import socket from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios,axios)

Vue.prototype.$axios = axios
Vue.prototype.$socket = socket('http://www.delon.store:3000')
window.onunload = () => {
  Vue.prototype.$socket.disconnect()
}
Vue.config.productionTip = true
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
