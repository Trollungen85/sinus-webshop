import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getData from '@/api/api.js';
import { getUser, checkLogin, registerUser, setToken } from '@/api/api.js';

const BASE_URL = 'http://localhost:5000/api/';
const LOGIN_URL = `${BASE_URL}auth/`;
const REGISTER_URL = `${BASE_URL}register/`;
const USER_URL = `${BASE_URL}me/`;

const defaultUser = {
  email: "",
  name: "",
  role: "",
  address: {
    street: "",
    zip: "",
    city: ""
  }
}

export default new Vuex.Store({
  state: {
    products: [],
    user: defaultUser,
    cart: [],
  },
  getters: {
    products: state => {
      return state.products;
    },
    skateboards: (state) => {
      return state.products.filter(pro => pro.category == "board");
    },
    clothes: (state) => {
      return state.products.filter(pro => pro.category == "clothes");
    },
    wheels: (state) => {
      return state.products.filter(pro => pro.category == "wheels");
    },
  },
  mutations: {
    initProducts(state, data) {
      state.products = data;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    logOutUser(state) {
      state.user = defaultUser;
    }
  },
  actions: {
    async getProducts({ commit }) {

      // LÄGG TILL STATE SOM PARAMETER
      // let products;
      // if (localStorage.getItem('products') == null) {
      //   products = await getData();
      //   localStorage.setItem('products', JSON.stringify(state.products));
      // }
      // else {
      //   products = localStorage.getItem('products');
      // }
      // commit('initProducts', products);    

      let products;  
      products = await getData();
      commit('initProducts', products);    
    },
    async checkLogin(context, userLogin) {
      const userCheck = await checkLogin(LOGIN_URL, userLogin);
      const token = userCheck.data.token;

      if (userCheck.status === 200) {
        alert("LOGGAT IN");
        setToken(token);
        const userDB = await getUser(USER_URL);
        console.log(userDB);
        context.state.user = userDB;
      }
    },
    async registerUser(context, newUser) {
      const response = await registerUser(REGISTER_URL, newUser);
      console.log('registred user response: ' + response);

      //tILLFÄLLIG
      console.log(context);
    }
  },
  modules: {
  }
})
