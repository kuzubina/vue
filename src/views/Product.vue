<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Товары</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content product-list-table" v-if="productFilterList.length">
                        <div class="input-field search-box">
                            <input type="text" placeholder="Поиск" v-model="search">
                        </div>
                        <table class="highlight table product-table res-table">
                            <thead>
                                <tr>
                                    <th scope="col">Категория</th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Описание</th>
                                    <th scope="col" class="center">Цена</th>
                                    <th scope="col" class="center">Статус</th>
                                    <th scope="col" class="center">Управление</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productFilterList">
                                    <td data-label="Категория"><span>{{ product.category }}</span></td>
                                    <td data-label="Название"><span>{{ product.name }}</span></td>
                                    <td data-label="Описание"><span>{{ product.description }}</span></td>
                                    <td data-label="Цена" class="center">
                                        <span v-if="product.price > 0">{{ product.price }}</span>
                                        <span v-if="product.price == 0"
                                        >{{ variPrice(product) }}</span>
                                    </td>
                                    <td data-label="Статус" class="center">
                                        <span v-if="product.status == 'active'">
                                            <i class="material-icons product-status-active">mood</i>
                                        </span>
                                        <span v-else="product.status == 'disabled'">
                                            <i class="material-icons product-status-disabled">mood_bad</i>
                                        </span>
                                    </td>
                                    <td data-label="Управление" class="product-nav-btn">
                                        <span>
                                            <router-link :to="{name: 'Edit-product', params: {id: product._id}}" class="tooltipped" data-position="top" data-tooltip="Смотреть"><i class="material-icons">visibility</i></router-link>
                                            <!-- <a href="#"
                                            class="tooltipped" 
                                            data-position="top" 
                                            data-tooltip="Редактировать"
                                            @click.prevent="selectProduct(product._id)"
                                            >
                                                <i class="material-icons">create</i>
                                            </a> -->
                                            <a href="#" 
                                            class="tooltipped" 
                                            data-position="top" 
                                            data-tooltip="Удалить"
                                            @click.prevent="deleteProduct(product._id)"
                                            >
                                                <i class="material-icons">clear</i>
                                            </a>
                                            <a href="#" 
                                            class="tooltipped" 
                                            data-position="top" 
                                            data-tooltip="Поднять"
                                            @click.prevent="minusIndex(product.category, product.userId, product._id, product.index)"
                                            >
                                                <i class="material-icons">arrow_upward</i>
                                            </a>
                                            <a href="#" 
                                            class="tooltipped" 
                                            data-position="top" 
                                            data-tooltip="Опустить"
                                            @click.prevent="plusIndex(product.category, product.userId, product._id, product.index)"
                                            >
                                                <i class="material-icons">arrow_downward</i>
                                            </a>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <div class="pagination-box">
                            <div class="per-page">
                                <div class="per-page-label">Показывать</div>
                                <select class="browser-default" v-model="pageSize" @change="setupPagination(productList)">
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
                        </div> -->
                    </div>
                    <div class="card-content" v-else>
                        <div class="row">
                            <div class="col s12">
                                <br>
                                <h5 class="center">У вас еще нет товаров</h5>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn">
            <router-link to="/create-product" class="btn-floating btn-large accent pulse tooltipped" data-position="left" data-tooltip="Добавить товар">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader';
// import paginationMixin from '@/mixins/pagination.mixin'
import {mapGetters, mapAction, mapMutations} from 'vuex'
export default {
    name: 'Product',
    // mixins: [paginationMixin],
    components: {
        Loader
    },
    metaInfo: {
        title: 'Товары'
    },
    data: () => ({
        loading: true,
        search: ''
    }),
    computed: {
        ...mapGetters(["productList"]),
        // поиск
        productFilterList() {
          if(this.productList){
                return this.productList.filter(el => {
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
        await this.$store.dispatch('getListProduct')
        // this.setupPagination(this.productList)
        
        M.AutoInit()
        this.loading = false
    },
    methods: {
        async minusIndex(catName, userId, prodId, index) {
            await this.$store.dispatch('minusIndex', {catName, userId, prodId, index})
            M.toast({html: `Порядок изменен`})
        },
        async plusIndex(catName, userId, prodId, index) {
            await this.$store.dispatch('plusIndex', {catName, userId, prodId, index})
            M.toast({html: `Порядок изменен`})
        },
        async deleteProduct(id) {
            this.$store.dispatch('deleteProduct', id)
            M.toast({html: `Товар удален`})
        },
        variPrice(el) {
            return el.variable.map((b, i) => b.price).join(', ')
        }
    },
}
</script>