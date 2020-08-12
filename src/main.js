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
Vue.prototype.$socket = socket('http://www.delon.store',{path: '/chatApi/'})
Vue.$socket.emit('chat message', '错就错在server接入')
Vue.config.productionTip = true
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
