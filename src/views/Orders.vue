<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Заказы</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content" v-if="orderFilterList.length">
                        <div class="input-field search-box">
                            <input id="search" type="text" v-model="search">
                            <label for="search">Поиск</label>
                        </div>
                        <table class="highlight table orders-table res-table">
                            <thead>
                                <tr>
                                    <th scope="col" class="center">№</th>
                                    <th scope="col" class="center">Бот</th>
                                    <th scope="col" class="center">Дата</th>
                                    <th scope="col">Клиент</th>
                                    <th scope="col">Товары</th>
                                    <th scope="col" class="center">Сумма</th>
                                    <th scope="col" class="center">Статус</th>
                                    <th scope="col" class="center">Управление</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orderFilterList">
                                    <td data-label="№" class="center"><span>{{ order.number }}</span></td>
                                    <td data-label="Бот" class="center"><span><i :class="order.bot"></i></span></td>
                                    <td data-label="Дата" class="center"><span>{{ timeConverter(order.date) }}</span></td>
                                    <td data-label="Клиент"><span>{{ order.name }} </span></td>
                                    <td data-label="Товары"><span>{{ productNameList(order.productList) }}</span></td>
                                    <td data-label="Сумма" class="center"><span>{{ sumOrder(order.productList) }}</span></td>
                                    <td data-label="Статус" class="center">
                                        <span v-if="order.status == 'Новый'">
                                            <div class="badge light-green accent-3">{{ order.status }}</div>
                                        </span>
                                        <span style="padding: 0" v-else><div>{{ order.status }}</div></span>
                                    </td>
                                    <td data-label="Управление" class="product-nav-btn center">
                                        <span v-if="order.status == 'Новый'">
                                            <router-link :to="{name: 'Orders-item-update', params: {id: order._id}}" class="tooltipped" data-position="top" data-tooltip="Смотреть"><i class="material-icons">visibility</i></router-link>
                                            <a href="#"
                                                class="tooltipped" 
                                                data-position="top" 
                                                data-tooltip="Удалить"
                                                @click.prevent="removeOrder(order._id)"
                                                >
                                                <i class="material-icons">clear</i> 
                                            </a>
                                        </span>
                                        <span v-else>
                                            <router-link :to="{name: 'Orders-item', params: {id: order._id}}" class="tooltipped" data-position="top" data-tooltip="Смотреть"><i class="material-icons">visibility</i></router-link>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pagination-box" v-if="ordersList.length > pageSize">
                            <div class="per-page">
                                <div class="per-page-label">Показывать</div>
                                <select class="browser-default" v-model="pageSize" @change="setupPagination(ordersList)">
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                    <option value="80">80</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <paginate
                              v-model="page"
                              :page-count="pageCount"
                              :click-handler="pageChangeHandler"
                              :prev-text="'chevron_left'"
                              :next-text="'chevron_right'"
                              :next-link-class="'material-icons'"
                              :prev-link-class="'material-icons'"
                              :container-class="'pagination'">
                            </paginate>
                        </div>
                    </div>
                    <div class="card-content" v-else>
                        <div class="row">
                            <div class="col s12">
                                <br>
                                <h5 class="center">У вас еще нет заказов</h5>
                                <br>
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
import {mapGetters, mapAction} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
export default {
    name: 'Orders',
    components: {
        Loader
    },
    mixins: [paginationMixin],
    metaInfo: {
        title: 'Ваши заказы'
    },
    data: () => ({
        loading: true,
        search: ''
    }),
    computed: {
        ...mapGetters(["ordersList"]),
        orderFilterList() {
            if(this.items){
                return this.items.filter(el => {
                  for(var key in el){
                    if(String(el[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1){
                      return true;
                    }
                  }
                  return false;
                });
            } else {
                return true
            }
          
        },
    },
    async mounted() {
        await this.getOrderList()
        this.setupPagination(this.ordersList)
        M.AutoInit()
        this.loading = false
    },
    methods: {
        async getOrderList() {
            await this.$store.dispatch('getOrderList')
        },
        sumOrder(arr) {
            let total = 0
            arr.forEach(el => {
                let totalItem = el.price*el.quantity
                total += totalItem
            })
            return total
        },
        productNameList(arr) {
            let list = arr.map((b, i) => {
                return `${b.name}`
            }).join(', ')
            return list
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
        async removeOrder(id) {
            await this.$store.dispatch('removeOrder', id)
            await this.getOrderList()
            this.setupPagination(this.ordersList)
            M.toast({html: `Заказ удален`})
        }
    },
}
</script>