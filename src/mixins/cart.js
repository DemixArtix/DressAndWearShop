import api from '@/plugins/api';

export default {
  methods: {
    toProductPage(path) {
      if(path !== this.$route.path) {
        this.$router.push({path});
        this.setCurrentProduct({
          categoryName: this.$route.params.category,
          subcategoryName: this.$route.params.subcategory,
          productId: this.$route.params.id - 1,
        })
      }
      return;
    },
    onChangeQuantity(productId, value) {
      console.log(productId, value);
      if(this.token()) {
        api.post('/change_quantity_in_cart',
          {
            data: {
              productId,
              value,
            }
          },
          {
            headers: {
              'Authorization': this.token()
            }
          }).then(res => {
          if(res.data.success === true) {
            this.changeQuantity({productId, value})
          }
        }).catch(err => {
          console.log(err)
        });
      }
    },
    onDeleteCartItem(productId) {
      if(this.token()) {
        api.post('/delete_item_in_cart',
          {
            data: {
              productId,
            }
          },
          {
            headers: {
              'Authorization': this.token()
            }
          }).then(res => {
          if(res.data.success === true) {
            this.deleteCartItem(productId)
          }
        }).catch(err => {
          console.log(err)
        });
      }
    }
  }
}