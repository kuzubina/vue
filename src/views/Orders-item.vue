<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <h4 class="page-title">Заказ № {{ ordersList[0].number }}</h4>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content">
                        <div class="update-order-form">
                            <div class="order-top-row">
                                <div class="order-row">
                                    <div class="order-clients-col">
                                        <div class="order-col-title">Клиент</div>
                                        <router-link 
                                        :to="`/clients/${ordersList[0].clientDbId}`" 
                                        class="order-profile">
                                        <i :class="ordersList[0].bot"></i>
                                        {{ ordersList[0].name}}
                                        </router-link>
                                    </div>
                                    <div class="order-date">
                                        <div class="order-col-title">Дата</div>
                                        <div class="order-date-value">{{ timeConverter(ordersList[0].date) }}</div>
                                    </div>
                                    <div class="order-date">
                                        <div class="order-col-title">Оплата</div>
                                        <div class="order-date-value">{{ ordersList[0].payments }}</div>
                                    </div>
                                    <div class="order-date">
                                        <div class="order-col-title">Состояние</div>
                                        <div class="order-date-value">{{ ordersList[0].status }}</div>
                                    </div>
                                </div>

                                <div class="order-row">
                                    <div class="order-delivery">
                                        <div class="order-col-title">Доставка</div>
                                        <div class="order-date-value">{{ ordersList[0].delivery }}</div>
                                    </div>
                                </div>
                                <div class="order-row" v-if="ordersList[0].comments">
                                    <div class="order-comments">
                                        <div class="order-col-title">Комментарий</div>
                                        <div class="order-date-value">{{ ordersList[0].comments }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="order-product-row" v-for="(item, i) in ordersList[0].productList">
                                <div class="product-img-col">
                                    <img :src="item.url" alt="">
                                </div>
                                <div class="product-name-col">
                                    <div class="order-col-label">Товар</div>
                                    <div class="order-col-value">{{ item.name }}</div>
                                </div>
                                <div class="product-quantity-col">
                                    <div class="order-col-label">Кол-во</div>
                                    <div class="order-col-value">
                                        <div>{{ item.quantity }}</div>
                                    </div>
                                </div>
                                <div class="product-price-col">
                                    <div class="order-col-label">Цена</div>
                                    <div class="order-col-value">{{ sumItem(item) }}</div>
                                </div>
                            </div>

                            <div class="order-total-row">
                                <div class="order-total-title">Итого:</div>
                                <div class="order-total-value">{{ sumOrder(ordersList[0].productList) }}  {{ ordersList[0].productList[0].currency }}</div>
                            </div>
                            <div class="order-item-submit-row">
                                <router-link to="/orders" class="waves-effect waves-green accent-btn btn">Назад</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'Order-item',
    components: {
        Loader
    },
    data: () => ({
        loading: true,
    }),
    computed: {
        ...mapGetters(["ordersList"]),
    },
    async mounted() {
        await this.$store.dispatch('getOrderItem', this.$route.params.id)
        setTimeout(() => {
            M.AutoInit()
        })
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
        sumItem(obj) {
            let total = obj.price*obj.quantity
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