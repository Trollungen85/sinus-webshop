import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  
]

const router = new VueRouter({
  routes
})

export default router
