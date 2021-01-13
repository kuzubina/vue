import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.component('paginate', Paginate)

// axios.defaults.baseURL = 'http://localhost:5000/api'
// axios.defaults.baseURL = 'http://149.154.65.127:5000/api'
axios.defaults.baseURL = 'https://api.easybot.com.ua/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
