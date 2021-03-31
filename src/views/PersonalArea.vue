<template lang="pug">
  div(class="personal_area__block")
    h2(class="personal_area__title") Личный кабинет
    div(class="personal_area__order_list")
      div(
        v-if="orders"
        class="personal_area__order_item"
        v-for="({creationDateTime, goods, status, goodsAmount, delivery, amount, payUrl, expirationDateTime}, index) in orders"
        :key="index"
        )
        div(class="personal_area__order_title") Заказ от {{getDate(creationDateTime)}} {{getMonth(creationDateTime)}}

        div(class="personal_area__order_block")
          div( class="personal_area__order_goods_list")

            div(
              class="personal_area__order_goods_item"
              v-for="({ brand, images, path, price, productId, quantity, size }, index) in goods" :key="index")
              div(class="personal_area__order_goods_image" @click="$router.push(path)")
                img( :src="images[0]")

          div(class="personal_area__order_properties")
            div(class="personal_area__order_properties_list")
              div(class="personal_area__order_goods_amount property")
                div(class="description") Товары
                div(class="value") {{goodsAmount}} ₽
              div(class="personal_area__order_delivery_amount property")
                div(class="description") Доставка
                div(class="value") {{delivery}} ₽
              div(class="personal_area__order_total_amount property")
                div(class="description") Итого
                div(class="value") {{amount}} ₽
              div(v-if="!payUrl" class="personal_area__order_status") {{getStatusTitle(status)}}
              div(v-else class="personal_area__order_payment")
                a(class="personal_area__order_link" :href="payUrl")
                  span Оплатить заказ
                  svg(
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px"
                    viewBox="0 0 611.996 611.996"
                    style="enable-background:new 0 0 611.996 611.996;"
                    xml:space="preserve"
                    height="25px"
                    )
                    g
                    g
                      path(d="M588.63,113.193L213.812,33.871c-15.858-3.355-31.576,6.876-34.931,22.734l-7.121,45.762l432.477,91.519l7.121-45.762C614.713,132.272,604.488,116.549,588.63,113.193z")
                      path(d="M431.009,203.591c-4.378-15.766-20.854-25.085-36.615-20.714L323.24,202.63l-167.742-35.5l-18.448,87.165L21.786,286.287c-15.76,4.372-25.079,20.848-20.708,36.609l64.958,234.078c4.378,15.76,20.855,25.085,36.615,20.708l372.608-103.403c15.76-4.378,25.079-20.848,20.708-36.615l-11.15-40.184l41.789,8.835c15.858,3.361,31.576-6.87,34.931-22.728l26.439-124.937L437.45,226.797L431.009,203.591z M474.04,322.559l9.215-43.552c1.384-6.521,7.85-10.727,14.37-9.35l43.552,9.221c6.527,1.384,10.733,7.843,9.356,14.37l-9.215,43.552c-1.384,6.521-7.849,10.733-14.37,9.35l-43.552-9.215C476.863,335.546,472.656,329.08,474.04,322.559z M28.27,309.646l103.115-28.606l243.299-67.517l26.181-7.274c0.478-0.129,0.955-0.19,1.421-0.19c2.1,0,4.611,1.378,5.345,4.017l3.074,11.07l9.631,34.704L37.148,362.186l-12.705-45.768C23.647,313.546,25.399,310.442,28.27,309.646z M472.601,444.141c0.49,1.776-0.024,3.245-0.545,4.164c-0.514,0.918-1.506,2.119-3.282,2.608L96.173,554.316c-0.471,0.129-0.955,0.196-1.421,0.196c-2.1,0-4.611-1.384-5.345-4.023L51.519,413.955l383.188-106.342l23.371,84.208L472.601,444.141z")
                      path(d="M156.379,453.484c-1.788-6.429-8.499-10.225-14.928-8.443l-43.515,12.08c-6.423,1.782-10.225,8.499-8.437,14.928l12.074,43.509c1.788,6.429,8.499,10.225,14.928,8.437l43.515-12.074c6.429-1.782,10.225-8.499,8.443-14.928L156.379,453.484z")
                Countdown(:expirationDateTime="expirationDateTime")







</template>

<script>
  import { mapGetters} from 'vuex';
  import Countdown from "../components/Countdown";

  export default {
    name: "PersonalArea",
    components: {Countdown},
    computed: {
      ...mapGetters('orders', ['orders'])
    },
    methods: {
      parseDate(UTC_Date) {
        return Date.parse(UTC_Date)
      },
      getDate(UTC_Date) {
        return new Date(this.parseDate(UTC_Date)).getDate()
      },
      getMonth(UTC_Date) {
        const months = ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря'];
        return months[new Date(this.parseDate(UTC_Date)).getMonth()].toLowerCase();
      },
      getStatusTitle(status) {
        const { value } = status;
        return value === "WAITING" ? 'Ожидается оплата' :
          value === "PAID" ? 'Заказ оплачен' :
            value === "REJECTED" ? 'Заказ отменен' : 'Время жизни счета истекло. Счет не оплачен'
      },
      getStatus(status) {
        return status.value;
      }
    }
  }
</script>

<style scoped lang="sass">
  .property
    font-size: 13px
    display: flex
    justify-content: space-between
    padding: 5px
  .description
    font-weight: 300
  .value
    font-weight: 300
  .personal_area
    &__
      &block
        margin-left: 40px
      &title
        font-size: 22px
        font-weight: 900
        text-align: left

      &order_
        &payment
          display: flex
          flex-direction: column
        &list
          margin-top: 10px

        &item
          display: flex
          flex-direction: column
          box-shadow: 0 2px 10px 0 rgba(black, .12)
          border-radius: 15px 15px 0 0
          margin-top: 20px

        &title
          background-color: rgba(lightgrey, .5)
          color: black
          padding: 20px
          text-align: left
          border-radius: 15px 15px 0 0
          font-weight: 400
          font-size: 18px
        &block
          display: flex
          justify-content: space-between
          padding: 20px
        &properties
          width: 200px
          display: flex
          flex-direction: column
          justify-content: flex-end
          background-color: rgba(orangered, .01)
          &_list
            border: 3px dashed orangered
            padding: 10px
        &link
          display: flex
          align-items: center
          justify-content: space-around
          text-decoration: none
          color: white
          background-color: rgba(orangered, .7)
          font-weight: 800
          padding: 5px
          border-radius: 5px
          font-size: 14px
          svg
            fill: white
          &:hover
            background-color: orangered
        &goods_amount
        &delivery_amount
        &total_amount
          >.value, >.description
            font-weight: 900
        &status
          font-size: 12px
          padding: 5px
          border-radius: 3px
          box-shadow: 0 0 9px -3px rgba(orangered, .5)
          font-weight: 900
          background-color: white
        &goods_
          &list
            display: flex
            flex-wrap: wrap
            max-width: 900px
          &item
            cursor: pointer
            margin: 3px
          &image
            width: 90px
            display: flex
            img
              height: 100%
              width: 100%
</style>