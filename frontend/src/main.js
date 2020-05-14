import Vue from 'vue';
import App from './App.vue';
import router from './main.router';
import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

// Variable $axios sur le port 3000 pour les requêtes au backend
Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: 'http://localhost:3000'
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
