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
                        <form class="update-order-form" @submit.prevent="updateItemOrder">
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
                                    <div class="order-state">
                                        <div class="order-col-title">Состояние</div>
                                        <div class="input-field">
                                            <select v-model="status">
                                                <option value="Новый" selected="true">Новый</option>
                                                <option value="Обработан">Обработан</option>
                                            </select>
                                        </div>
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


                            <div class="order-product-row" v-for="(item, i) in productList">
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
                                        <input type="number" min="1" v-model="productList[i].quantity">
                                    </div>
                                </div>
                                <div class="product-price-col">
                                    <div class="order-col-label">Цена</div>
                                    <div class="order-col-value">{{ sumItem(item) }}</div>
                                </div>
                                <div class="product-action-btn">
                                    <button class="btn-floating waves-effect waves-light red tooltipped" data-position="left" data-tooltip="Удалить"><i class="material-icons" @click.prevent="deleteItem(item._id)">close</i></button>
                                </div>
                            </div>

                            <div class="order-total-row">
                                <div class="order-total-title">Итого:</div>
                                <div class="order-total-value">{{ sumOrder(ordersList[0].productList) }} {{ ordersList[0].productList[0].currency }}</div>
                            </div>
                            <div class="order-item-submit-row">
                                <button class="waves-effect waves-green accent-btn btn">Сохранить</button>
                            </div>
                        </form>
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
    name: 'Orders-item-update',
    components: {
        Loader
    },
    data: () => ({
        loading: true,
        status: '',
        productList: {},
    }),
    computed: {
        ...mapGetters(["ordersList"]),
    },
    async mounted() {
        await this.$store.dispatch('getOrderItem', this.$route.params.id)
        this.status = this.ordersList[0].status
        this.productList = this.ordersList[0].productList
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
        deleteItem(id) {
            this.productList = this.productList.filter(el => el._id !== id)
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
        async updateItemOrder() {
            let data = {
                id: this.$route.params.id,
                status: this.status,
                productList: this.productList
            }
            const res = await axios.post(`/update-order/${this.$route.params.id}`, data)
            try {
                this.$router.push('/orders/')
                M.toast({html: `${res.data.message}`})
            } catch (e) {
                M.toast({html: `${e.response.data.message}`})
            }
        },
    }
}
</script>