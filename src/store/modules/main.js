import axios from 'axios'
export default {
	state: {
		isBurgerActive: false
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
  	updateBurgerStatus(state, burger) {
  	 state.isBurgerActive = burger
  	},
  },
  getters: {
  	burgerStatus(state) {
  		return state.isBurgerActive
  	}
  }
}