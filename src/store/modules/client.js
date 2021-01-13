import axios from 'axios'
export default {
	state: {
		clients: [],
  },
  actions: {
  	async getListClient(ctx) {
        let localData = JSON.parse(localStorage.getItem("ebot"))
        const res = await axios.get(`/client/${localData.userId}`)
        const clients = res.data
        ctx.commit('updateListClient', clients)
    },
    async getClientOne(ctx, id) {
        const res = await axios.get(`/client-one/${id}`)
        const clients = res.data
        ctx.commit('updateListClient', clients)
    }
  },
  mutations: {
  	updateListClient(state, clients) {
  	 state.clients = clients
  	},
  },
  getters: {
  	clientsList(state) {
  		return state.clients.reverse()
  	}
  }
}