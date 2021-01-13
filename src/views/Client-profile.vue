<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <h4 class="page-title">Карточка клиента</h4>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content user-card" v-else="!loading">
                        
                        <h4 class="user-name">{{ clientsList[0].name }}</h4>
                        <table class="striped">
                            <tbody>
                                <tr>
                                    <td>Бот:</td>
                                    <td><i :class="clientsList[0].bot"></i></td>
                                </tr>
                                <tr>
                                    <td>Телефон:</td>
                                    <td>{{ clientsList[0].phone }}</td>
                                </tr>
                                <tr>
                                    <td>Адрес доставки:</td>
                                    <td>{{ clientsList[0].delivery }}</td>
                                </tr>
                                <tr>
                                    <td>Дата подписки:</td>
                                    <td>{{ timeConverter(clientsList[0].start) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="ordersList.length">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content user-history-card">
                        <h5 class="mt0">История заказов</h5>
                        <ul class="collapsible">

                            <li v-for="order in ordersList">
                                <div class="collapsible-header">
                                    <div class="user-history-header">
                                        <div>
                                            <div class="user-history-col user-history-order">№ {{ order.number }}</div>
                                            <div class="user-history-col user-history-date">{{ timeConverter(order.date) }}</div>
                                        </div>
                                        <div>
                                            <div class="user-history-col user-history-val">{{ sumOrder(order.productList) }} {{ order.productList[0].currency }}</div>
                                            <div class="user-history-col user-history-ico">
                                                <i class="material-icons">expand_more</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="collapsible-body user-history-product">
                                    <div class="order-product-row" v-for="list in order.productList">
                                        <div class="product-img-col">
                                            <img :src="list.url" alt="">
                                        </div>
                                        <div class="product-name-col">
                                            <div class="order-col-label">Товар</div>
                                            <div class="order-col-value">{{ list.name }}</div>
                                        </div>
                                        <div class="product-quantity-col">
                                            <div class="order-col-label">Кол-во</div>
                                            <div class="order-col-value">{{ list.quantity }}</div>
                                        </div>
                                        <div class="product-price-col">
                                            <div class="order-col-label">Цена</div>
                                            <div class="order-col-value">{{ list.price }}</div>
                                        </div>
                                    </div>

                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';
import {mapGetters} from 'vuex'
export default {
    name: 'Client-profile',
    components: {
        Loader
    },
    data: () => ({
        loading: true,
    }),
    computed: {
        ...mapGetters(["clientsList", "ordersList"]),
    },
    async mounted() {
        await this.$store.dispatch('getClientOne', this.$route.params.id)
        await this.$store.dispatch('getOrderOneUser', this.clientsList[0].chatId)
        M.AutoInit()
        this.loading = false
    },
    methods: {
        sumOrder(arr) {
            let total = 0
            arr.forEach(el => {
                let totalItem = el.price*el.quantity
                total += totalItem
            })
            return total
        },
        timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + '.' + month + '.' + year;
          return time;
        },
    }
}
</script>