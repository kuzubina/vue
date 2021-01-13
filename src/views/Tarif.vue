<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="page-title">Тарифные планы</div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="card-content setting-card">
                        <div class="row" v-if="(+setting.paymentsDate - Math.round((new Date()).getTime() / 1000)) > (60*60*24*3)">
                            <div class="col s12">
                                <div class="tarif-info green accent-2 border-radius">
                                    Ваш тарифный план <strong>{{ tarif[setting.tarif] }} ({{ bots[setting.tarif] }})</strong> срок действия которого истекает {{ timeConverter(setting.paymentsDate) }}
                                </div>
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div class="col s12">
                                <div class="tarif-info red accent-2 border-radius">
                                    Ваш действующий тарифный план <strong>{{ tarif[setting.tarif] }} ({{ bots[setting.tarif] }})</strong> срок действия которого истекает {{ timeConverter(setting.paymentsDate) }}
                                </div>
                            </div>
                        </div>
                        <div class="row mb0">
                            <div class="col s12 m4">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="plan-logo">
                                            <i class="tg-ico"></i>
                                        </div>
                                        <p class="center">TELEGRAM</p>
                                    </div>
                                    <div class="card-tabs">
                                        <ul class="tabs tabs-fixed-width">
                                            <li class="tab"><a href="#plan-1-1">30 дней</a></li>
                                            <li class="tab"><a class="active" href="#plan-1-2">90 дней</a></li>
                                            <li class="tab"><a href="#plan-1-3">180 дней</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-content grey lighten-4 center">
                                        <div id="plan-1-1"><a href="https://api.fondy.eu/s/viirHUuzlRF" class="waves-effect btn-large accent">10 $</a></div>
                                        <div id="plan-1-2"><a href="https://api.fondy.eu/s/ggSPYL" class="waves-effect btn-large accent">30 $</a></div>
                                        <div id="plan-1-3"><a href="https://api.fondy.eu/s/dPJXLKzTV" class="waves-effect btn-large accent">60 $</a></div>
                                    </div>
                                </div>
                            </div>

                            <div class="col s12 m4">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="plan-logo">
                                            <i class="vb-ico"></i>
                                        </div>
                                        <p class="center">VIBER</p>
                                    </div>
                                    <div class="card-tabs">
                                        <ul class="tabs tabs-fixed-width">
                                            <li class="tab"><a href="#plan-2-1">30 дней</a></li>
                                            <li class="tab"><a class="active" href="#plan-2-2">90 дней</a></li>
                                            <li class="tab"><a href="#plan-2-3">180 дней</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-content grey lighten-4 center">
                                        <div id="plan-2-1"><a href="https://api.fondy.eu/s/DHU73" class="waves-effect btn-large accent">10 $</a></div>
                                        <div id="plan-2-2"><a href="https://api.fondy.eu/s/CNnGPg" class="waves-effect btn-large accent">30 $</a></div>
                                        <div id="plan-2-3"><a href="https://api.fondy.eu/s/ksh2AUB7xIR" class="waves-effect btn-large accent">60 $</a></div>
                                    </div>
                                </div>
                            </div>

                            <div class="col s12 m4">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="plan-logo">
                                            <i class="tg-ico"></i>
                                            <span>+</span>
                                            <i class="vb-ico"></i>
                                        </div>
                                        <p class="center">TELEGRAM + VIBER</p>
                                    </div>
                                    <div class="card-tabs">
                                        <ul class="tabs tabs-fixed-width">
                                            <li class="tab"><a href="#plan-3-1">30 дней</a></li>
                                            <li class="tab"><a class="active" href="#plan-3-2">90 дней</a></li>
                                            <li class="tab"><a href="#plan-3-3">180 дней</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-content grey lighten-4 center">
                                        <div id="plan-3-1"><a href="https://api.fondy.eu/s/G9xKP" class="waves-effect btn-large accent">15 $</a></div>
                                        <div id="plan-3-2"><a href="https://api.fondy.eu/s/oEfsRJiqTgdHYr" class="waves-effect btn-large accent">45 $</a></div>
                                        <div id="plan-3-3"><a href="https://api.fondy.eu/s/EomT" class="waves-effect btn-large accent">90 $</a></div>
                                    </div>
                                </div>
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
export default {
    name: 'tarif',
    components: {
        Loader
    },
    metaInfo: {
        title: 'Тарифные планы'
    },
    data: () => ({
        loading: true,
        tarif: ['START', 'STANDART', 'STANDART', 'PREMIUM'],
        bots: ['START', 'Telegram', 'Viber', 'Telegram + Viber'],
    }),
    computed: {
        ...mapGetters(["setting"]),
    },
    async mounted() {
        await this.$store.dispatch('getSettingState')
        M.AutoInit()
        this.loading = false
    },
    methods: {
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

<style lang="scss" scoped>
    .plan-logo {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        span {
            font-weight: 700;
            font-size: 40px;
            margin: 0 1rem;
        }
        i {
            width: 80px;
            height: 80px;
        }
    }
    .card-content {
        .accent {
            width: 100%;
        }
    }
    .tarif-info {
        padding: 10px;
        text-align: center;
        strong {
            text-transform: uppercase;
        }
    }
</style>