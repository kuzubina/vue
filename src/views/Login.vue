<template>
    <div class="card-panel auth-card">
        <div class="auth-card-title">Вход</div>
        <form  @submit.prevent="submitHandler">
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
                <button class="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange">Войти</button>
            </div>
            <div class="input-field center mb0">
                Нет аккаунта? <router-link to="/registration">ЗАРЕГИСТРИРОВАТЬСЯ</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
    name: 'login',
    data: () => ({
        email: '',
        password: '',
    }),
    metaInfo: {
        title: 'Авторизация'
    },
    validations: {
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

            axios.post('/login', {
              email: this.email,
              password: this.password
            })
            .then(function (response) {
              setTimeout(() => {
                let data = {
                    userId: response.data.userId,
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
            
        },
    }
}
</script>