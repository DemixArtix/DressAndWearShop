<template lang="pug">
  div(class="auth-info")
    div(
      class="auth-logo"
      @mouseover="showAuth = true"
      @mouseleave="showAuth = showCurrentItem !== 'default'"
      )
      svg(
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        viewBox="-9 -10 530 540"
        style="enable-background:new 0 0 512 512;"
        xml:space="preserve")
        g
          g
            g
              path( d="M131.5,472H60.693c-8.538,0-13.689-4.765-15.999-7.606c-3.988-4.906-5.533-11.29-4.236-17.519c20.769-99.761,108.809-172.616,210.445-174.98c1.693,0.063,3.39,0.105,5.097,0.105c1.722,0,3.434-0.043,5.142-0.107c24.853,0.567,49.129,5.24,72.236,13.917c10.34,3.885,21.871-1.352,25.754-11.693c3.883-10.34-1.352-21.871-11.693-25.754c-3.311-1.244-6.645-2.408-9.995-3.512C370.545,220.021,392,180.469,392,136C392,61.01,330.991,0,256,0c-74.991,0-136,61.01-136,136c0,44.509,21.492,84.092,54.643,108.918c-30.371,9.998-58.871,25.546-83.813,46.062c-45.732,37.617-77.529,90.086-89.532,147.743c-3.762,18.066,0.744,36.622,12.363,50.908C25.221,503.847,42.364,512,60.693,512H131.5c11.046,0,20-8.954,20-20C151.5,480.954,142.546,472,131.5,472z M160,136c0-52.935,43.065-96,96-96s96,43.065,96,96c0,51.367-40.554,93.438-91.326,95.885c-1.557-0.028-3.114-0.052-4.674-0.052c-1.564,0-3.127,0.023-4.689,0.051C200.546,229.43,160,187.362,160,136z")
              path( d="M496.689,344.607c-8.561-19.15-27.845-31.558-49.176-31.607h-62.372c-0.045,0-0.087,0-0.133,0c-22.5,0-42.13,13.26-50.029,33.807c-1.051,2.734-2.336,6.178-3.677,10.193H200.356c-5.407,0-10.583,2.189-14.35,6.068l-34.356,35.388c-7.567,7.794-7.529,20.203,0.085,27.95l35,35.612c3.76,3.826,8.9,5.981,14.264,5.981h65c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20h-56.614l-15.428-15.698L208.814,397h137.491c9.214,0,17.235-6.295,19.426-15.244c1.618-6.607,3.648-12.959,6.584-20.596c1.936-5.036,6.798-8.16,12.741-8.16c0.013,0,0.026,0,0.039,0h62.371c5.656,0.013,10.524,3.053,12.705,7.932c5.369,12.012,11.78,30.608,11.828,50.986c0.048,20.529-6.356,39.551-11.739,51.894c-2.17,4.978-7.079,8.188-12.56,8.188c-0.011,0-0.022,0-0.033,0h-63.125c-5.533-0.013-10.716-3.573-12.896-8.858c-2.339-5.671-4.366-12.146-6.197-19.797c-2.571-10.742-13.367-17.366-24.105-14.796c-10.743,2.571-17.367,13.364-14.796,24.106c2.321,9.699,4.978,18.118,8.121,25.738c8.399,20.364,27.939,33.555,49.827,33.606h63.125c0.043,0,0.083,0,0.126,0c21.351-0.001,40.647-12.63,49.18-32.201c6.912-15.851,15.137-40.511,15.072-67.975C511.935,384.434,503.638,360.153,496.689,344.607z")
      div(
        class="auth-card"
        v-if="showAuth"
        )
        div(
          class="auth-card__user"
          v-if="getUserData"
        )
          h4(class="auth-card__user_title") {{getUserData.name}} {{getUserData.surname}}
          div(class="auth-card__user_buttons")
            button(class="button" @click="$router.push({name: 'PersonalArea'})") Личный кабинет
            button(class="button" @click="onSignOut") Выход



        div(v-else)
          div(
            class="auth-card__login_button darken button"
            @click="showCurrentItem = 'login'"
            v-if="showCurrentItem === 'default'"
            )
            span Вход в личный кабинет
          div(
            class="auth-card__button lighten button"
            @click="showCurrentItem = 'registration'"
            v-if="showCurrentItem === 'default'"
            )
            span Регистрация
          div(
            class="auth-card__login_block"
            v-if="showCurrentItem === 'login'"
            )
            h3 Вход
            form(class="auth-card__form" @submit.prevent="onSignIn")
              div(class="auth-card__item")
                label(class="auth-card__label") email
                input(
                  class="auth-card__input"
                  v-model="login"
                  type="email")
              div(class="auth-card__item")
                label(class="auth-card__label") пароль
                input(
                  class="auth-card__input"
                  v-model="loginPass"
                  type="password")
              div(class="auth-card__buttons")
                button(class="auth-card__submit darken button" type="submit") Войти
                button(
                  class="auth-card__cancel lighten button"
                  @click="showCurrentItem = 'default'"
                  ) Отмена

          div(
            class="auth-card__block"
            v-if="showCurrentItem === 'registration'"
            )
            h3 Регистрация
            form(class="auth-card__form" @submit.prevent="onSignUp")
              div(class="auth-card__item")
                label(class="auth-card__label") email
                input(
                  class="auth-card__input"
                  v-model="email"
                  @blur="$v.email.$touch()"
                  type="email")
              div(
                class="auth-card__message"
                v-if="!$v.email.required && $v.email.$dirty"
                ) Пожалуйста, заполните поле email
              div(
                class="auth-card__message"
                v-else-if="!$v.email.email && $v.email.$dirty"
                ) Должен быть в формате mail@mail.com
              div(
                class="auth-card__message"
                v-if="message"
                ) {{message}}
              div(class="auth-card__item")
                label(class="auth-card__label") телефон
                input(
                  class="auth-card__input"
                  v-model.trim="phone"
                  type="tel"
                  @keydown.delete="replaceCursor"
                  @keydown.space="removeSpace"
                  @blur="$v.phone.$touch()"
                  ref="phone"
                  )
              div(
                class="auth-card__message"
                v-if="!$v.phone.required && $v.phone.$dirty"
                ) Пожалуйста, заполните поле телефон
              div(
                class="auth-card__message"
                v-else-if="!$v.phone.correctNumber && $v.phone.$dirty"
                ) Должен быть в формате +7 (999) 888-77-66
              div(class="auth-card__item")
                label(class="auth-card__label") пароль
                input(
                  class="auth-card__input"
                  v-model="password"
                  @blur="$v.password.$touch()"
                  type="password")
              div(
                class="auth-card__message"
                v-if="!$v.password.required && $v.password.$dirty"
              ) Пожалуйста, заполните поле пароль
              div(
                class="auth-card__message"
                v-else-if="!$v.password.minLength && $v.password.$dirty"
              ) Должен содержать минимум 8 символов
              div(
                class="auth-card__message"
                v-else-if="!$v.password.strongPassword && $v.password.$dirty"
              ) Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра
              div(
                class="auth-card__message"
                v-else-if="!$v.password.maxLength && $v.password.$dirty"
              ) Пароль должен содержать не более 30 символов
              div(class="auth-card__item")
                label(class="auth-card__label") подтвердите пароль
                input(
                  class="auth-card__input"
                  v-model="passwordRepeat"
                  type="password"
                  @blur="$v.passwordRepeat.$touch()"
                  )
              div(
                class="auth-card__message"
                v-if="!$v.passwordRepeat.required && $v.passwordRepeat.$dirty"
              ) Введите пароль еще раз
              div(
                class="auth-card__message"
                v-else-if="!$v.passwordRepeat.matchingPasswords && $v.passwordRepeat.$dirty"
              ) Пароли не совпадают
              div(class="auth-card__item")
                label(class="auth-card__label") имя
                input(
                  class="auth-card__input"
                  v-model="name"
                  type="text"
                  @blur="$v.name.$touch()"
                  ref="name"
                  )
              div(
                class="auth-card__message"
                v-if="!$v.name.required && $v.name.$dirty"
              ) Введите Ваше имя
              div(
                class="auth-card__message"
                v-else-if="!$v.name.minLength && $v.name.$dirty"
              ) Поле "имя" должно содердать минимум 2 символа
              div(
                class="auth-card__message"
                v-else-if="!$v.name.correctName && $v.name.$dirty"
              ) Недопустимые символы в поле "имя"
              div(class="auth-card__item")
                label(class="auth-card__label") фамилия
                input(
                  class="auth-card__input"
                  v-model="surname"
                  type="text"
                  @blur="$v.surname.$touch()"
                  ref="surname"
                  )
              div(
                class="auth-card__message"
                v-if="!$v.surname.required && $v.surname.$dirty"
              ) Введите Вашу фамилию
              div(
                class="auth-card__message"
                v-else-if="!$v.surname.minLength && $v.surname.$dirty"
              ) Поле "фамилия" должно содердать минимум 2 символа
              div(
                class="auth-card__message"
                v-else-if="!$v.surname.correctSurname && $v.surname.$dirty"
              ) Недопустимые символы в поле "фамилия"

              div(class="auth-card__buttons")
                button(class="auth-card__submit darken button" type="submit") Регистрация
                button(
                  class="auth-card__cancel lighten button"
                  @click="showCurrentItem = 'default'"
                  ) Отмена
</template>

<script>
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';
  import { mapGetters, mapActions } from 'vuex';
  import validation from "../mixins/validation";
  import api from '@/plugins/api';
  import apiConfig from '@/plugins/api/config';


  export default {
    name: "Auth",
    data: () => ({
      user_info: {},
      login: '',
      loginPass: '',
      email: '',
      phone: '+7',
      password: '',
      passwordRepeat: '',
      name: '',
      surname: '',
      noneFormattedPhone: '',
      message: '',
      showCurrentItem: 'default',
      showAuth: false,
    }),
    mixins: [validation],
    async beforeMount() {
      this.loadUserData();
    },
    validations: {
      email: {
        required,
        email
      },
      phone: {
        required,
        correctNumber: function(value) {
          return this.regExpTest(
            value,
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
          )
        },
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
        strongPassword: function(value) {
          return this.regExpTest(
            value,
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/
          )
        }
      },
      passwordRepeat: {
        required,
        matchingPasswords: function() {
          return this.password === this.passwordRepeat
        }
      },
      name: {
        required,
        minLength: minLength(2),
        correctName: function(value) {
          return this.regExpTest(
            value,
            /^([А-ЯЁ]|[A-Z])([а-яё]|[a-z]|-|~)+$/
          )
        }
      },
      surname: {
        required,
        minLength: minLength(2),
        correctSurname: function(value) {
          return this.regExpTest(
            value,
            /^([А-ЯЁ]|[A-Z])([а-яё]|[a-z]|-|~)+$/
          )
        }
      },
    },
    computed: {
      ...mapGetters('userData', ['getUserData']),
    },
    methods: {
      ...mapActions('userData', ['setUserData', 'removeUserData']),
      ...mapActions('favorites', ['loadFavorites', "removeFavoriteList"]),
      ...mapActions('cart', ['setCart']),
      ...mapActions('orders', ['setOrders']),
      async loadUserData(newToken) {
        const token = newToken || localStorage.getItem('token');

        if(token) {
          const header = {
            headers: {
              'Authorization': token
            }
          };
          const user = await api.get('/user_data', header)
            .then(async res => {
              const { userData, favorites, cart, orders } = res.data;
              if( userData === null) {
                localStorage.removeItem('token');
                return
              }
              this.setUserData(userData);
              await this.setCart(cart);
              await this.loadFavorites(favorites);
              await this.setOrders(orders);

            })
            .catch(err => {
              console.log(err);
              console.log(err.status);
            });

        } else {
          const favorites = JSON.parse(localStorage.getItem('favorites'));
          console.log(favorites);
          await this.loadFavorites(favorites);
        }
      },
      async onSignIn() {
        const formData = {
          email: this.login,
          password: this.loginPass,
        };
        const login = await api.post('/login', formData)
          .then(res => {
            const {success, message, token } = res.data;
            console.log(res);
            if(success) {
              localStorage.setItem('token', token);
              apiConfig.headers['Authorization'] = token;
              console.log('apiConfig', apiConfig);
              this.loadUserData(token);
              this.showCurrentItem = 'default';
            } else {
              this.message = message;
            }

          })
          .catch((err) => {
            console.log(err);
          });
      },
      async onSignUp() {
        this.message = '';
        if(this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        const formData = {
          email: this.email,
          phone: this.noneFormattedPhone,
          password: this.password,
          name: this.name,
          surname: this.surname
        };
          const registration = await api.post('/register', formData)
            .then(res => {
                const {success, message } = res.data;
                console.log(res);
                if(success) {

                } else {
                  this.message = message;
                }

            })
            .catch((err) => {
              console.log(err);
            });
      },
      onSignOut() {
        localStorage.removeItem('token');
        this.removeUserData();
        this.removeFavoriteList();
        this.showAuth = false;
      },
      // inputFormatting(inputName) {
      //   this[inputName] = this[inputName].replace(/\d|\s/g, '');
      //   if(this[inputName]) {
      //     this[inputName] = this[inputName][0].toUpperCase() + this[inputName].slice(1);
      //   }
      // },
      // regExpTest(value, expression) {
      //   const regExp = new RegExp(expression);
      //   return regExp.test(value);
      // },
      // replaceCursor(e) {
      //   if(this.phone[this.phone.length - 1] === ')') {
      //     this.$refs.phone.selectionEnd = this.phone.length - 1;
      //   }
      // },
      // removeSpace() {
      //   this.$refs.phone.selectionEnd = this.phone.length - 1;
      // },
      // regForPhone() {
      //   let result = this.phone.replace(/\D/g, '');
      //   let match = result.match(/(\+?7|8|9)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      //   this.noneFormattedPhone = match[0];
      //   let formatted = '';
      //   if(!match) {
      //      formatted = '+';
      //   } else {
      //     if(match[1]) {
      //       if(match[1] === '7') {
      //         formatted += '+' + match[1];
      //       } else if (match[1] === '9') {
      //         formatted += '+7' + match[1];
      //       } else {
      //         formatted += match[1];
      //       }
      //     }
      //     if(match[2] && match[2] !== '') {
      //       formatted += ` (${match[2]})`;
      //     }
      //     if(match[3]) {
      //       formatted += ` ${match[3]}`;
      //     }
      //     if(match[4]) {
      //       formatted += '-' + match[4];
      //     }
      //     if(match[5]) {
      //       formatted += '-' + match[5];
      //     }
      //   }
      //
      //   console.log(formatted);
      //   this.phone = formatted;
      // }
    },
    watch: {
      phone: function() {
        this.regForPhone()
      },
      name: function() {
        this.inputFormatting('name')
      },
      surname: function() {
        this.inputFormatting('surname')
      },
    }
  }
</script>

<style scoped lang="sass">
  .button
    color: white
    border-radius: 3px
    padding: 10px
    margin-bottom: 5px
    cursor: pointer
    border-width: 0
    min-width: 130px
  .darken
    background-color: orangered
    &:hover
      background-color: rgba(orangered, .9)
  .lighten
    color: orangered
    font-weight: 700
    background-color: rgba(orangered, .2)
    &:hover
      background-color: rgba(orangered, .16)
  .auth-
    &info
      position: relative
      z-index: 6
      margin-right: 5px
    &logo
      width: 35px
      border-radius: 3px
      padding: 6px 10px
      transition: .5s
      cursor: pointer
      background-color: white
      path
        fill: transparent
        stroke: orangered
        stroke-width: 10px
        transition: 3s
        stroke-dasharray: 2000
        stroke-dashoffset: 0
      &:hover
        border-bottom-right-radius: 0
        border-bottom-left-radius: 0
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)
        path
          transition: 1s
          fill: rgba(orangered, .2)
          stroke-dashoffset: 4000
    &card
      position: absolute
      cursor: default
      width: 300px
      right: 0
      top: 50px
      background-color: white
      padding: 10px
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
      border-radius: 5px 0 5px 5px
      &__
        &user
          &_title
            margin: 10px
          &_buttons
            button
              margin: 5px 10px
              background-color: rgba(orangered, .6)
              &:hover
                background-color: rgba(orangered, .8)
        &button



        &item
          display: flex
          flex-direction: column
          align-items: flex-start
          margin-top: 20px
          padding: 5px
          position: relative
          border: 1px solid rgba(black, .3)

        &label
          position: absolute
          left: 0
          top: -18px
          font-size: 13px
          font-weight: 700
        &input
          border: none
          width: 95%
          &:focus
            outline: none
        &buttons
          margin-top: 10px
          display: flex
          justify-content: space-around
        &submit
          font-weight: 700
        &message
          margin-top: 2px
          font-size: 11px
          display: flex
          color: red
          span
            display: block

</style>