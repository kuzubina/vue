<template>
    <div class="app-page">
    </div>
</template>
<script>
export default {
    name: 'Check',
    beforeCreate: function () {
    		const string = this.$route.params.plan.split('-')
        const time = Math.round((new Date()).getTime() / 1000).toString().slice(5)
        this.$router.push(`/tarif/${string[0]}${time}${string[1]}`)
    }
}
</script>

