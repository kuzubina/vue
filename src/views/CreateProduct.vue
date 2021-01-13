<template>
    <div>
        <div class="row">
            <div class="col s12">
                <div class="page-title">Создание товара</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <form class="card-content" @submit.prevent="createProduct">
                        <div class="row mb0">
                            <div class="input-field col s12 l6">
                                <input 
                                id="name" 
                                type="text" 
                                v-model.trim="name"
                                :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                                >
                                <label for="name">Название товара*</label>
                                <small 
                                    class="helper-text invalid"
                                    v-if="$v.name.$dirty && !$v.name.required"
                                >Название не должно быть пустым</small>
                                <small 
                                    class="helper-text invalid"
                                    v-else-if="$v.name.$dirty && !$v.name.minLength"
                                >Название должно быть не менее {{$v.name.$params.minLength.min}} символов</small>
                            </div>
                            <div class="input-field col s12 m4 l2">
                                <select
                                v-model.trim="category"
                                @change="getVariable(category)"
                                :class="{invalid: ($v.category.$dirty && !$v.category.required)}"
                                >
                                    <option disabled selected>Выбрать</option>
                                    <option 
                                    v-for="cat in catList" 
                                    v-bind:value="cat.name" 
                                    v-if="cat.childrenCat == false"
                                    >{{ cat.name }}</option>
                                </select>
                                <label>Категория*</label>
                                <small 
                                class="helper-text invalid"
                                v-if="$v.category.$dirty && !$v.category.required"
                                >Категория*</small>
                            </div>
                            <div class="input-field col s12 m4 l2">
                                <select
                                v-model.trim="status"
                                >
                                    <option value="active" selected="true">Активен</option>
                                    <option value="disabled">Не активен</option>
                                </select>
                                <label>Статус*</label>
                            </div>
                            <div class="input-field col s12 m4 l2" v-if="!this.variable">
                                <input
                                 id="price" 
                                 type="text" 
                                 v-model.trim="price"
                                 :class="{invalid: ($v.price.$dirty && !$v.price.required)}"
                                 >
                                <label for="price">Цена*</label>
                                <small 
                                class="helper-text invalid"
                                v-if="$v.price.$dirty && !$v.price.required"
                                >Укажите цену товара</small>
                            </div>
                        </div>
                        <div class="row" v-if="this.variable">
                            <div class="input-field col s12 l6">
                                <input 
                                id="variName1"
                                type="text" 
                                v-model="variData[0].name"
                                >
                                <label for="variName1">Укажите размер или другой параметр*</label>
                            </div>
                            <div class="input-field col s12 l2">
                                <input 
                                type="text" 
                                id="variPrice1"
                                v-model="variData[0].price"
                                >
                                <label for="variPrice1">Цена</label>
                            </div>
                            <div class="input-field col s12 l6">
                                <input 
                                id="variName2"
                                type="text" 
                                v-model="variData[1].name"
                                >
                                <label for="variName2">Укажите размер или другой параметр</label>
                            </div>
                            <div class="input-field col s12 l2">
                                <input 
                                type="text" 
                                id="variPrice2"
                                v-model="variData[1].price"
                                >
                                <label for="variPrice2">Цена</label>
                            </div>
                            <div class="input-field col s12 l6">
                                <input 
                                id="variName3"
                                type="text" 
                                v-model="variData[2].name"
                                >
                                <label for="variName3">Укажите размер или другой параметр</label>
                            </div>
                            <div class="input-field col s12 l2">
                                <input 
                                type="text" 
                                id="variPrice3"
                                v-model="variData[2].price"
                                >
                                <label for="variPrice3">Цена*</label>
                            </div>

                        </div> 
                        <div class="row">
                            <div class="col s12">
                                <div class="product-img-row">
                                    <div class="img-box">
                                        <img :src="url" alt="">
                                    </div>
                                    <div class="input-field">
                                        <input 
                                        id="uri" 
                                        type="text" 
                                        v-model.trim="url"
                                        :class="{invalid: ($v.url.$dirty && !$v.url.required)}"
                                        >
                                        <label for="uri">Ссылка на изображение*</label>
                                        <small 
                                        class="helper-text invalid"
                                        v-if="$v.url.$dirty && !$v.url.required"
                                        >Добавьте ссылку на изображение</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb0">
                            <div class="input-field col s12">
                                <textarea 
                                id="textarea1" 
                                class="materialize-textarea"
                                v-model.trim="description"
                                :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
                                ></textarea>
                                <label for="textarea1">Описание*</label>
                                <small 
                                class="helper-text invalid"
                                v-if="$v.description.$dirty && !$v.description.required"
                                >Добавьте описание</small>
                            </div>
                        </div>
                        <div class="row mb0">
                            <div class="col s12">
                                <router-link to="/product" class="waves-effect waves-teal btn grey lighten-2 black-text">Отмена</router-link>
                                <button class="waves-effect waves-light btn accent right">Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'Create-Product',
    data: () => ({
        name: '',
        category: '',
        status: 'active',
        price: ' ',
        url: '',
        description: '',
        variable: false,
        variData: []
    }),
    validations: {
        name: {required, minLength: minLength(3)},
        category: {required},
        price: {required},
        url: {required},
        description: {required},
    },
    computed: {
        ...mapGetters(["catList"]),
    },
    mounted() {
        M.AutoInit();
        this.getCatList()
    },
    methods: {
        async getCatList() {
            this.$store.dispatch('getListCategories')
            setTimeout(() => {
                M.AutoInit()
            }, 200)
        },
        async createProduct() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            let self = this
            const localData = JSON.parse(localStorage.getItem("ebot"))
            const catLength = await axios.get(`/product-length/${localData.userId}/${this.category}`)
            const data = {
                userId: localData.userId,
                name: this.name,
                category: this.category,
                status: this.status,
                price: this.variable ? 0 : this.price,
                url: this.url,
                description: this.description,
                index: catLength.data.length + 1,
                variable: this.variData
            }
            
            const res = await axios.post('/product', data)
            try {
                self.$router.push('/product')
                M.toast({html: `${res.data.message}`})
            } catch (e) {
                M.toast({html: `${e.response.data.message}`})
            }
        },
        getVariable(val) {
            this.variable = this.catList.find(el => el.name == val).variable
            if(this.catList.find(el => el.name == val).variable) {
            	this.variData.push({name: '', price: ''}, {name: '', price: ''}, {name: '', price: ''})
            } else {
            	this.variData.length = 0
            }
        }
    }
}
</script>