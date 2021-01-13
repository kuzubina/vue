<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Клиенты</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content" v-if="clientFilterList.length">
                        <div class="input-field search-box">
                            <input id="search" type="text" v-model="search">
                            <label for="search">Поиск</label>
                        </div>

                        <table class="highlight table clients-list-table res-table">
                            <thead>
                                <tr>
                                    <th scope="col" class="center">Бот</th>
                                    <th scope="col" class="center">ID</th>
                                    <th scope="col">Клиент</th>
                                    <th scope="col">Телефон</th>
                                    <th scope="col" class="center">Дата подписки</th>
                                    <th scope="col" class="center">Управление</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="client in clientFilterList">
                                    <td data-label="Бот" class="center"><span><i :class="client.bot"></i></span></td>
                                    <td data-label="ID" class="center"><span>{{ client.id }}</span></td>
                                    <td data-label="Клиент"><span>{{ client.name }}</span></td>
                                    <td data-label="Телефон"><span>{{ client.phone }}</span></td>
                                    <td data-label="Дата подписки" class="center"><span>{{ timeConverter(client.start) }}</span></td>
                                    <td data-label="Управление" class="product-nav-btn center">
                                        <span>
                                            <router-link :to="{name: 'Client-profile', params: {id: client._id}}" class="tooltipped" data-position="top" data-tooltip="Смотреть"><i class="material-icons">visibility</i></router-link>
                                            <!-- <a href="clients-item.html" class="tooltipped" data-position="top" data-tooltip="Редактированть"><i class="material-icons">create</i></a> -->
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pagination-box" v-if="clientsList.length > pageSize">
                            <div class="per-page">
                                <div class="per-page-label">Показывать</div>
                                <select class="browser-default" v-model="pageSize" @change="setupPagination(clientsList)">
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
                                <h5 class="center">У вас еще нет клиентов</h5>
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
import paginationMixin from '@/mixins/pagination.mixin'
import {mapGetters} from 'vuex'
export default {
    name: 'Clients',
    mixins: [paginationMixin],
    components: {
        Loader
    },
    metaInfo: {
        title: 'Ваши клиенты'
    },
    data: () => ({
        search: '',
        loading: true
    }),
    computed: {
        ...mapGetters(["clientsList"]),
        // поиск 
        clientFilterList() {
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
        M.AutoInit()
        await this.getClientList()
        this.setupPagination(this.clientsList)
    },
    methods: {
        async getClientList() {
            await this.$store.dispatch('getListClient')
            this.loading = false
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
        }
    }
}
</script>