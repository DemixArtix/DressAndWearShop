<template lang="pug">
  div(class="cart-block")
    h1(class="cart-title") Оформление заказа
    div(class="cart-form")
      div(class="cart-form__item phone")
        label(class="cart-form__label phone") Телефон
        div(class="cart-form__input phone")
          input(
            class="phone"
            type="tel"
            v-model.trim="phone"
            @keydown.delete="replaceCursor"
            @keydown.space="removeSpace"
            @blur="$v.phone.$touch()"
            ref="phone")
        div(
          class="cart-form__message"
          v-if="!$v.phone.required && $v.phone.$dirty"
        ) Пожалуйста, заполните поле телефон
        div(
          class="cart-form__message"
          v-else-if="!$v.phone.correctNumber && $v.phone.$dirty"
        ) Должен быть в формате +7 (999) 888-77-66
      div(class="cart-form__item location")
        label(class="cart-form__label location") Населенный пункт
        div(class="cart-form__input location")
          input(
            class="location"
            type="text"
            v-model="city"
            )
      div(class="cart-form__item name")
        label(class="cart-form__label name") Имя
        div(class="cart-form__input name")
          input(
            class="name"
            type="text"
            v-model="name"
            @blur="$v.name.$touch()"
            ref="name")
        div(
          class="cart-form__message"
          v-if="!$v.name.required && $v.name.$dirty"
        ) Введите Ваше имя
        div(
          class="cart-form__message"
          v-else-if="!$v.name.minLength && $v.name.$dirty"
        ) Поле "имя" должно содердать минимум 2 символа
        div(
          class="cart-form__message"
          v-else-if="!$v.name.correctName && $v.name.$dirty"
        ) Недопустимые символы в поле "имя"
      div(class="cart-form__item surname")
        label(class="cart-form__label surname") Фамилия
        div(class="cart-form__input surname")
          input(
            class="surname"
            type="text"
            v-model="surname"
            @blur="$v.surname.$touch()"
            ref="surname")
        div(
          class="cart-form__message"
          v-if="!$v.surname.required && $v.surname.$dirty"
        ) Введите Вашу фамилию
        div(
          class="cart-form__message"
          v-else-if="!$v.surname.minLength && $v.surname.$dirty"
        ) Поле "фамилия" должно содердать минимум 2 символа
        div(
          class="cart-form__message"
          v-else-if="!$v.surname.correctSurname && $v.surname.$dirty"
        ) Недопустимые символы в поле "фамилия"
      div(class="cart-form__item email")
        label(class="cart-form__label email") Электронная почта
        div(class="cart-form__input email")
          input(
            class="email"
            type="email"
            v-model="email"
            @blur="$v.email.$touch()")
        div(
          class="cart-form__message"
          v-if="!$v.email.required && $v.email.$dirty"
        ) Пожалуйста, заполните поле email
        div(
          class="cart-form__message"
          v-else-if="!$v.email.email && $v.email.$dirty"
        ) Должен быть в формате mail@mail.com
      div(class="cart-form__item comment")
        label(class="cart-form__label comment") Комментарий
        div(class="cart-form__input comment")
          textarea(class="comment")

</template>

<script>
  import validation from "../mixins/validation";
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';
  import addressApi from '@/plugins/addressApi';

  export default {
    name: "Cart",
    data:() => ({
      email: '',
      phone: '+7',
      name: '',
      surname: '',
      noneFormattedPhone: '',
      city: '',

    }),
    mixins: [validation],
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
      city: async function () {
        const initValue = this.city;
        setTimeout(async () => {
          const endValue = this.city;
          if(initValue === endValue) {
            await addressApi.post('/',
              {
                query: this.city,
                "from_bound": { "value": "city" },
                "to_bound": { "value": "settlement" },
              })
              .then(res => {
                console.log(res.data.suggestions)
              })
              .catch(err => console.log(err))
          }
        }, 500);

      }
    }
  }
</script>

<style scoped lang="sass">
  .cart-
    &block
      padding: 0 10px
    &title
      margin: 0
      text-align: left
    &form
      margin-top: 20px
      &__
        &item
          margin-left: 50px
          max-width: 50%
          display: flex
          justify-content: space-between
          margin-bottom: 30px
        &label
          font-size: 18px
          font-weight: 700
          margin-right: 10px

        &input
          border: 1px solid black
          width: 400px
          display: flex
          input
            font-size: 18px
            width: 100%
            padding: 5px
            border: none
            outline: none
          textarea
            font-size: 20px
            resize: none
            padding: 5px
            height: 100%
            width: 100%
            outline: none
            border: none
            &.comment
              height: 80px
</style>