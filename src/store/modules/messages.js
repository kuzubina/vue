import axios from 'axios'
export default {
	state: {
		messages: [],
  },
  actions: {
  	async getListMsg(ctx) {
        let localData = JSON.parse(localStorage.getItem("ebot"))
        const res = await axios.get(`/history-message/${localData.userId}`)
        const msg = res.data
        ctx.commit('updateListMsg', msg)
    },
  },
  mutations: {
  	updateListMsg(state, msg) {
  	 state.messages = msg
  	},
  },
  getters: {
  	msgList(state) {
  		return state.messages.reverse()
  	}
  }
}