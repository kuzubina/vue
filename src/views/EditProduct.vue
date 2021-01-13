<template>
    <div>
        <div class="row">
            <div class="col s12">
                <div class="page-title">Редактирование товара</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <form v-if="!loading" class="card-content" @submit.prevent="editProduct">
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
                            <div class="col s12 m4 l2">
                                <div class="order-date">
                                    <div class="order-col-title">Категория</div>
                                    <div class="order-date-value">{{ category }}</div>
                                </div>
                                <!-- <select
                                v-model.trim="category"
                                :class="{invalid: ($v.category.$dirty && !$v.category.required)}"
                                >
                                    <option v-for="cat in catList" v-bind:value="cat.name">{{ cat.name }}</option>
                                </select>
                                <label>Категория*</label>
                                <small 
                                class="helper-text invalid"
                                v-if="$v.category.$dirty && !$v.category.required"
                                >Категория*</small> -->
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
                            <div class="input-field col s12 m4 l2" v-if="price > 0">
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
                        <div class="row" v-if="price == 0">
                            <div class="input-field col s12 l6">
                                <input 
                                id="variName1"
                                type="text" 
                                v-model="variData[0].name"
                                >
                                <label for="variName1">Укажите размер или другой параметр</label>
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
                                <label for="variPrice3">Цена</label>
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
import Loader from '@/components/Loader';
import {required, minLength} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
export default {
    name: 'Edit-Product',
    components: {
        Loader
    },
    data: () => ({
        id: '',
        name: '',
        category: '',
        status: '',
        price: '',
        url: '',
        description: '',
        index: '',
        loading: true,
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
        ...mapGetters(["catList", "productList"]),
    },
    async mounted() {
        await this.$store.dispatch('getProductItem', this.$route.params.id)
        await this.$store.dispatch('getListCategories')
        this.id = this.productList[0]._id
        this.name = this.productList[0].name
        this.price = this.productList[0].price
        this.url = this.productList[0].url
        this.description = this.productList[0].description
        this.category = this.productList[0].category
        this.index = this.productList[0].index
        this.variData = this.productList[0].variable
        this.status = this.productList[0].status || 'active'
        setTimeout(() => {
            M.AutoInit();
            this.$nextTick(M.updateTextFields);
            M.textareaAutoResize(document.getElementById('textarea1'))
        })
        this.loading = false
    },
    methods: {
        async editProduct() {
            const data = {
                id: this.id,
                name: this.name,
                category: this.category,
                status: this.status,
                price: this.price,
                url: this.url,
                description: this.description,
                index: this.index,
                variable: this.variData
            }
            this.$store.dispatch('editProduct', data)
            this.$router.push('/product')
            M.toast({html: `Товар изменен`})
        }
    }
}
</script>

<style scope>
.order-date-value {
    height: 42px;
}
.order-col-title {
    font-size: .8rem;
}
</style>