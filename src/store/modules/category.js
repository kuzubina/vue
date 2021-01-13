import axios from 'axios'

export default {
	state: {
		category: []
  },
  actions: {
  	async getListCategories(ctx) {
        let localData = JSON.parse(localStorage.getItem("ebot"))
        const res = await axios.get(`/category/${localData.userId}`)
        const categories = res.data
        ctx.commit('updateListCategories', categories)
    },
  },
  mutations: {
  	updateListCategories(state, categories) {
  	state.category = categories
  	},
  },
  getters: {
  	catList(state) {
  		return state.category
  	}
  }
}