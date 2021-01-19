<template lang="pug">
  div(class="favorites-mini__heart" @click="onToggleFavorites")
    template(v-if="inFavorites")
      svg(
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="25px"
        viewBox="-9 0 450.775 437.774"
        cursor="pointer")
        g
          path(d="M437.775,150.801c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801C0,67.584,54.202,29.761,121.041,29.761c30.946,0,59.093,11.7,80.463,30.818l-55.744,80.925c-1.392,2.021-1.906,4.527-1.421,6.936c0.484,2.403,1.924,4.522,3.992,5.849l82.958,53.309l-38.178,46.08c-1.921,2.317-2.568,5.433-1.726,8.322l21.359,73.672c1.144,3.955,4.764,6.55,8.709,6.55c0.703,0,1.425-0.089,2.137-0.255c4.72-1.135,7.705-5.786,6.789-10.551l-12.975-67.033l54.456-54.725c1.832-1.841,2.784-4.383,2.624-6.966c-0.159-2.598-1.424-4.995-3.476-6.593l-71.732-55.925l77.963-93.629c1.584-1.906,2.317-4.383,2.033-6.845c-0.142-1.265-0.562-2.471-1.194-3.552c12.129-4.111,25.104-6.387,38.633-6.387C383.574,29.761,437.775,83.962,437.775,150.801z")
      div(class="favorites-mini__heart-title") Удалить из избранных
    template(v-if="!inFavorites")
      svg(
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="25px"
        viewBox="-6 0 450.775 437.774"
        cursor="pointer")
        path(d="M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z")
      div(class="favorites-mini__heart-title") Вернуть в избранные
</template>

<script>
  import { mapActions } from 'vuex'
  import api from '@/plugins/api';
  import getToken from "../mixins/getToken";

  export default {
    name: "FavoritesButton",
    props: {
      productId: {
        type: String,
        default: '',
      },
      inFavorites: {
        type: Boolean,
        default: true,
      }
    },
    mixins: [getToken],
    methods: {
      ...mapActions('favorites', ['switchFavoritesLabel']),
      onToggleFavorites() {
        if(this.token()) {
          api.post('/toggle_favorites_id',
            {
              data: {
                productId: this.productId
              }
            },
            {
              headers: {
                'Authorization': this.token()
              }
            })
            .then(res => {
              if(res.data.success === true) {
                this.switchFavoritesLabel({
                  bool: !this.inFavorites,
                  productId: this.productId
                });
              }
            })
            .catch(err => console.log(err));
        }

      }
    }
  }
</script>

<style scoped lang="sass">
  .favorites-mini__heart
    margin-top: 5px
    display: flex
    align-items: center
    path
      fill: orangered
    &-title
      font-size: 13px
      margin-left: 5px
</style>