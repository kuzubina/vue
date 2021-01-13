<template>
	<div>
		<ul class="main-nav">
       
				<router-link
				v-for="link in links"
				:key="link.url"
				tag="li"
				active-class="active"
				:to="link.url"
				:exact="link.exact"
			>
				<span class="top-round"></span>
				<a href="#" @click="hideNav"><i class="small material-icons">{{link.ico}}</i><span></span>{{link.title}}</a>
				<span class="bottom-round"></span>
			</router-link>

    </ul>
    <a href="#" class="logout-item" @click.prevent="logout">
        <i class="material-icons small">exit_to_app</i>
        <span>Выход</span>
    </a>
	</div>
</template>

<script>
export default {
	data: () => ({
		links: [
			{title: 'Главная', url: '/', ico: 'dashboard', exact: true},
			{title: 'Категории', url: '/category', ico: 'insert_chart'},
			{title: 'Товары', url: '/product', ico: 'photo_filter'},
			{title: 'Заказы', url: '/orders', ico: 'add_shopping_cart'},
			{title: 'Клиенты', url: '/clients', ico: 'face'},
			{title: 'Рассылка', url: '/newsletter', ico: 'mail_outline'},
			{title: 'Настройки', url: '/setting', ico: 'settings'},
			{title: 'Тарифы', url: '/tarif', ico: 'attach_money'},
			{title: 'FAQ', url: '/faq', ico: 'help_outline'},
		],
	}),
	methods: {
		logout() {
			this.$router.push('/login?message=logout')
			localStorage.removeItem("ebot")
		},
		hideNav() {
			this.$store.commit('updateBurgerStatus', false)
		}
	},
}
</script>