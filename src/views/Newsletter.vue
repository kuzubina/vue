<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Рассылка</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <div class="card-content mailer-card">
                        <Loader v-if="loading" />
                        <div class="row">
                            <div class="col s12">
                                <ul class="tabs">
                                    <li class="tab"><a class="active" href="#tab1">Новая рассылка</a></li>
                                    <li class="tab"><a href="#tab2">История рассылок</a></li>
                                </ul>
                            </div>
                            <div id="tab1" class="col s12">
                                <form class="make-new-news" @submit.prevent="sending">
                                    <div class="row">
                                        <div class="col s12">
                                            <div class="input-field">
                                                <input 
                                                    id="msg-name" 
                                                    type="text" 
                                                    v-model.trim="title"
                                                    :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength)}"
                                                >
                                                <label for="msg-name">Название рассылки*</label>
                                                <small 
                                                    class="helper-text invalid"
                                                    v-if="$v.title.$dirty && !$v.title.required"
                                                >Название не должно быть пустым</small>
                                                <small 
                                                    class="helper-text invalid"
                                                    v-else-if="$v.title.$dirty && !$v.title.minLength"
                                                >Название должно быть не менее {{$v.title.$params.minLength.min}} символов</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s12 l6">
                                            <div class="input-field">
                                                <select v-model="type">
                                                    <option value="text" selected>Текстовое сообщение</option>
                                                    <option value="photo">Фото с описанием</option>
                                                </select>
                                                <label>Тип сообщения</label>
                                            </div>
                                        </div>
                                        <div class="col s12 l6">
                                            <div class="input-field">
                                                <select v-model="clients">
                                                    <option value="all" selected>Все клиенты</option>
                                                    <option value="ordering">Клиенты совершавшие заказы</option>
                                                    <option value="no-ordering">Клиенты не совершавшие заказы</option>
                                                </select>
                                                <label>Клиенты</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" v-if="type == 'photo'">
                                        <div class="col s12">
                                            <div class="input-field">
                                                <input id="msg-img-url" type="text" v-model="url">
                                                <label for="msg-img-url">Ссылка на изображение</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s12 l12">
                                            <div class="input-field">
                                                <textarea 
                                                    id="textarea1" 
                                                    class="materialize-textarea" 
                                                    v-model="msg"
                                                    :class="{invalid: ($v.msg.$dirty && !$v.msg.required) || ($v.msg.$dirty && !$v.msg.maxLength)}"
                                                    ></textarea>
                                                <label for="textarea1"> Текст сообщения</label>
                                                <small 
                                                    class="helper-text invalid left"
                                                    v-if="$v.msg.$dirty && !$v.msg.required"
                                                >Текст сообщения не должен быть пустым</small>
                                                <small 
                                                    class="helper-text invalid left"
                                                    v-else-if="$v.msg.$dirty && !$v.msg.maxLength"
                                                >Текст сообщения должен быть не более {{$v.msg.$params.maxLength.max}} символов</small>
                                                <small class="helper-text right">{{ msg.length }}/{{$v.msg.$params.maxLength.max}}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row submit-mail-form">
                                        <div class="col s12">
                                            <button class="waves-effect waves-light btn accent right">Отправить</button>
                                        </div>
                                    </div>
                                </form>
                            </div><!-- end tab-->
                            <div id="tab2" class="col s12">
                                <div class="row" v-if="msgList.length">
                                    <div class="col s12">
                                        <ul class="collapsible">
                                            <li v-for="msg in msgList">
                                                <div class="collapsible-header mail-history-header">
                                                    <div class="mail-history-header-info">
                                                        <div class="mail-history-select-ico">
                                                            <i class="material-icons tooltipped" 
                                                            data-position="top" 
                                                            data-tooltip="Все клиенты" v-if="msg.clients === 'all'">group</i>
                                                            <i class="material-icons tooltipped" 
                                                            data-position="top" 
                                                            data-tooltip="Клиенты совершавшие заказы" v-if="msg.clients === 'ordering'">group_add</i>
                                                            <i class="material-icons tooltipped" 
                                                            data-position="top" 
                                                            data-tooltip="Клиенты не совершавшие заказы" v-if="msg.clients === 'no-ordering'">contacts</i>
                                                        </div>
                                                        <div class="history-mail-name">{{ msg.title }}</div>
                                                        <div class="history-mail-date">{{ timeConverter(msg.date) }}</div>
                                                    </div>
                                                    <div class="mail-history-header-ico">
                                                        <i class="material-icons">expand_more</i>
                                                    </div>
                                                </div>
                                                <div class="collapsible-body mail-history-body">
                                                    <div class="mail-history-msg">
                                                        <div class="mail-history-img" v-if="msg.url">
                                                            <img :src="msg.url" alt="">
                                                        </div>
                                                        <div class="mail-history-txt">{{ msg.msg }}</div>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div class="row" v-else>
                                    <div class="col s12">
                                        <br>
                                        <h5 class="center">У вас еще нет отправленных сообщений</h5>
                                        <br>
                                    </div>
                                </div>
                            </div><!-- end tab-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {required, minLength, maxLength} from 'vuelidate/lib/validators'
import {mapGetters, mapAction} from 'vuex'
import Loader from '@/components/Loader';
export default {
    name: 'Newsletter',
    components: {
        Loader
    },
    metaInfo: {
        title: 'Рассылка сообщений'
    },
    data: () => ({
        title: '',
        type: 'text',
        clients: 'all',
        url: '',
        msg: '',
        loading: true,
    }),
    validations: {
        title: {required, minLength: minLength(3)},
        msg: {required, maxLength: maxLength(1024)}
    },
    computed: {
        ...mapGetters(["msgList"]),
    },
    async mounted () {
        await this.$store.dispatch('getListMsg')
        await this.$store.dispatch('getSettingState')
        this.loading = false
        M.AutoInit()
    },
    methods: {
        async sending() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            let localData = JSON.parse(localStorage.getItem("ebot"))

            const set = this.$store.state.setting.setting
            let data = {
                dbUserId: localData.userId,
                title: this.title,
                type: this.type,
                clients: this.clients,
                url: this.url,
                msg: this.msg,
                tgToken: set.tgToken,
                vbToken: set.vbToken[0].token,
            }

            await axios.post(`/send-message/`, data)
            try {
                this.$store.dispatch('getListMsg')
                M.toast({html: `Сообщение успешно отправлено`})
                this.title = this.url = this.msg = ''
            } catch (e) {
                M.toast({html: `Что-то пошло не так`})
            }
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

<style scope>
    .collapsible {
        position: relative;
    }
</style>