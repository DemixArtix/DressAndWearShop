<template lang="pug">
  div( class="feedback__block")
    div( class="feedback__title") Ваш отзыв о товаре
    div( class="feedback__info")
      svg(
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        viewBox="0 0 512 512"
        style="enable-background:new 0 0 512 512;"
        height="40px"
        xml:space="preserve")
        g
        g
          path(d="M501.874,482.794c-6.312-3.676-44.743-27.475-65.305-70.505c48.023-44.904,75.337-107.371,75.337-171.301c0-132.31-115.369-240.956-255.953-240.956S0,108.678,0,240.988s115.369,240.956,255.953,240.956c18.872,0,39.143-1.769,67.111-7.645c73.508,39.06,139.486,37.962,164.589,37.566c11.175-0.139,19.288,1.879,23.463-9.666C513.942,494.455,509.762,485.51,501.874,482.794z M285.948,361.966c0,16.564-13.429,29.995-29.995,29.995c-16.566,0-29.995-13.431-29.995-29.995V240.988c0-16.566,13.429-29.995,29.995-29.995c16.566,0,29.995,13.429,29.995,29.995V361.966z M255.953,165.002c-16.566,0-29.995-13.431-29.995-29.995c0-16.566,13.429-29.995,29.995-29.995c16.566,0,29.995,13.429,29.995,29.995C285.948,151.572,272.519,165.002,255.953,165.002z")
      div(class="feedback__info_text") Если качество покупки вас устроило, можете поставить только оценку товара. Остальные поля - не обязательны.

    div(class="feedback-rating__title title") Оцените покупку
    div(class="feedback-rating__block")
      div(class="feedback-rating__body")
      div(class="feedback-rating__active" :style="{ width: `${activeWidth}%` }" ref="active")
      div(class="feedback-rating__items")
        div(
          class="feedback-rating__item"
          v-for="item of 5"
          @click="evaluateProduct(item)"
          @mouseover="overEffect(item)"
          @mouseleave="leaveEffect()" )

    div(class="feedback-description__title title") Поделитесь впечатлениями о товаре
    div(class="feedback-description__input")
      input(placeholder="Достоинтсва")
    div(class="feedback-description__input")
      input(placeholder="Недостатки")
    div(class="feedback-description__input")
      input(placeholder="Комментарий к отзыву")
    div(class="feedback-images__title title") Добавьте фотографии
    div(class="feedback-images__block")
      div(class="feedback-images-preview" v-if="images")
        div(class="feedback-images-preview__list")
          div(
            class="feedback-images-preview__item"
            v-for="(item, index) in imagesSources"
            :key="index"
          )

            img(:src="item")
            div(class="feedback-images-preview__close" @click="deleteImage(index)")

      div(class="feedback-images__form"
        ref="imagesForm"
        @drag.prevent.stop
        @dragstart.prevent.stop
        @dragend.prevent.stop
        @dragover.prevent.stop="dragoverEffect"
        @dragenter.prevent.stop="dragoverEffect"
        @dragleave.prevent.stop="dragleaveEffect"
        @drop.prevent.stop="dropFiles"
        @click="dragoverEffect"
        )
        svg(
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px"
          height="50px"
          viewBox="0 0 419.2 419.2"
          style="enable-background:new 0 0 419.2 419.2; fill:orangered"
          xml:space="preserve")
          g
          g
          g
            circle( cx="158" cy="144.4" r="28.8")
            path(d="M394.4,250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318,30,304,24,288.4,24h-232c-15.6,0-29.6,6.4-40,16.4C6,50.8,0,64.8,0,80.4v184.4V282v37.2c0,15.6,6.4,29.6,16.4,40c10.4,10.4,24.4,16.4,40,16.4h224.4c14.8,12,33.2,19.6,53.6,19.6c23.6,0,44.8-9.6,60-24.8c15.2-15.2,24.8-36.4,24.8-60C419.2,286.8,409.6,265.6,394.4,250.4zM21.2,80.4c0-9.6,4-18.4,10.4-24.4c6.4-6.4,15.2-10.4,24.8-10.4h232c9.6,0,18.4,4,24.8,10.4c6.4,6.4,10.4,15.2,10.4,24.8v124.8l-59.2-59.2c-4-4-10.8-4.4-15.2,0L160,236l-60.4-60.8c-4-4-10.8-4.4-15.2,0l-63.2,64V80.4z M56,355.2v-0.8c-9.6,0-18.4-4-24.8-10.4c-6-6.4-10-15.2-10-24.8V282v-12.4L92,198.4l60.4,60.4c4,4,10.8,4,15.2,0l89.2-89.6l58.4,58.8c-1.2,0.4-2.4,0.8-3.6,1.2c-1.6,0.4-3.2,0.8-5.2,1.6c-1.6,0.4-3.2,1.2-4.8,1.6c-1.2,0.4-2,0.8-3.2,1.6c-1.6,0.8-2.8,1.2-4,2c-2,1.2-4,2.4-6,3.6c-1.2,0.8-2,1.2-3.2,2c-0.8,0.4-1.2,0.8-2,1.2c-3.6,2.4-6.8,5.2-9.6,8.4c-15.2,15.2-24.8,36.4-24.8,60c0,6,0.8,11.6,2,17.6c0.4,1.6,0.8,2.8,1.2,4.4c1.2,4,2.4,8,4,12v0.4c1.6,3.2,3.2,6.8,5.2,9.6H56z M378.8,355.2c-11.6,11.6-27.2,18.4-44.8,18.4c-16.8,0-32.4-6.8-43.6-17.6c-1.6-1.6-3.2-3.6-4.8-5.2c-1.2-1.2-2.4-2.8-3.6-4c-1.6-2-2.8-4.4-4-6.8c-0.8-1.6-1.6-2.8-2.4-4.4c-0.8-2-1.6-4.4-2-6.8c-0.4-1.6-1.2-3.6-1.6-5.2c-0.8-4-1.2-8.4-1.2-12.8c0-17.6,7.2-33.2,18.4-44.8c11.2-11.6,27.2-18.4,44.8-18.4s33.2,7.2,44.8,18.4c11.6,11.6,18.4,27.2,18.4,44.8C397.2,328,390,343.6,378.8,355.2z")
            path(d="M341.6,267.6c-0.8-0.8-2-1.6-3.6-2.4c-1.2-0.4-2.4-0.8-3.6-0.8c-0.4,0-0.4,0-0.4,0c-0.4,0-0.4,0-0.4,0c-1.2,0-2.4,0.4-3.6,0.8c-1.2,0.4-2.4,1.2-3.6,2.4l-24.8,24.8c-4,4-4,10.8,0,15.2c4,4,10.8,4,15.2,0l6.4-6.4v44c0,6,4.8,10.8,10.8,10.8s10.8-4.8,10.8-10.8v-44l6.4,6.4c4,4,10.8,4,15.2,0c4-4,4-10.8,0-15.2L341.6,267.6z")
        div(class="feedback-images__input")
          input(id="file-input" type="file" @change="chooseFiles" multiple accept="image/jpeg,image/png")
          label(for="file-input") Выберите файл
          span &nbspили перетащите его сюда

    div(class="feedback__title") Дополнительная информация
    div(class="feedback-size")
      div(class="feedback-size__title title") Соответствие размеру:


      div(class="feedback-size__range")
        div(class="feedback-size__line")
        div(class="feedback-size__list")
          div(class="feedback-size__dote" v-for="({value, translate}, index) in doteData" :key="index")
            div(class="feedback-size__dote_input")
              input(type="radio" :id="`dote_${ index + 1 }`")
              div(class="feedback-size__dote_visual")
              div(class="feedback-size__dote_text") {{translate}}



</template>

<script>
  import api from '@/plugins/api';
  import getToken from "../mixins/getToken";


  export default {
    name: "FeedbackForm",
    data:() => ({
      ratingValue: 0,
      activeWidth: 0,
      images: [],
      imagesSources: [],
      doteData: [
        {
          value: 'small',
          translate: 'Маломерит',
        },
        {
          value: 'true',
          translate: 'Соответствует',
        },
        {
          value: 'bigger',
          translate: 'Большемерит',
        }
      ]
    }),
    mounted() {
      this.ratingValue = this.evaluationValue ? this.evaluationValue : 0;
      this.activeWidth = this.ratingValue * 20
    },
    props: {
      evaluationValue: {
        type: Number,
        default: 0
      }
    },
    computed: {
    },
    methods: {
      dragoverEffect(e) {
        const imagesForm = this.$refs.imagesForm;
        // console.dir(imagesForm);
        //
        // console.log(imagesForm);
        imagesForm.classList.add('dragover')

      },
      dragleaveEffect(e) {
        console.log('leave');
        const imagesForm = this.$refs.imagesForm;
          // console.log('leave');
          let dx = e.pageX - imagesForm.offsetLeft;
          let dy = e.pageY - imagesForm.offsetTop;
          if ((dx < 0) || (dx > imagesForm.offsetWidth) || (dy < 0) || (dy > imagesForm.offsetHeight)) {
            imagesForm.classList.remove('dragover')
          }
      },
      dropFiles(e) {
        const imagesForm = this.$refs.imagesForm;
        imagesForm.classList.remove('dragover');
        const files = e.dataTransfer.files;
        this.processFiles(files);
      },
      chooseFiles(e) {
        const files = e.target.files;
        this.processFiles(files);
      },
      processFiles(files) {
        let maxFileSize = 5242880;

        files.forEach(file => {
          if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
            this.images.push(file);
              // create a new FileReader to read this image and convert to base64 format
              const reader = new FileReader();
              // Define a callback function to run, when FileReader finishes its job
              reader.onload = (e) => {
                this.imagesSources.push(e.target.result)
              };
              // Start the reader job - read file as a data url (base64 format)
              reader.readAsDataURL(file);
          }
        });

        // api.post(
        //   '/send_feedback_images',
        //   {
        //     data: Data
        //   },
        //   {
        //     headers: {
        //       'Authorization': this.token(),
        //       'Content-Type': false,
        //       'processData': false,
        //     }
        //   }
        //   )
      },
      deleteImage(index) {
        this.images.splice(index, 1);
        this.imagesSources.splice(index, 1);
      },
      overEffect(value) {
        this.activeWidth = value * 20
      },
      leaveEffect() {
        this.activeWidth = this.ratingValue * 20
      },
      evaluateProduct(value) {
        console.log(value);
        this.ratingValue = value;
      }
    }
  }
</script>

<style scoped lang="sass">

  .title
    font-weight: 800
    margin-bottom: 5px
    margin-top: 20px
  .feedback
    &__
      &block
        display: flex
        flex-direction: column
        align-items: flex-start
      &title
        font-size: 24px
        font-weight: 900
      &info
        display: flex
        background-color: #f2f3f5
        padding: 20px
        color: #4d5f71
        margin-right: 10px
        font-size: 14px
        max-width: 500px
        svg
          fill: orangered
        &_text
          text-align: left
          margin-left: 10px
  .feedback-
    &rating
      &__
        &block
          display: flex
          align-items: flex-end
          width: 167px
          font-size: 40px
          line-height: .75
          position: relative
        &body
          position: relative
          &:before
            content: "★★★★★"
            display: block
            color: lightgrey
        &active
          position: absolute
          height: 100%
          width: 0%
          top: 0
          left: 0
          overflow: hidden
          &:before
            content: "★★★★★"
            display: block
            position: absolute
            height: 100%
            width: 100%
            top: 0
            left: 0
            color: orangered

        &items
          display: flex
          position: absolute
          width: 100%
          height: 100%
          left: 0
          top: 0
        &item
          cursor: pointer
          flex: 0 0 20%
          margin: 0
          opacity: 1
          height: 30px
    &description
      &__
        &input
          border: 2px solid lightgrey
          display: flex
          margin: 5px
          width: 500px
          border-radius: 3px
          input
            padding: 5px 10px
            border: none
            width: 100%
            &:focus
              outline: none
    &images
      &__
        &title
        &block
          display: flex
          margin-bottom: 20px
        &form
          display: flex
          flex-direction: column
          background-color: rgba(orangered, .1)
          height: 100px
          width: 100px
          outline: 1px dashed orangered
          outline-offset: -4px
          padding: 5px
          margin: 5px
          svg
            margin-left: 10px
            margin-top: 5px
        &input
          position: relative
          font-size: 10px
          z-index: 10
          label
            font-weight: 800
            &:hover
              text-decoration: underline
          input
            z-index: -10
            position: absolute
            opacity: 0
            width: 0.1px
            height: 0.1px
      &-preview
        &__
          &list
            display: flex

          &item
            margin: 5px
            position: relative
            width: 110px
            height: 110px
            overflow: hidden
            border-radius: 3px
            img
              max-width: none
              max-height: none
              width: 128px
              min-width: 100%
              min-height: 100%
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%,-50%)

          &close
            position: absolute
            cursor: pointer
            right: 10px
            top: 10px
            background-color: white
            border-radius: 50%
            width: 20px
            height: 20px
            box-shadow: 0 0 2px 1px rgba(black, .5)
            &:before,&:after
              position: absolute
              border-radius: 2px
              left: calc(50% - 1px)
              top: calc(50% - 6px)
              content: ""
              height: 12px
              width: 2px
              background-color: grey

            &:before
              transform: rotate(45deg)
            &:after
              transform: rotate(-45deg)
            &:hover
              box-shadow: 0 0 2px 1px rgba(black, .7)
              &:before,&:after
                background-color: black
    &size
      width: 500px
      text-align: left
      &__
        &title
          margin-bottom: 40px
        &range
          position: relative
          width: 100%
          height: 2px
          background-color: #d6dbe0
        &line
          position: absolute
          top: -4px
          left: 4px
          right: 4px
          height: 10px
          cursor: pointer
        &list
          display: flex
          justify-content: space-between
        &dote
          position: relative
          margin-top: -7px
          width: 16px
          height: 16px
          box-sizing: border-box
          &:first-child .feedback-size__dote_text
            margin-left: 4px
            transform: translateX(0)
            text-align: left
          &:last-child .feedback-size__dote_text
            right: 0
            transform: translateX(0)
            margin-right: 4px
            text-align: right
          &_input
            width: 24px
            height: 24px
            margin-top: -4px
            margin-left: -4px
            cursor: pointer
            input
              top: 0
              left: 0
              z-index: 10
              width: 10px
              height: 10px
              opacity: 0
          &_text
            font-size: 14px
            line-height: 1.29
            color: #808d9a
            position: absolute
            top: 100%
            min-width: 120px
            padding-top: 2px
            transform: translateX(-50%)
            text-align: center
            margin-left: 12px
            -webkit-user-select: none
            -moz-user-select: none
            -ms-user-select: none
            user-select: none

          &_visual
            position: absolute
            top: 50%
            left: 50%
            margin-left: -8px
            margin-top: -8px
            width: 16px
            height: 16px
            box-sizing: border-box
            background-color: #fff
            border: 2px solid #d6dbe0
            border-radius: 50%
            &:before,&:after
              content: ""
              width: 8px
              height: 8px
              position: absolute
              top: 50%
              left: 50%
              margin-top: -4px
              margin-left: -4px
              transform: scale(0)
              border-radius: 50%
            &:before
              background-color: #e5efff
              transition: transform .3s ease-in-out,background-color .3s ease-in-out
            &:after
              background-color: #fff
              transition: transform .3s ease-in-out
            &:hover
              &:before
                transform: scale(1)

  .dragover
    background-color: rgba(orangered, .05)
    outline-offset: -2px

</style>