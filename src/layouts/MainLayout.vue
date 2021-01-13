<template>
    <div class="main-app">
        <div class="mob-header">
            <div class="main-logo">
                <span>EASY-BOT</span>
            </div>
            <div class="menu__mobile_button" :class="{active: burgerStatus}" @click="showBurger">
                <span></span>
            </div>
        </div>
        <div class="app-body">
            <div class="side-nav" :class="{'active-nav': burgerStatus}">
                <div class="main-logo">
                    <span>EASY-BOT</span>
                </div>
                <SideBar />
            </div>
            <div class="app-wrapper">
                <div class="main-body">

                  <router-view />
                    
                </div>
                <div class="app-footer">© 2020 easy-bot</div>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from '@/components/SideBar';
import {mapGetters} from 'vuex'
export default {
    name: 'main-layout',
    components: {
        SideBar
    },
    computed: {
        ...mapGetters(["burgerStatus"]),
    },
    methods: {
        showBurger(){
            if (this.burgerStatus == true) {
                this.$store.commit('updateBurgerStatus', false)
            } else {
                this.$store.commit('updateBurgerStatus', true)
            }
        }
    }
}
</script>