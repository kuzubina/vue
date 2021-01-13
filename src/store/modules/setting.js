import axios from 'axios'

export default {
	state: {
		setting: []
  },
  actions: {
  	async getSettingState(ctx) {
        let localData = JSON.parse(localStorage.getItem("ebot"))
        const res = await axios.get(`/setting/${localData.userId}`)
        const setting = res.data
        ctx.commit('updateSettingState', setting)
    },
    async updateSetting(ctx, data) {
      let localData = JSON.parse(localStorage.getItem("ebot"))
      const res = await axios.post(`/setting/${localData.userId}`, data)
    }
  },
  mutations: {
  	updateSettingState(state, setting) {
  	 state.setting = setting
  	},
  },
  getters: {
  	setting(state) {
  		return state.setting
  	}
  }
}