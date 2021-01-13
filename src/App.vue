<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component> 
  </div>
</template>


<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  mounted() {
    M.AutoInit();
    // $('#add-category').modal();
    // $("select").material_select();
    // $('.collapsible').collapsible();
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/main.min.css'
</style>
