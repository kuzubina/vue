<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Настройки</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content setting-card">
                        <div class="row">
                            <div class="col s12 l8">
                                <form @submit.prevent="updateSetting">
                                    <ul class="tabs">
                                        <li class="tab"><a class="active" href="#tab1">Основные</a></li>
                                        <li class="tab"><a href="#tab2">Сообщения</a></li>
                                        <li class="tab" v-if="setting.tarif !== 2"><a href="#tab3">Telegram</a></li>
                                        <li class="tab" v-if="setting.tarif !== 1"><a href="#tab4">Viber</a></li>
                                    </ul>
                                    <div id="tab1">
                                        <div class="row">
                                            <div class="col s12 l6">
                                                <div class="input-field">
                                                    <select v-model.trim="currency">
                                                        <option value="грн">Гривна</option>
                                                        <option value="руб">Рубль</option>
                                                        <option value="тг">Тенге</option>
                                                    </select>
                                                    <label>Основная валюта</label>
                                                </div>
                                            </div>
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <select multiple v-model.trim="payments">
                                                      <option value="cash" selected disabled >Наличные</option>
                                                      <option value="visa" selected>Картой банка при получении</option>
                                                    </select>
                                                    <label>Выберите возможные способы оплаты товара для клиента</label>
                                                </div>
                                            </div>
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <input id="tg-chat-notification" type="text" v-model="tgIdNotification">
                                                    <label for="tg-chat-notification">Telegram Чат ID для уведомлений о новых заказах</label>
                                                    <span class="helper-text" data-error="wrong" data-success="right">Добавьте бота <b>@zakazEasyBot</b> и он покажет ID вашего чата</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end tab-->
                                    <div id="tab2">
                                    		<div class="row">
                                            <div class="input-field col s12 l12">
                                                <textarea id="textarea1" class="materialize-textarea" v-model="msgBotHello"></textarea>
                                                <label for="textarea1"><b>Приветствие</b></label>
                                            </div>
                                            <div class="input-field col s12 l12">
                                                <textarea id="textarea2" class="materialize-textarea" v-model="msgBotContact"></textarea>
                                                <label for="textarea2"><b>Контакты</b></label>
                                            </div>
                                            <div class="input-field col s12 l12">
                                                <textarea id="textarea3" class="materialize-textarea" v-model="msgBotDelivery"></textarea>
                                                <label for="textarea3"><b>Доставка</b></label>
                                            </div>
                                        </div>
                                    </div><!-- end tab-->
                                    <div id="tab3" v-if="setting.tarif !==2">
                                        <div class="row">
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <input id="tg-token" type="text" v-model="tgToken">
                                                    <label for="tg-token">Telegram token</label>
                                                    <button class="waves-effect btn accent right" 
                                                    @click.prevent="makeTgBot"
                                                    v-if="!isTgBot"
                                                    >Создать Бота</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end tab-->
                                    <div id="tab4" v-if="setting.tarif !== 1">
                                        <div class="row">
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <input id="tg-token" type="text" v-model="vbToken[0].token">
                                                    <label for="tg-token">Viber token</label>
                                                </div>
                                            </div>
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <input id="tg-token" type="text" v-model="vbToken[0].name">
                                                    <label for="tg-token">Account Name</label>
                                                </div>
                                            </div>
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <input id="tg-token" type="text" v-model="vbToken[0].avatar">
                                                    <label for="tg-token">avatar</label>
                                                </div>
                                            </div>
                                            <div class="col s12">
                                                <div class="input-field">
                                                    <button class="waves-effect btn accent right" 
                                                    @click.prevent="makeVbBot"
                                                    v-if="!isVbBot"
                                                    >Создать Бота</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end tab-->
                                    <div class="col s12 l12">
                                        <button class="waves-effect btn accent right">Сохранить</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'Setting',
    components: {
        Loader
    },
    metaInfo: {
        title: 'Настройки'
    },
    data: () => ({
        loading: true,
        currency: '',
        payments: [],
        tgToken: '',
        vbToken: [{
            token: '',
            name: '',
            avatar: ''
        }],
        tgIdNotification: '',
        msgBotContact: '',
        msgBotHello: '',
        msgBotDelivery: '',
        isTgBot: '',
        isVbBot: ''
    }),
    computed: {
        ...mapGetters(["setting"]),
    },
    async mounted () {
        await this.$store.dispatch('getSettingState')
        this.currency = this.setting.currency
        this.tgToken = this.setting.tgToken
        this.vbToken = this.setting.vbToken.length ? this.setting.vbToken : [{
            token: '',
            name: '',
            avatar: ''
        }]
        this.tgIdNotification = this.setting.tgIdNotification
        this.msgBotContact = this.setting.msgBotContact
        this.msgBotHello = this.setting.msgBotHello
        this.msgBotDelivery = this.setting.msgBotDelivery
        this.payments = this.setting.payments
        
        setTimeout(() => {
            M.AutoInit()
            this.$nextTick(M.updateTextFields);
            M.textareaAutoResize(document.getElementById('textarea1'))
            M.textareaAutoResize(document.getElementById('textarea2'))
            M.textareaAutoResize(document.getElementById('textarea3'))
        })
        
        this.loading = false

        this.checkTelegramBot()
        this.checkViberBot()
    },
    methods: {
        async updateSetting() {
            let localData = JSON.parse(localStorage.getItem("ebot"))
            let data = {
                currency: this.currency,
                payments: this.payments,
                tgToken: this.tgToken,
                vbToken: this.vbToken,
                tgIdNotification: this.tgIdNotification,
                msgBotHello: this.msgBotHello,
                msgBotContact: this.msgBotContact,
                msgBotDelivery: this.msgBotDelivery
            }
            await this.$store.dispatch('updateSetting', data)

            if(this.currency !== this.setting.currency) {
                await axios.post(`/setting-currency/${localData.userId}`, {currency: this.currency})
            }
            try {
                M.toast({html: `Настройки сохранены`})
            } catch(e) {
                console.log(e)
            }
        },
        async checkTelegramBot() {
            let localData = JSON.parse(localStorage.getItem("ebot"))
            const isBot = await axios.get(`/check-tgbot/${localData.userId}`)
            this.isTgBot = isBot.data.message
            // console.log(Math.round((new Date()).getTime() / 1000))
            // console.log(Math.round((new Date()).getTime() / 1000) + (60*60*24*7))
        },
        async checkViberBot() {
            let localData = JSON.parse(localStorage.getItem("ebot"))
            const isBot = await axios.get(`/check-vbbot/${localData.userId}`)
            this.isVbBot = isBot.data.message
        },
        async makeTgBot() {
            try {
                let localData = JSON.parse(localStorage.getItem("ebot")) 
                const data = {
                    tgToken: this.tgToken,
                    dbUserId: localData.userId
                }
                await axios.post('/add-tgbot/', data)

                M.toast({html: `Бот создан`})
                this.isTgBot = true
            } catch(e) {
                console.log(e)
            }
        },
        async makeVbBot() {
            try {
                let localData = JSON.parse(localStorage.getItem("ebot")) 
                const data = {
                    vbToken: this.vbToken[0].token,
                    name: this.vbToken[0].name,
                    avatar: this.vbToken[0].avatar,
                    dbUserId: localData.userId
                }
                await axios.post('/add-vbbot/', data)

                M.toast({html: `Бот создан`})
                this.isVbBot = true
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.m-check-filed {
    margin-bottom: 15px;
    p {
        margin-bottom: 15px;
    }
    label {
        margin-right: 35px;
    }
}
</style>