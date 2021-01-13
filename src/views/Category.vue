<template>
    <div>
        <div class="row">
            <div class="col s12">
                <div class="page-title">Категории</div>
            </div>
        </div>
        <div class="row mb0">
            <div class="col s12">
                <div class="card border-radius mb0">
                    <Loader v-if="loading" />
                    <div class="card-content" v-if="catList.length">
                        <div class="row mb0">

                            <div class="col s12 m6 l4" v-for="categori in catList" v-if="catList.length">
                                <div class="hoverable card category-card">
                                    <button 
                                    class="btn-flat del-category tooltipped" 
                                    data-position="top" 
                                    data-tooltip="Удалить категорию"
                                    @click="removeCategory(categori.userId, categori.name)"
                                    >
                                    <i class="material-icons">clear</i></button>
                                    <div class="category-title">{{ categori.name }}</div>
                                    <div class="parrents-category" 
                                    title="Основная категори"
                                    v-if="categori.parentCatName"><b>{{ categori.parentCatName }}</b></div>
                                    <div class="category-info" v-if="categori.childrenCat == false"><b>{{ getCategoryLength(categori.name) }}</b> товаров</div>
                                    <div class="category-info" v-if="categori.childrenCat == true">Есть подкатегории</div>
                                </div>
                            </div>
                            <div class="col s12" v-if="catList.length == 0">
                                <br>
                                <h5 class="center">У вас еще нет категорий</h5>
                                <br>
                            </div>

                        </div>
                    </div>
                    <div class="card-content" v-else>
                        <div class="row">
                            <div class="col s12">
                                <br>
                                <h5 class="center">У вас еще нет категорий</h5>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Trigger -->
        <div class="fixed-action-btn">
            <a href="#add-category" class="btn btn-floating btn-large modal-trigger accent pulse tooltipped" data-position="left" data-tooltip="Добавить категорию">
                <i class="large material-icons">add</i>
            </a>
        </div>
        <!-- Modal Structure -->
        <div id="add-category" class="modal category-modal">
            <div class="modal-content">
                <h5 class="center">Добавить категорию</h5>
                <div class="select-category-box setting-card">
                    <ul class="tabs">
                        <li class="tab"><a class="active" href="#test1">Основная категория</a></li>
                        <li class="tab"><a href="#test2">Подкатегория</a></li>
                    </ul>
                    <div id="test1">
                        <form class="new-category-form" @submit.prevent="addCategory">
                            <div class="input-field col s12">
                                <input 
                                id="name" 
                                type="text" 
                                class="validate"
                                v-model="name"
                                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                                > 
                                <!-- <small class="helper-text right">{{ name.length }}/{{$v.name.$params.maxLength.max}}</small> -->
                                <label for="name">Название категории</label>
                                <small 
                                    class="helper-text invalid left"
                                    v-if="$v.name.$dirty && !$v.name.required"
                                >Название категории не должено быть пустым</small>
                                <!-- <small 
                                    class="helper-text invalid left"
                                    v-else-if="$v.name.$dirty && !$v.name.maxLength"
                                >Название категории должно быть не более {{$v.name.$params.maxLength.max}} символов</small> -->
                            </div>
                            <div class="input-field col s12">
                                <select v-model="variable1">
                                  <option value="" selected>Единичный</option>
                                  <option value="true">Вариативный</option>
                                </select>
                                <label>Тип товара</label>
                            </div>
                            <br>
                            <div class="input-field col s12">
                                <button class="waves-effect waves-green accent btn">Сохранить</button>
                            </div>
                        </form>
                    </div>
                    <div id="test2">
                        <form class="new-category-form" @submit.prevent="addSubCategory">
                            <div class="input-field col s12">
                                <select 
                                v-model.trim="parentCatName"
                                id="parentCatName"
                                class="validate"
                                :class="{invalid: ($v.parentCatName.$dirty && !$v.parentCatName.required)}">
                                  <option disabled selected>Выберите категорию</option>
                                  <option 
                                  v-for="category in catList" 
                                  v-bind:value="category.name"
                                  :value="category.name"
                                  v-if="getCategoryLength(category.name) == 0 && !category.parentCatName">
                                    {{ category.name }}
                                  </option>
                                </select>
                                <label>Родительская категория</label>
                                <small 
                                    class="helper-text invalid"
                                    v-if="$v.parentCatName.$dirty && !$v.parentCatName.required"
                                >Выберите родительскую категорию</small>
                                <small>Подкатегория создается если у родительской категории нет товаров! </small>
                            </div>
                            <div class="input-field col s12">
                                <input 
                                id="name1" 
                                type="text" 
                                class="validate"
                                v-model="name1"
                                :class="{invalid: ($v.name1.$dirty && !$v.name1.required)}"
                                > 
                                <!-- <small class="helper-text right">{{ name1.length }}/{{$v.name1.$params.maxLength.max}}</small> -->
                                <label for="name1">Название подкатегории</label>
                                <small 
                                    class="helper-text invalid left"
                                    v-if="$v.name1.$dirty && !$v.name1.required"
                                >Название категории не должено быть пустым</small>
                                <!-- <small 
                                    class="helper-text invalid left"
                                    v-else-if="$v.name1.$dirty && !$v.name1.maxLength"
                                >Название категории должно быть не более {{$v.name1.$params.maxLength.max}} символов</small> -->
                            </div>
                            <!-- <div class="input-field col s12">
                                <select v-model="variable2">
                                  <option value="" selected>Единичный</option>
                                  <option value="true">Вариативный</option>
                                </select>
                                <label>Тип товара</label>
                            </div>
 -->                            <div class="input-field col s12">
                                <button class="waves-effect waves-green accent btn">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- <form class="new-category-form" @submit.prevent="addCategory">
                    <div class="input-field col s12">
                        <input 
                        id="name" 
                        type="text" 
                        class="validate"
                        v-model="name"
                        >
                        <label for="name">Название категории</label>
                    </div>
                    <div class="input-field col s12">
                        <button class="modal-close waves-effect waves-green accent btn">Сохранить</button>
                    </div>
                </form> -->
            </div>
        </div>
    </div>
</template>
 
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import {required, maxLength} from 'vuelidate/lib/validators'
import Loader from '@/components/Loader';
export default {
    name: 'category',
    components: {
        Loader
    },
    metaInfo: {
        title: 'Категории товаров'
    },
    data: () => ({
        loading: true,
        name: '',
        parentCatName: '',
        name1: '',
        variable1: '',
        variable2: ''
    }),
    validations: {
        name: {required},
        // name: {required, maxLength: maxLength(11)},
        name1: {required},
        // name1: {required, maxLength: maxLength(11)},
        parentCatName: {required},
    },
    computed: {
        ...mapGetters(["catList", "productList"]),
    },
    async mounted () {
        await this.$store.dispatch('getListCategories')
        await this.$store.dispatch('getListProduct')
        setTimeout(() => {
            M.AutoInit()
        })
        this.loading = false
    },
    methods: {
        async addCategory() {
            if (this.$v.name.$invalid) {
                this.$v.name.$touch()
                return
            }

            const modal = M.Modal.getInstance(document.querySelector('.modal'))
            modal.close()
            let localData = JSON.parse(localStorage.getItem("ebot"))
            const res = await axios.post('/category', {
              userId: localData.userId,
              token: localData.token,
              name: this.name,
              variable: this.variable1 ? true : false
            })
            try {
                await this.$store.dispatch('getListCategories')
                M.toast({html: `${res.data.message}`})
                this.name = this.name1 = ''
                M.AutoInit()
            } catch (e) {
                M.toast({html: `${e.response.data.message}`})
            }
        },
        async addSubCategory() {
            if (this.$v.name1.$invalid || this.$v.parentCatName.$invalid) {
                this.$v.name1.$touch()
                this.$v.parentCatName.$touch()
                return
            }
            const modal = M.Modal.getInstance(document.querySelector('.modal'))
            modal.close()

            let localData = JSON.parse(localStorage.getItem("ebot"))
            const res = await axios.post('/sub-category', {
              userId: localData.userId,
              token: localData.token,
              name: this.name1,
              parentCatName: this.parentCatName,
              variable: this.catList.find(el => el.name == this.parentCatName).variable
            })
            try {
                await this.$store.dispatch('getListCategories')
                M.toast({html: `${res.data.message}`})
                this.name = this.name1 = ''
                    M.AutoInit()
            } catch (e) {
                M.toast({html: `${e.response.data.message}`})
            }
        },
        async removeCategory(id, name) {
            const delCat = await axios.delete(`/category/${id}/${name}`)
            try {
                await this.$store.dispatch('getListCategories')
                M.toast({html: `${delCat.data.message}`})
                M.AutoInit()
            } catch (e) {
                M.toast({html: `${e.response.data.message}`})
            }
        },
        getCategoryLength(name) {
            const cat = this.productList.filter(el => el.category == name)
            return cat.length
        }
    }
}
</script>