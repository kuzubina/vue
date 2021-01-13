import axios from 'axios'

export default {
	state: {
		product: [],
  },
  actions: {
  	async getListProduct(ctx) {
        let localData = JSON.parse(localStorage.getItem("ebot"))
        const res = await axios.get(`/product/${localData.userId}`)
        const product = res.data
        ctx.commit('updateListProduct', product)
    },
    async getProductItem(ctx, id) {
        const res = await axios.get(`/product-item/${id}`)
        const product = res.data
        ctx.commit('updateListProduct', product)
    },
    async editProduct(ctx, val) {
      await axios.post('/update-product', val)
    },
    async deleteProduct(ctx, id) {
      await axios.delete(`/product/${id}`)
      this.dispatch('getListProduct')
    },
    async minusIndex(ctx, val) {
      await axios.get(`/minus-index/${val.userId}/${val.catName}/${val.prodId}/${val.index}`)
      this.dispatch('getListProduct')
    },
    async plusIndex(ctx, val) {
      const res = await axios.get(`/plus-index/${val.userId}/${val.catName}/${val.prodId}/${val.index}`)
      this.dispatch('getListProduct')
    },
  },
  mutations: {
  	updateListProduct(state, product) {
  	 state.product = product
  	},
  },
  getters: {
  	productList(state) {
  		return state.product
  	},
  }
}