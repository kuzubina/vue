<template>
    <div>
        <div class="row">
            <div class="col s6 l3">
                <div class="card border-radius">
                    <div class="card-content custom-card">
                        <div class="card-ico">
                            <i class="small material-icons">attach_money</i>
                        </div>
                        <div class="card-value">{{ totalOrderSum }}</div>
                        <div class="card-descriptions">Сумма продаж</div>
                    </div>
                </div>
            </div>
            <div class="col s6 l3">
                <div class="card border-radius">
                    <div class="card-content custom-card">
                        <div class="card-ico">
                            <i class="small material-icons">dvr</i>
                        </div>
                        <div class="card-value">{{ middleOrder }}</div>
                        <div class="card-descriptions">Средний чек</div>
                    </div>
                </div>
            </div>
            <div class="col s6 l3">
                <div class="card border-radius">
                    <div class="card-content custom-card">
                        <div class="card-ico">
                            <i class="small material-icons">import_export</i>
                        </div>
                        <div class="card-value">{{ orderLength }}</div>
                        <div class="card-descriptions">Количество заказов</div>
                    </div>
                </div>
            </div>
            <div class="col s6 l3">
                <div class="card border-radius">
                    <div class="card-content custom-card">
                        <div class="card-ico">
                            <i class="small material-icons">group</i>
                        </div>
                        <div class="card-value">{{ users }}</div>
                        <div class="card-descriptions">Всего пользователей</div>
                    </div>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card border-radius">
                    <div class="card-content">
                        <h6 class="center">Способ оплаты</h6>
                        <PieChart v-if="order.length" :label="['Наличные', 'На карту']" :value="paymentChart()" />
                    </div>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card border-radius">
                    <div class="card-content">
                        <h6 class="center">Способ доставки</h6>
                        <PieChart v-if="order.length"  :label="['Доставка', 'Самовывоз']" :value="deliveryChart()" />
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="card border-radius">
                    <div class="card-content">
                        <LineChart v-if="order.length" :label="this.startWeek[0]" :value="saleChart()" />
                    </div>
                </div>
            </div>
            <div class="col s12">
                <div class="card border-radius">
                    <div class="card-content">
                        <LineChartCategories v-if="order.length" :value="categoriesSale()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PieChart from '@/components/PieChart';
import LineChart from '@/components/LineChart';
import LineChartCategories from '@/components/LineChartCategories';
import {mapGetters, mapAction} from 'vuex'
export default {
  name: 'Home',
  components: {
    PieChart, LineChart, LineChartCategories
  },
  metaInfo: {
    title: 'Главная'
  },
  data: () => ({
     loading: true,
     order: '',
     startWeek: '',
     totalOrderSum: '',
     middleOrder: '',
     orderLength: '',
     users: '',
     orderDemo: [{
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000),
            delivery: "ул Шаумяна 8/888",
            payments: "Наличными",
            productList: [
            {
                category: "Салаты",
                price: 3648,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*24),
            delivery: "ул Шаумяна 8/888",
            payments: "На карту банка",
            productList: [
            {
                category: "Пицца",
                price: 7249,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*48),
            delivery: "ул Шаумяна 8/888",
            payments: "Наличными",
            productList: [
            {
                category: "Бургеры",
                price: 5925,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*72),
            delivery: "ул Шаумяна 8/888",
            payments: "На карту банка",
            productList: [
            {
                category: "Суши",
                price: 6849,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*96),
            delivery: "ул Шаумяна 8/888",
            payments: "Наличными",
            productList: [
            {
                category: "Десерты",
                price: 2865,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*120),
            delivery: "Самовывоз",
            payments: "На карту банка",
            productList: [
            {
                category: "Закуски",
                price: 3249,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*144),
            delivery: "ул Шаумяна 8/888",
            payments: "Наличными",
            productList: [
            {
                category: "Напитки",
                price: 4445,
                quantity: 1,
            }]
        },
        {
            bot: "vb-ico",
            date: Math.round((new Date()).getTime() / 1000) - (60*60*168),
            delivery: "Самовывоз",
            payments: "На карту банка",
            productList: [
            {
                category: "Гриль",
                price: 5760,
                quantity: 1,
            }]
        }
        ]
  }),
  computed: {
    ...mapGetters(["ordersList", "clientsList"]),
  },
  async mounted() {
    await this.getOrderList()
    await this.getClientList()
    // this.getMonday(new Date())
    this.lastWeek()
    this.filterOrder()
    this.categoriesSale()
    this.loading = false
  },
  methods: {
    async getOrderList() {
        await this.$store.dispatch('getOrderList')
    },
    async getClientList() {
        await this.$store.dispatch('getListClient')
    },
    filterOrder() {
        const order = this.ordersList.filter(el => el.date >= this.startWeek[1][0])
        this.order = this.ordersList.length ? order : this.orderDemo
        let total = 0
        order.forEach(el => {
            el.productList.forEach(el => {
                let totalItem = el.price*el.quantity
                total += totalItem
            })
        })
        this.totalOrderSum = total || 39990
        this.middleOrder = Math.floor(total / order.length) || 426
        this.orderLength = order.length || 94
        this.users = this.clientsList.length || 2347
    },
    // filterOrder() {
    //     const order = this.ordersList.filter(el => el.date >= this.startWeek)
    //     this.order = order
    //     let total = 0
    //     order.forEach(el => {
    //         el.productList.forEach(el => {
    //             let totalItem = el.price*el.quantity
    //             total += totalItem
    //         })
    //     })
    //     this.totalOrderSum = total || 0
    //     this.middleOrder = Math.floor(total / order.length) || 0
    //     this.orderLength = order.length || 0
    // },
    // getMonday(fromDate) {
    //   var dayLength = 24 * 60 * 60 * 1000;
    //   var currentDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    //   var currentWeekDayMillisecond = ((currentDate.getDay()) * dayLength);
    //   var monday = new Date(currentDate.getTime() - currentWeekDayMillisecond + dayLength);
    //   if (monday > currentDate) {
    //     monday = new Date(monday.getTime() - (dayLength * 7));
    //   }
    //   const date = Date.parse(monday) / 1000
    //   this.startWeek = date
    // },
    lastWeek() {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        const currentDay = new Date().getDay()
        const newWeek = []
        for (var i=currentDay; i < currentDay+8; i++) {
            newWeek.push(days[i])
        }

        const currentDateTime = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / 1000
        const dayLength = 24 * 60 * 60;
        const timeWeek = []
        const currentWeek = []
        for (var i=0; i<8; i++) {
            currentWeek.push(this.timeConverter(+currentDateTime - (+dayLength * i)))
            timeWeek.push(+currentDateTime - (+dayLength * i))
        }
        this.startWeek = [currentWeek.reverse(), timeWeek.reverse()]
    },
    paymentChart() {
        let cash = 0
        let visa = 0
        this.order.forEach(el => {
            if (el.payments == "Наличными") {
                el.productList.forEach(el => {
                    let totalItem = el.price*el.quantity
                    cash += totalItem
                })
            }
            if (el.payments == "На карту банка") {
                el.productList.forEach(el => {
                    let totalItem = el.price*el.quantity
                    visa += totalItem
                })
            }
        })
        return [cash, visa]
    },
    deliveryChart() {
        let delivery = 0
        let pickup = 0
        this.order.forEach(el => {
            if (el.delivery == "Самовывоз") {
                pickup++
            }
            if (el.delivery !== "Самовывоз") {
                delivery++
            }
        })
        return [delivery, pickup]
    },
    saleChart() {
        const saleVal = []
        for (var i=0; i < this.startWeek[1].length; i++) {
            const curOrder = this.order.filter(el => el.date >= this.startWeek[1][i] && el.date <= (this.startWeek[1][i] + (24 * 60 * 60)))
            if (curOrder.length) {
                let daysTotal = 0
                curOrder.forEach(el => {
                    el.productList.forEach(el => {
                        let totalItem = el.price*el.quantity
                        daysTotal += totalItem
                    })
                })
                saleVal.push(daysTotal)
            } else {
                saleVal.push(0)
            }
        }

        return saleVal
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
    categoriesSale() {
        const cat = []
        this.order.forEach(el => {
            el.productList.forEach(ele => {
                const it = {
                    category: ele.category,
                    price: ele.price,
                    quantity: ele.quantity
                }
                cat.push(it)
            })
        })

        function unique(arr) {
          return Array.from(new Set(arr));
        }

        const uniq = unique(cat.map(el => el.category))

        const uniqsum = []
        cat.forEach(el => {
            const els = {
                category: el.category,
                price: el.price*el.quantity
            } 
            uniqsum.push(els)
        })

        const finalUniqSum = []
        uniq.forEach(el => {
            const its = {
                category: el,
                sum: uniqsum.filter(els => els.category == el).reduce((acc, cur) => acc + cur.price, 0)
            }
            finalUniqSum.push(its)
        })

        // console.log(finalUniqSum.map(el => el.category))
        // console.log(finalUniqSum.map(el => el.sum))
        return [finalUniqSum.map(el => el.category), finalUniqSum.map(el => el.sum)]
    }
  }
}
</script>

<style scope>
    h6 {
        margin-top: 0;
    }
</style>