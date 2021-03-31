import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '@/plugins/api'
import Home from '../views/Home.vue'
import Catalog from "../views/Catalog";
import Category from "../components/Category";
import ProductsList from "../views/ProductsList";
import ProductPage from "../views/ProductPage";
import Cart from "../views/Cart";
import PersonalArea from "../views/PersonalArea"
import SuccessPaymentPage from "../views/SuccessPaymentPage";
import CRM from "../views/CRM";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalog/',
    name: 'Catalog',
    component: Catalog,
    children: [
      {
        path: ':category',
        name: 'Category',
        component: Category,
      },
      {
        path: ':category/:subcategory',
        name: 'ProductsList',
        component: ProductsList,
      },
      {
        path: ':category/:subcategory/:id',
        name: 'ProductPage',
        component: ProductPage,
      },
    ],
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/personal_area',
    name: 'PersonalArea',
    component: PersonalArea
  },
  {
    path: '/success',
    name: 'SuccessPaymentPage',
    component: SuccessPaymentPage
  },
  {
    path: '/crm',
    name: 'CRM',
    component: CRM,
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem('token');
      const access = await api.get('/crm',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
      const response = access.data.access;
      if(response === true) {
        next();
      } else {
        next({name: 'Home'})
      }
      console.log(access.data.access);
    }
  }


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
