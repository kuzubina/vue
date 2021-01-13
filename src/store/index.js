import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'
import category from './modules/category'
import product from './modules/product'
import client from './modules/client'
import order from './modules/order'
import messages from './modules/messages'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	main, category, product, client, order, messages, setting
  }
})
