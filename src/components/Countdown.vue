<template lang="pug">
  div(class="countdown__block" v-if="tick > 0")
    span(class="countdown__item") {{hours}} :&nbsp
    span(class="countdown__item") {{min}} :&nbsp
    span(class="countdown__item") {{sec}}
    span(class="countdown__title") &nbsp до отмены заказа
</template>

<script>
  export default {
    name: "Countdown",
    data:() => ({
      base: 60,
      init: false,
      hours: null,
      min: null,
      sec: '00',
      initialTimeStamp: null,
      tick: 0,
      timeout: null,
      expirationDTParsed: null,
    }),
    props: {
      expirationDateTime: {
        type: String,
        default: ''
      }
    },
    beforeMount() {
      this.expirationDTParsed = this.parseDate(this.expirationDateTime);
      this.countdown();
    },
    methods: {
      parseDate(UTC_Date) {
        return Date.parse(UTC_Date)
      },
      countdown() {
        const currentTimeStamp = new Date().getTime();
        const remainderMsec = this.expirationDTParsed - currentTimeStamp;
        this.tick = remainderMsec / 1000;
        this.sec = Math.floor(this.tick);
        this.sec = this.sec % this.base;
        this.min = Math.floor(this.tick / this.base);
        this.min = this.min % this.base;
        this.hours = Math.floor(this.tick / this.base ** 2);
        if(this.sec < 10) this.sec = '0' + this.sec;
        if(this.min < 10 && this.tick >= this.base) this.min = '0' + this.min;

        if(remainderMsec > 0 ) {
          this.timeout = setTimeout(this.countdown, 100);
        } else {
          clearTimeout(this.timeout);
        }

      },

    }
  }
</script>

<style scoped lang="sass">
  .countdown
    &__
      &block
      &item
        font-size: 12px
        font-weight: 900
      &title
        font-size: 10px
        color: grey


</style>