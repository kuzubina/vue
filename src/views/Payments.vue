<template>
    <div class="app-page">
        <div class="row">
            <div class="col s12">
                <div class="card border-radius">
                    <Loader v-if="loading" />
                    <div class="check-box">
                        <div class="check-box__title">Платёж принят!</div>
                        <div class="check-box__ico">
                            <svg class="length" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle  cx="38.5" cy="38.5" r="34.5" data-value="100" stroke-width="7"/>
                                <path d="M21.5 38.5L32 49L52.5 28.5" data-value="100" stroke-width="7"/>
                            </svg>
                        </div>
                        <div class="payment-details check-box__body">
                            <div class="ticket-box">
                                <div class="ticket-box__body">
                                    <div class="payment-details__header">
                                        <div class="payment-details__title">Тариф {{ tarif[plan] }}</div>
                                        <div class="payment-details__description">{{ timeConverterMin(Math.round((new Date()).getTime() / 1000)) }}</div>
                                        <div class="payment-details__header-value"><b> {{ price[plan]*duration }} $ </b></div>
                                    </div>
                                    <div class="payment-details__body">
                                        <div class="payment-details__title">Детали тарифа</div>
                                        <dl class="payment-details__list">
                                            <dt class="payment-details__body-row-title">Название</dt>
                                            <dd class="payment-details__description">{{ tarif[plan] }}</dd>
                                            <dt class="payment-details__body-row-title">Доступные боты</dt>
                                            <dd class="payment-details__description">{{ bots[plan] }}</dd>
                                            <!-- <dt class="payment-details__body-row-title">Дата следующего платежа</dt> -->
                                            <!-- <dd class="payment-details__description">
                                                {{ timeConverter(Math.round((new Date()).getTime() / 1000) + (60*60*24*(30*duration))) }}
                                            </dd> -->
                                        </dl>
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
import axios from 'axios'
import Loader from '@/components/Loader'
export default {
    name: 'Payments',
    components: {
        Loader
    },
    metaInfo: {
        title: 'Оплата аккаунта'
    },
    data: () => ({
        loading: true,
        tarif: ['START', 'STANDART', 'STANDART', 'PREMIUM'],
        bots: ['START', 'Telegram', 'Viber', 'Telegram + Viber'],
        price: [0, 10, 10, 15],
        plan: null,
        duration: null,
    }),
    async mounted() {
        this.checkDate()
        this.loading = false
    },
    methods: {
        checkDate() {
            const currentTime = Math.round((new Date()).getTime() / 1000).toString().slice(5)
            const plan = this.$route.params.id.match(/(\d).*/)[1]
            const time = this.$route.params.id.match(/\d(\d{5}).*/)[1]
            const duration = this.$route.params.id.match(/\d{6}(.*)/)[1]
            this.plan = plan
            this.duration = +duration / 30
            if((currentTime - +time) <= 5) {
                // console.log('ok')
                this.updatePlan()
                this.animateCheck()
            } else {
                // console.log('not')
            }
        },
        animateCheck() {
            setTimeout(() => {
                document.querySelector('.check-box').classList.add('active');
            }, 100)
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
        timeConverterMin(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
          return time;
        },
        async updatePlan() {
            let localData = JSON.parse(localStorage.getItem("ebot"))
            const data = {
                id: this.$route.params.id
            }
            await axios.post(`/update-tarif/${localData.userId}`, data)
        }
    }
}
</script>

<style scoped>
.check-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding-top: 20px; }
  .check-box__title {
    font-size: 28px;
    line-height: 38px;
    color: #000;
    font-weight: 700;
    margin: 0;
    margin-bottom: 24px; }
  .check-box__ico {
    width: 76px;
    height: 76px;
    margin-bottom: 38px; }
    .check-box__ico svg {
      width: 100%;
      height: 100%; }
    .check-box__ico circle,
    .check-box__ico path {
      fill: transparent;
      stroke: #56D372;
      stroke-dasharray: 217; }
      .active .check-box__ico circle, .active
      .check-box__ico path {
        -webkit-animation: animate-check 1s linear forwards;
                animation: animate-check 1s linear forwards; }
    .check-box__ico path {
      stroke-dasharray: 44;
      stroke-dashoffset: 44; }
  .check-box__body {
    position: relative;
    max-width: 350px;
    width: 100%;
    margin-bottom: 103px;
    margin-top: 0;
    padding-bottom: 38px;
    padding-top: 0;
    background: transparent; }
    .check-box__body:before {
      content: '';
      height: 14px;
      background: #C4C4C4;
      position: absolute;
      left: -11px;
      right: -11px;
      top: 0;
      -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
              transform: translateY(-50%);
      z-index: 0;
      border-radius: 4px; }
  .check-box__nav-item {
    margin: 0 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-width: 3px; }
    .check-box__nav-item:hover {
      border-width: 3px; }
      .check-box__nav-item:hover .ico-repeat {
        -webkit-transform: translateY(0%) rotate(360deg);
            -ms-transform: translateY(0%) rotate(360deg);
                transform: translateY(0%) rotate(360deg); }
  .check-box__nav .ico-download {
    width: 24px;
    height: 24px; }
  .check-box__nav .ico-star {
    width: 24px;
    height: 24px; }
  .check-box__nav .ico-repeat {
    width: 24px;
    height: 24px;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s; }
  @media (max-width: 992px) {
    .check-box {
      padding-top: 0;
      margin-top: -14px;
      margin-bottom: 50px; }
      .check-box__title {
        font-size: 20px;
        line-height: 27px;
        margin-bottom: 13px; }
      .check-box__ico {
        width: 50px;
        height: 50px;
        margin-bottom: 16px; }
      .check-box__body {
        padding-bottom: 0;
        padding-top: 0;
        margin-bottom: 42px;
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        max-width: 318px;
        width: 100%; }
        .check-box__body .payment-details__header {
          padding-bottom: 10px; }
        .check-box__body .payment-details__title {
          font-size: 13px;
          line-height: 18px;
          margin-bottom: 7px; }
        .check-box__body .payment-details__description {
          font-size: 11px;
          line-height: 15px;
          margin-bottom: 5px; }
        .check-box__body .payment-details__body .payment-details__description {
          margin-bottom: 11px; }
      .check-box__nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        max-width: 326px;
        width: 100%; }
        .check-box__nav-item {
          margin: 0 0 10px 0;
          padding-top: 13px;
          padding-bottom: 13px;
          border-width: 2px;
          width: 100%;
          position: relative; }
          .check-box__nav-item svg {
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
            right: 56px;
            margin-left: 0; }
          .check-box__nav-item:hover {
            border-width: 2px; }
            .check-box__nav-item:hover .ico-repeat {
              -webkit-transform: translateY(-50%) rotate(360deg);
                  -ms-transform: translateY(-50%) rotate(360deg);
                      transform: translateY(-50%) rotate(360deg); } }
  @media (max-width: 350px) {
    .check-box .check-box__nav-item svg {
      right: 30px; } }

@-webkit-keyframes animate-check {
  0% {
    stroke-dasharray: 0 217; }
  40% {
    stroke-dasharray: 72 217; }
  80% {
    stroke-dasharray: 140 217; }
  100% {
    stroke-dasharray: 217 217; } }

@keyframes animate-check {
  0% {
    stroke-dasharray: 0 217; }
  40% {
    stroke-dasharray: 72 217; }
  80% {
    stroke-dasharray: 140 217; }
  100% {
    stroke-dasharray: 217 217; } }

.ticket-box {
    overflow: hidden;
  padding-bottom: 13px;
  padding-left: 30px;
  margin-left: -30px;
  padding-right: 30px;
  margin-right: -30px;
  padding-bottom: 36px; }
  .ticket-box__body {
    padding-top: 31px;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    background: #F7F8F9;
    -webkit-box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.14);
            box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.14);
    position: relative;
    -webkit-transform: translateY(-150%);
        -ms-transform: translateY(-150%);
            transform: translateY(-150%);
    padding-bottom: 36px; }
    .active .ticket-box__body {
      -webkit-transform: translateY(0%);
          -ms-transform: translateY(0%);
              transform: translateY(0%); }
    .ticket-box__body:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -13px;
      right: 0;
      height: 13px;
      background: url(../assets/img/check-bottom-bg.svg) repeat-x; }
  @media (max-width: 992px) {
    .ticket-box {
      padding-left: 15px;
      margin-left: -15px;
      padding-right: 15px;
      margin-right: -15px; }
      .ticket-box__body {
        padding-top: 21px;
        padding-bottom: 10px;
        -webkit-box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13);
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13); } }

.payment-details {
  margin-bottom: 17px;
  -webkit-box-flex: 0;
      -ms-flex: 0 0 360px;
          flex: 0 0 360px;
  height: 100%; }
  .payment-details__close {
    position: absolute;
    top: 25px;
    right: 21px;
    width: 36px;
    height: 36px;
    border: none;
    padding: 0;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0.5;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center; }
    .payment-details__close:hover {
      opacity: 1; }
    .payment-details__close svg {
      width: 16px;
      height: 16px; }
  .payment-details__header {
    position: relative;
    padding-bottom: 28px;
    margin-bottom: 13px;
    padding-left: 30px;
    padding-right: 30px; }
    .payment-details__header:before {
      content: "";
      position: absolute;
      left: 30px;
      bottom: 0;
      right: 30px;
      height: 1px;
      background: #E0E0E0; }
    .payment-details__header .payment-details__description {
      margin-bottom: 22px; }
    .payment-details__header-value {
      font-weight: 500;
      font-size: 26px;
      line-height: 36px;
      color: #000000; }
  .payment-details__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    margin: 0;
    margin-bottom: 10px; }
  .payment-details__description {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.02em;
    color: #828282;
    margin: 0;
    margin-bottom: 19px; }
    .payment-details__description:last-child {
      margin-bottom: 0; }
  .payment-details__body {
    padding-left: 26px;
    padding-right: 26px; }
    .payment-details__body .payment-details__title {
      margin-bottom: 20px; }
    .payment-details__body-row {
      margin-bottom: 19px; }
      .payment-details__body-row-title {
        font-size: 13px;
        font-weight: 600;
        line-height: 16px;
        color: #262626;
        letter-spacing: 0.2px;
        margin-bottom: 6px;
        word-wrap: break-word; }
      .payment-details__body-row-link {
        color: #1A3BE2;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: end;
            -ms-flex-align: end;
                align-items: flex-end; }
        .payment-details__body-row-link-txt {
          border-bottom: 1px solid #1A3BE2;
          margin-right: 8px; }
        .payment-details__body-row-link .ico-download {
          width: 15px;
          height: 15px;
          fill: #1A3BE2; }
        .payment-details__body-row-link:hover .payment-details__body-row-link-txt {
          border-bottom: 1px solid transparent; }
  .payment-details__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex; }
  .payment-details__col {
    width: 50%;
    padding-right: 15px; }
  .payment-details__list {
    margin: 0; }
  .payment-details__footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    padding-left: 17px;
    padding-right: 20px;
    padding-top: 42px; }
    .payment-details__footer .g-btn {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1; }
      .payment-details__footer .g-btn:first-child {
        margin-right: 15px; }
</style>