<template lang="pug">
  div(class="cart-block")
    div(class="cart-side__left")
      h1(class="cart-title") Оформление заказа
      div(class="cart-form")


        div(class="cart-form__item phone")
          label(class="cart-form__label phone") Телефон
          div(class="cart-form__block" v-if="userPhone") {{userPhone}}
          div(class="cart-form__block" v-else )
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


        div(
          class="cart-form__item settlement"
          v-if="!userAddresses || addressIndexInDB || addressAdding"
          )
          div(
            class="cart-form__cross settlement"
            v-if="addressAdding || addressIndexInDB"
            @click="cancelChanges()"
            )
            svg(
              viewBox="0 0 365.696 365.696"
              xmlns="http://www.w3.org/2000/svg")
              path( d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0")

          label(class="cart-form__label settlement") Населенный пункт
          div(class="cart-form__block")
            div(class="cart-form__input settlement")

              input(
                class="settlement"
                type="text"
                v-model="settlement"
                @focusin="showingSettlementOptions = true"
                @focusout="hideOptions('showingSettlementOptions')"
                @keydown="settlementSelected = false"
                )
            div(class="cart-form__location_list"
              v-if="optionsForSettlements.length !== 0 && showingSettlementOptions && !settlementSelected")
              div(
                class="cart-form__location_item"
                v-for="({id, unrestricted_value, matchedValue}, index) in optionsForSettlements"
                :key="index"
                @click="onSelectSettlement(id, unrestricted_value)"
                v-html="matchedValue"
                )


        div(
          class="cart-form__item street"
          v-if="( !userAddresses && settlementId ) || ( addressIndexInDB && settlementId ) || ( addressAdding && settlementId )"
          )
          label(class="cart-form__label street") Адрес
          div(class="cart-form__block")
            div(class="cart-form__input street")
              input(
                class="location"
                type="text"
                v-model="street"
                @focusin="showingStreetOptions = true"
                @focusout="hideOptions('showingStreetOptions')"
                @keydown="streetSelected = false"
                placeholder="Улица"
              )
            div(class="cart-form__location_list"
              v-if="optionsForStreets.length !== 0 && showingStreetOptions && !streetSelected")
              div(
                class="cart-form__location_item"
                v-for="({id, unrestricted_value, matchedValue}, index) in optionsForStreets"
                :key="index"
                @click="onSelectStreet(id, unrestricted_value)"
                v-html="matchedValue"
              )


        div(
          class="cart-form__item building"
          v-if="( !userAddresses || addressIndexInDB || addressAdding ) && settlementId"
          )
          div(class="cart-form__block building")
            div(class="cart-form__input building half")
              input(
                class="location"
                type="text"
                v-model="building"
                @focusin="showingBuildingOptions = true"
                @focusout="hideOptions('showingBuildingOptions')"
                @keydown="buildingSelected = false"
                placeholder="Дом"
              )
            div(class="cart-form__location_list"
              v-if="optionsForBuildings.length !== 0 && showingBuildingOptions && !buildingSelected")
              div(
                class="cart-form__location_item"
                v-for="({id, unrestricted_value, matchedValue}, index) in optionsForBuildings"
                :key="index"
                @click="onSelectBuilding(id, unrestricted_value)"
                v-html="matchedValue"
              )
            div(class="cart-form__input apartment half")
              input(
                class="location"
                type="text"
                v-model="apartment"
                @focusin="showingApartmentOptions = true"
                @focusout="hideOptions('showingApartmentOptions')"
                @keydown="apartmentSelected = false"
                placeholder="Квартира"
              )
            div(class="cart-form__location_list"
              v-if="optionsForApartments.length !== 0 && showingApartmentOptions && !apartmentSelected")
              div(
                class="cart-form__location_item"
                v-for="({id, unrestricted_value, matchedValue}, index) in optionsForApartments"
                :key="index"
                @click="onSelectBuilding(id, unrestricted_value)"
                v-html="matchedValue"
              )
        div(class="cart-form__location_set"
            v-if="buildingId !== ''"
            )
          div(class="cart-form__location_button"
              @click="setAddress()") Установить адрес доставки


        div(class="cart-form__item delivery-address" v-if="userAddresses && !addressIndexInDB && !addressAdding")
          label(class="cart-form__label delivery-address__label") Адрес доставки
          div(class="cart-form__block" @click.stop)
            div(
              class="delivery-address__current"
              @click="togglePanel(panelOfAddresses)"
              )
              div(class="delivery-address__current_text")
                div(class="delivery-address__current_settlement address_item") {{currentAddressSettlement}},
                div(class="delivery-address__current_street address_item") {{currentAddressStreet}},
                div(class="delivery-address__current_building address_item") {{currentAddressBuilding}}
                  span(v-if="currentAddressApartment") ,
                div(
                  class="delivery-address__current_apartment address_item"
                  v-if="currentAddressApartment"
                  ) кв./офис {{currentAddressApartment}}
              div(class="delivery-address__current_arrow" :class="activeClass")
                svg(
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px" y="0px"
                  viewBox="0 0 451.847 451.847"
                  style="enable-background:new 0 0 451.847 451.847;"
                  xml:space="preserve")
                    path(d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z")

              div(class="delivery-address__list" v-if="panelOfAddresses")
                div(
                  class="delivery-address__item"
                  v-for="({_id, settlement, settlementId , street, streetId, building, buildingId, apartment }, index) in userAddresses"
                  @click="setCurrentAddress(index)"
                  :key="index"
                  )
                  div(class="delivery-address__item_text")
                    div(class="delivery-address__settlement address_item") {{settlement}},
                    div(class="delivery-address__street address_item")  {{street}},
                    div(class="delivery-address__building address_item")  {{building}}
                      span(v-if="apartment") ,
                    div(class="delivery-address__building address_item" v-if="apartment") кв./офис {{apartment}}
                  div(class="delivery-address__button" @click.stop="showActionsWithAddress(index)")
                    div(class="delivery-address__button_action" v-if="addressIndexInList === index")
                      div(
                        class="delivery-address__button_change item"
                        @click.stop="changeAddress({_id,settlement, settlementId , street, streetId, building, buildingId, apartment })"
                        ) изменить
                      div(class="delivery-address__button_delete item"
                        @click.stop="deleteAddress(_id)"
                        ) удалить
                    svg(

                      viewBox="0 0 492.49284 492"
                      xmlns="http://www.w3.org/2000/svg")
                      path( d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0")
                      path( d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0")

                div(
                  class="delivery-address__item add"
                  @click.stop="addAddress()"
                )
                  div(class="delivery-address__item_text") добавить новый адрес
                  div(class="delivery-address__button" )
                    svg(
                      height="448pt"
                      viewBox="0 0 448 448"
                      width="448pt"
                      xmlns="http://www.w3.org/2000/svg")
                      path( d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0")



        div(class="cart-form__item name")
          label(class="cart-form__label name") Имя
          div(class="cart-form__block" v-if="userName") {{userName}}
          div(class="cart-form__block" v-else )
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
          div(class="cart-form__block" v-if="userSurname") {{userSurname}}
          div(class="cart-form__block" v-else )
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
          div(class="cart-form__block" v-if="userEmail") {{userEmail}}
          div(class="cart-form__block" v-else )
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
          label(class="cart-form__label comment") Комментарий курьеру
          div(class="cart-form__input comment")
            textarea(class="comment" v-model="comment")


      div(class="cart-goods__block")
        div(class="cart-goods__list")
          div(class="cart-goods__item"
              v-for="{_id, productId, brand, images, price, size, quantity, path } in allCart")
            div(class="cart-goods__image" @click="toProductPage(path)")
              img(:src="images[0]")
            div(class="cart-goods__properties")

              div(class="cart-goods__brand_size property")
                div(class="description") Бренд
                div(class="value") {{brand}}
                div(class="description") Размер
                div(class="value") {{size}} RUS

              div(class="cart-goods__quantity property")
                div(class="description") Кол-во
                div(class="value")
                  div(class="quantity-button minus" v-if="quantity > 1" @click="onChangeQuantity(productId, -1)")
                  div(class="quantity-button hidden" v-else)
                  div(class="quantity") {{quantity}} шт.
                  div(class="quantity-button plus" @click="onChangeQuantity(productId, 1)")

              div(class="cart-goods__price property")
                div(class="description" v-if="quantity === 1") Цена
                div(class="description" v-else) Цена за ед.
                div(class="value") {{price}} ₽
                div(class="description" v-if="quantity > 1") Сумма
                div(class="value" v-if="quantity > 1") {{price * quantity}} ₽


            div(class="corner-block")
              FavoritesButton(
                :productId="_id"
                :inFavorites="inFavorites(_id)"
                :path="path"
                )
              div(class="delete-button" @click="onDeleteCartItem(productId)")
                div
                  svg(
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 5 384 384"
                    xml:space="preserve")
                    g
                    g
                    g
                      path(d="M64 341.333C64 364.8 83.2 384 106.667 384h170.667C300.8 384 320 364.8 320 341.333v-256H64V341.333z M116.587 189.44l30.187-30.187L192 204.48l45.227-45.227l30.187 30.187l-45.227 45.227l45.227 45.227l-30.187 30.187L192 264.853l-45.227 45.227l-30.187-30.187l45.227-45.227L116.587 189.44z")
                      polygon(points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333")
                div(class="delete-button__title") Удалить

    div(class="cart-side__right")
      div(class="cart-order__block")
        div(class="cart-order__info")
          div(class="cart-order__title line")
            div(class="left") Ваш заказ
            div(class="right") {{numeralsToString}} товар{{ending}}
          div(class="cart-order__sum line")
            div(class="left") Сумма
            div(class="right") {{cartAmount}} ₽
          div(class="cart-order__delivery line")
            div(class="left") Доставка
            div(class="right") {{delivery}} ₽
          div(class="cart-order__total line")
            div(class="left") Итого
            div(class="right") {{sumTotal}} ₽

        div(class="cart-order__payment")
          div(class="cart-order__payment_button" @click="paymentOrder()") Оплатить заказ




</template>

<script>
  import validation from "../mixins/validation";
  import cart from "../mixins/cart";
  import getToken from "../mixins/getToken";
  import {mapGetters, mapActions} from 'vuex';
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators';
  import api from '@/plugins/api';
  import addressApi from '@/plugins/addressApi';
  import FavoritesButton from "../components/FavoritesButton";

  export default {
    name: "Cart",
    components: {FavoritesButton},
    data:() => ({
      email: '',
      phone: '+7',
      name: '',
      surname: '',
      noneFormattedPhone: '',
      currentAddress: null,
      comment: '',

      addressIndexInList: null,
      addressIndexInDB: null,
      addressAdding: false,

      settlement: '',
      optionsForSettlements: [],
      settlementId: '',
      settlementSelected: false,
      showingSettlementOptions: false,

      street: '',
      optionsForStreets: [],
      streetId: '',
      streetSelected: false,
      showingStreetOptions: false,

      building: '',
      optionsForBuildings: [],
      buildingId: '',
      showingBuildingOptions: false,
      buildingSelected: false,

      apartment: '',
      optionsForApartments: [],
      apartmentId: '',
      showingApartmentOptions: false,
      apartmentSelected: false,

    }),
    mixins: [validation, cart, getToken],
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
    computed: {
      ...mapGetters('cart', ['allCart']),
      ...mapGetters('userData', ['getUserData']),
      ...mapGetters('favorites', ['favorites']),
      ...mapGetters('eventData', ['panelOfAddresses']),
      activeClass() {
        return {
          'active': this.panelOfAddresses,
          null : !this.panelOfAddresses
        }
      },
      userPhone() {
        if(this.getUserData) {
          return this.getUserData.phone;
        }
      },
      userName() {
        if(this.getUserData) {
          return this.getUserData.name;
        }
      },
      userSurname() {
        if(this.getUserData) {
          return this.getUserData.surname;
        }
      },
      userEmail() {
        if(this.getUserData) {
          return this.getUserData.email;
        }
      },
      userAddresses() {
        if(this.getUserData && this.getUserData.addresses && this.getUserData.addresses.length ) {
          return this.getUserData.addresses;
        }
      },
      showCurrentAddress() {
        return this.currentAddress || this.userAddresses[0];
      },
      currentAddressSettlement() {
        if(this.showCurrentAddress) {
          return this.showCurrentAddress.settlement;
        }
      },
      currentAddressStreet() {
        if(this.showCurrentAddress) {
          return this.showCurrentAddress.street;
        }
      },
      currentAddressBuilding() {
        if(this.showCurrentAddress) {
          return this.showCurrentAddress.building;
        }
      },
      currentAddressApartment() {
        if(this.showCurrentAddress && this.showCurrentAddress.apartment) {
          return this.showCurrentAddress.apartment;
        } else {
          return null
        }
      },
      objToArr() {
        return Object.values(this.allCart);
      },
      cartLength() {
        return this.objToArr.reduce((acc, item) => acc + item.quantity, 0);
      },
      cartAmount() {
        return this.objToArr.reduce((acc, {price, quantity}) => acc + (+price * quantity), 0);
      },
      delivery() {
        return (this.cartAmount * 0.03).toFixed(0);
      },
      sumTotal() {
        return +this.cartAmount + +this.delivery;
      },
      numeralsToString() {
        return this.cartLength.toString()
      },
      stringLength() {
        return this.numeralsToString.length
      },
      simpleNumerals() {
        return + this.numeralsToString[this.stringLength - 1]
      },
      tens() {
        return + this.numeralsToString[this.stringLength - 2]
      },
      ending() {
        if(this.simpleNumerals === 1 && this.tens !== 1) {
          return ''
        }
        if(this.simpleNumerals >= 2 && this.simpleNumerals <= 4 && this.tens !== 1) {
          return 'a'
        }
        else {
          return 'ов'
        }
      }
    },
    methods: {
      ...mapActions('categories', ['setCurrentProduct']),
      ...mapActions('cart', ['changeQuantity', 'deleteCartItem']),
      ...mapActions('userData', ['refreshAddresses']),
      ...mapActions('eventData', ['togglePanelOfAddresses']),

      async paymentOrder() {
        if(this.token()) {
          await api.post('/payment_order',
            {
              data: {
                goodsAmount: this.cartAmount,
                delivery: this.delivery,
                amount: this.sumTotal,
                comment: this.comment,
                address: this.currentAddress ? this.currentAddress : this.userAddresses[0]
              }
            },
            {
              headers: {
                'Authorization': this.token()
              }
            })
            .then(res => {
              console.log(res.data);
              if(res.data) {
                const { payUrl } = res.data.data;
                console.log(res.data);
                // window.location.replace(payUrl);
              }
            }).catch(err => {
            console.log(err)
          });
        }
      },

      addAddress() {
          this.addressAdding = true;
          this.togglePanelOfAddresses(false);
      },
      changeAddress(item) {
        const { _id, settlement, settlementId , street, streetId, building, buildingId, apartment } = item;
        this.addressIndexInDB = _id;
        this.settlement = settlement;
        this.settlementId = settlementId;
        this.street = street;
        this.streetId = streetId;
        this.building = building;
        this.buildingId = buildingId;
        this.apartment = apartment;

        this.settlementSelected = this.streetSelected = this.buildingSelected = true;

      },
      cancelChanges() {
        this.clearAddressLines();
      },
      clearAddressLines() {
        this.addressIndexInDB = null;
        this.addressAdding = false;
        this.settlementId =
          this.settlement =
            this.street =
              this.streetId =
                this.building =
                  this.buildingId =
                    this.apartment = '';
      },
      deleteAddress(id) {

        if(this.token()) {
          api.post('/delete_address',
            {
              id
            },
            {
              headers: {
                'Authorization': this.token()
              }
            })
            .then(res => {
              const { success, message, addresses} = res.data;
              if(success === true) {
                this.refreshAddresses(addresses);
              }
              console.log(message);
            }).catch(err => {
            console.log(err)
          });
        }

      },
      showActionsWithAddress(index) {
        if(index !== this.addressIndexInList) {
          this.addressIndexInList = index;
        } else {
          this.addressIndexInList = null;
        }
      },
      togglePanel(bool) {
        this.togglePanelOfAddresses(!bool);
        if(bool === false) {
          this.addressIndexInList = null;
        }
      },
      setCurrentAddress(index) {
        this.currentAddress = this.userAddresses[index];
      },
      inFavorites(id) {
        if(this.favorites) {
          const item = this.favorites.find(({_id}) => _id === id) || null;
          if(item) {
            return item.inFavorites
          } else {
            return false
          }
        } else {
          return false
        }
      },
      onSelectSettlement(id, unrestricted_value) {
        this.settlementId = id;
        this.settlement = unrestricted_value;
        this.optionsForSettlements = [];
        this.showingSettlementOptions = false;
        this.settlementSelected = true;
      },
      onSelectStreet(id, unrestricted_value) {
        this.streetId = id;
        this.street = unrestricted_value;
        this.optionsForStreets = [];
        this.showingStreetOptions = false;
        this.streetSelected = true;
      },
      onSelectBuilding(id, unrestricted_value) {
        this.buildingId = id;
        this.building = unrestricted_value;
        this.optionsForBuildings = [];
        this.showingBuildingOptions = false;
        this.buildingSelected = true;
      },
      hideOptions(parameter) {
        setTimeout(() => this[parameter] = false, 150)
      },
      async requestProcessing(requestBody,
                              selectionStatus,
                              locationId,
                              requestParams,
                              fiasLocationsTypes,
                              optionsForLocations) {
        const initValue = requestBody;
        setTimeout(async () => {
          const endValue = requestBody;
          if(initValue === endValue && !selectionStatus) {
            this[locationId] = '';
            const requestObject = Object.assign({}, {query: requestBody}, requestParams);
            await addressApi.post('/',
              requestObject)
              .then(res => {
                this[optionsForLocations] =
                  this.responseProcessing(res, requestBody, fiasLocationsTypes);
                console.log(res);
              })
              .catch(err => console.log(err))
          }
        }, 500);
      },
      responseProcessing(response, requestBody, fiasLocationsTypes) {
        return response.data.suggestions.map(({data, unrestricted_value, value}) => {
          unrestricted_value = unrestricted_value.concat(' ', unrestricted_value).split(',').reverse().splice(0, 1).join(',');
          const matchRequest = unrestricted_value.match(new RegExp(requestBody, 'i')) || 0;
          const index = matchRequest.index || 0;
          const splitRequest = {
            start: unrestricted_value.slice(0, index),
            match: unrestricted_value.slice(index, index + requestBody.length),
            end: unrestricted_value.slice(index + requestBody.length, unrestricted_value.length),
          };
          const {start, match, end} = splitRequest;

          let fiasId = null;
          fiasLocationsTypes.map( item => {
            if(data[item]) {
              fiasId = {[item]: data[item]}
            }
          });
          return  {
            id: fiasId,
            unrestricted_value,
            matchedValue: `<span>${start}<strong>${match}</strong>${end}</span>`,
            value
          }
        });
      },
      setAddress() {
        if(this.token()) {
          api.post('/set_address',
            {
              data: {


                settlement: this.settlement,
                settlementId: this.settlementId,

                street: this.street,
                streetId: this.streetId,

                building: this.building,
                buildingId: this.buildingId,

                apartment: this.apartment
              },
              id: this.addressIndexInDB || null
            },
            {
              headers: {
                'Authorization': this.token()
              }
            })
            .then(res => {
              const { success, message, addresses} = res.data;
              if(success === true) {
                this.refreshAddresses(addresses);
                this.clearAddressLines();
              }
              console.log(message);
            }).catch(err => {
            console.log(err)
            });
        }
      }
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

      settlement: async function () {
        this.requestProcessing(
          this.settlement,
          this.settlementSelected,
          'settlementId',
          {
            "from_bound": { "value": "city" },
            "to_bound": { "value": "settlement" },
          },
          ['city_fias_id', 'settlement_fias_id'],
          'optionsForSettlements')
      },

      street: async function () {
          if(this.settlementId) {
            this.requestProcessing(
              this.street,
              this.streetSelected,
              'streetId',
              {
                locations: [this.settlementId],
                "from_bound": { "value": "street" },
                "to_bound": { "value": "street" },
              },
              ['street_fias_id'],
              'optionsForStreets')
        }
      },

      building: async function() {
        if(this.streetId) {
          this.requestProcessing(
            this.building,
            this.buildingSelected,
            'buildingId',
            {
              locations: [this.streetId],
              "from_bound": { "value": "house" },
              "to_bound": { "value": "house" },
            },
            ['house_fias_id'],
            'optionsForBuildings')
        }
      },

      apartment: function () {
        this.apartment = this.apartment.replace(/\D/g, '');
      }
    }
  }
</script>

<style scoped lang="sass">
  .cart-


    &block
      display: flex
      justify-content: space-between
      padding: 0 10px
    &side
      &__
        &left
          flex-basis: 60%
        &right
          margin-top: 70px
          flex-basis: 35%
    &title
      text-align: left
      margin: 0 0 30px
      font-weight: 900

    &form
      margin-top: 20px
      &__
        &cross
          height: 15px
          width: 15px
          padding: 10px
          position: absolute
          right: -15px
          top: -15px
          z-index: 5
          border-radius: 50%
          background-color: #FF7C4C
          cursor: pointer
          svg
            fill: white
          &:hover
            background-color: orangered

        &item
          &.settlement
            position: relative
          display: flex
          justify-content: space-between
          margin-bottom: 30px
          z-index: 1
          &.street
            margin-bottom: 20px
          &.building
            justify-content: flex-end
            margin-bottom: 15px
        &label
          font-size: 18px
          font-weight: 700
          margin-right: 10px
        &block
          display: flex
          flex-direction: column
          position: relative

          &.building
            width: 404px
            justify-content: space-between
            flex-direction: row
        &input
          align-self: flex-end
          border: 2px solid rgba(black, .3)
          width: 400px
          display: flex
          input
            font-size: 15px
            width: 100%
            padding: 8px
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
        &message
          margin-top: 3px
          align-self: flex-start
          font-size: 12px
          color: red
        &location_
          &list
            position: absolute
            top: 100%
            display: flex
            flex-direction: column
            width: 400px
            border: 1px solid rgba(grey, .5)
            background-color: white
            z-index: 5
          &item
            text-align: left
            padding: 10px 5px
            max-width: 400px
            font-size: 13px
            &:hover
              background-color: rgba(orangered, .5)

          &set
            display: flex
            justify-content: flex-end
            margin-bottom: 20px
          &button
            padding: 10px 20px
            background-color: rgba(orangered, .7)
            border-radius: 3px
            font-weight: 700
            color: white
            cursor: pointer


    &order
      &__
        &block
          padding: 20px
          /*background-color: rgba(green, .1)*/
          margin-bottom: 20px
          border-radius: 3px
          position: sticky
          box-shadow: 0 0 10px rgba(black, .1)
          top: 30px
          display: flex
          flex-direction: column
          align-items: center
        &info
          font-weight: 700
          width: calc(100% - 25px)
          >.line
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 10px
        &title
          >.left
            font-size: 20px
            font-weight: 900

          >.right
            font-size: 13px
            color: rgba(grey, .7)
            font-weight: 400
        &sum
          >.left
            font-size: 13px
            font-weight: 500

          >.right
            font-size: 14px
            font-weight: 900
        &delivery
          >.left
            font-size: 13px
            font-weight: 500

          >.right
            font-size: 14px
            font-weight: 900
        &total
          border-top: 1px solid rgba(black, .1)
          padding-top: 10px
          >.left
            font-size: 20px
            font-weight: 900

          >.right
            font-size: 20px
            font-weight: 900
        &payment
          width: 100%
          &_button
            width: 90%
            margin: 0 auto
            padding: 10px
            color: white
            background-color: rgba(orangered, .7)
            cursor: pointer
            border-radius: 3px
            font-weight: 800
            &:hover
              background-color: rgba(orangered, 1)

    &goods
      &__
        &block
        &list
        &item
          position: relative
          padding: 5px
          display: flex
          justify-content: space-between
          &:hover
            box-shadow: 0 0 10px rgba(black, .2)
            .cart-goods__properties
              >.cart-goods__quantity
                >.value
                  >.minus,.plus
                    opacity: 1
            .corner-block
              opacity: 1
        &image
          cursor: pointer
          /*width: 80px*/
          display: flex
          img
            width: 100%
        &properties
          display: flex
          padding: 10px
        &quantity
          width: 150px
          .value
            display: flex

        &brand_size
          width: 250px
        &price
          margin-left: 10px
          width: 70px
  .property
    padding: 0 5px
    display: flex
    flex-direction: column
    align-items: flex-start
  .description
    font-size: 10px
    padding-bottom: 3px
    font-weight: 800
  .value
    font-size: 13px
    padding-bottom: 5px
    &:hover
      .quantity
        color: rgba(orangered, 1)
  .quantity-button
    cursor: pointer
    padding: 5px
    border-radius: 50%
    background-color: rgba(orangered, 0.7)
    width: 8px
    height: 8px
    position: relative
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.16)
    &:hover
      background-color: orangered
    &:before, &:after
      content: ''
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      background-color: white
    &:before
      height: 2px
      width: 8px
  .minus
    margin-right: 5px
    opacity: 0
  .plus
    margin-left: 5px
    opacity: 0
    &:after
      height: 8px
      width: 2px
  .hidden
    margin-right: 5px
    opacity: 0
    cursor: default
  .half
    max-width: 190px
  .corner-block
    position: absolute
    right: 65px
    bottom: 5px
    display: flex
    align-items: center
    opacity: 0
  .delete-button

    display: flex
    align-items: center
    cursor: pointer
    margin-left: 10px
    width: 20px
    padding: 2px 5px
    svg
      width: 20px
      height: 20px
    &:hover
      path
        fill: rgba(orangered, 1)
      polygon
        fill: rgba(orangered, 1)
      .delete-button__title
        color: rgba(orangered, 1)
    path
      fill: rgba(orangered, .7)
    polygon
      fill: rgba(orangered, .7)
    &__title
      margin-left: 5px
      font-size: 13px
      color: rgba(black, .7)

  .delivery-address
    &__
      &current
        cursor: pointer
        position: relative
        width: 404px
        background-color: rgba(lightgrey, .3)
        display: flex
        align-items: center
        justify-content: space-between

        &_text
          font-weight: 800
          padding: 15px 10px
          width: 350px
          display: flex
          flex-wrap: wrap
        &_arrow
          padding: 5px
          display: flex
          align-items: center
          margin-right: 15px
          transition: .5s
          svg
            height: 15px
      &list
        position: absolute
        top: 100%
        left: 0
        width: 400px
        border: 2px solid rgba(lightgrey, .3)
        border-top: none
        background-color: white
        z-index: 5
        ov
      &item
        width: calc(404px - 24px)
        display: flex
        align-items: center
        justify-content: space-between
        padding: 10px
        &.add
          &:hover
            >.delivery-address__button
              background-color: orangered
              border-radius: 50%
              svg
                fill: white
          justify-content: flex-end
          >.delivery-address__item_text
            width: auto
            margin-right: 10px
        &:hover
          background-color: rgba(lightgrey, .2)

        &_text
          display: flex
          flex-wrap: wrap
          width: 330px
      &button
        height: 35px
        width: 35px
        display: flex
        align-items: center
        justify-content: center
        position: relative
        &:hover
          background-color: orangered
          border-radius: 50%
          svg
            fill: white
        &_action
          position: absolute
          bottom: calc(100% + 10px)
          background-color: white
          z-index: 5
          border: 2px solid rgba(lightgrey, .3)
          & .item
            width: 95px
            padding: 10px
            font-weight: 700
            &:hover
              background-color: rgba(orangered, .9)
              color: white
        &_change
        &_delete


        svg
          height: 20px
  .address_item
    margin-right: 5px
  .active

    transform: rotate(180deg)

</style>