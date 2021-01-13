import axios from 'axios'
export default {
	state: {
		orders: [],
  },
  actions: {
  	async getOrderList(ctx) {
      let localData = JSON.parse(localStorage.getItem("ebot"))
      const res = await axios.get(`/order/${localData.userId}`)
      const orders = res.data
      ctx.commit('updateOrderList', orders)
    },
    async getOrderOneUser(ctx, id) {
      const res = await axios.get(`/order-one-client/${id}`)
      const orders = res.data
      ctx.commit('updateOrderList', orders)
    },
    async getOrderItem(ctx, id) {
      const res = await axios.get(`/order-item/${id}`)
      const orders = res.data
      ctx.commit('updateOrderList', orders)
    },
    async removeOrder(ctx, id) {
      const res = await axios.delete(`/order/${id}`)
    }
  },
  mutations: {
  	updateOrderList(state, orders) {
      state.orders = orders
    }
  },
  getters: {
    ordersList(state) {
      return state.orders.reverse()
    },
    // getOrderById: (state) => (id) => {
    //   return state.orders.find(el => el._id === id)
    // },
    // getUserOrder: (state) => (id) => {
    //   return state.orders.filter(el => el.clientId == id)
    // } 
  }
}