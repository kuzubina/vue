<template>
<nav class="navbar main-gradient">
	<div class="nav-wrapper">
		<div class="navbar-left">
			<a href="#" @click.prevent="$emit('click')">
				<i class="material-icons">dehaze</i>
			</a>
			<span>{{date | date('datetime')}}</span>
		</div>

		<ul class="right hide-on-small-and-down">
			<li>
				<a href="#" title="Выход" @click.prevent="logout">
				{{ userName }}
				<i class="material-icons right">exit_to_app</i>
				</a>
			</li>
			
		</ul>
	</div>
</nav>
</template>


<script>
export default {
	data: () => ({
		date: new Date(),
		interval: null,
		userName: '',
	}),
	methods: {
		getUserName() {
			let local = JSON.parse(localStorage.getItem("ebot"))
			this.userName = local.name
		},
		logout() {
			this.$router.push('/login?message=logout')
			localStorage.removeItem("ebot")
		}
	},
	mounted() {
		this.getUserName()

		this.interval = setInterval(() => {
			this.date = new Date()
		}, 1000)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	}
}
</script>
