import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.userToken = user.userToken;
      localStorage.setItem('userToken', user.userToken);
    }
  }
});
 
export default store;
