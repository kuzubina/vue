<template>
	<div class="card-panel auth-card">
      <div class="auth-card-title">Регистрация</div>
      <form  @submit.prevent="submitHandler">
          <div class="input-field">
              <i class="material-icons prefix pt-2">person_outline</i>
              <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <label for="name">Имя</label>
                <small 
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Введите имя</small>
                <small 
                class="helper-text invalid"
                v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Имя должено быть не менее {{$v.name.$params.minLength.min}} символов</small>
          </div>
          <div class="input-field">
              <i class="material-icons prefix pt-2">mail_outline</i>
              <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
              >
              <label for="email">Email</label>
              <small 
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required"
              >Поле Email не должно быть пустым</small>
              <small 
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
              >Введите корректный Email</small>
          </div>
          <div class="input-field">
              <i class="material-icons prefix pt-2">lock_outline</i>
              <input
                id="password"
                type="password"
                v-model.trim="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <label for="password">Пароль</label>
                <small 
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >Введите пароль</small>
                <small 
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                >Пароль должен быть не менее {{$v.password.$params.minLength.min}} символов</small>
          </div>
          <div class="input-field">
              <button class="btn waves-effect waves-light gradient-45deg-purple-deep-orange">Зарегистрироваться</button>
          </div>
          <div class="input-field center mb0">
              Уже есть аккаунт? <router-link to="/login">Войти</router-link>
          </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
    name: 'registration',
    data: () => ({
        name: '',
        email: '',
        password: '',
    }),
    metaInfo: {
        title: 'Регистрация'
    },
    validations: {
        name: {required, minLength: minLength(3)},
        email: {email, required},
        password: {required, minLength: minLength(6)},
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
    },
    methods: {
        submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            let self = this

            axios.post('/registration', {
              name: this.name,
              email: this.email,
              password: this.password,
              paymentsDate: Math.round((new Date()).getTime() / 1000) + (60*60*168)
            })
            .then(function (response) {
              console.log(response)
              M.toast({html: `Пользователь успешно зарегистрирован`})
              setTimeout(() => {
                let data = {
                    userId: response.data.userId,
                    token: response.data.token,
                    name: response.data.name
                } 
                let serialData = JSON.stringify(data);
                localStorage.setItem("ebot", serialData);
                self.$router.push('/')
              }, 150)
            })
            .catch(function (error) {
              M.toast({html: `${error.response.data.message}`})
            });
            
        }
    }
}
</script>