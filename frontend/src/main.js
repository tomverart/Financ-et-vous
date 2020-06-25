import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';

// Components
// Pages
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';
import createUser from './components/creationUser.vue';
// Notes de frais
import noteFraisComptable from './components/NoteFraisComptable.vue';
import createExpenseReport from './components/CreateExpenseReport.vue';
import createExpense from './components/CreateExpense.vue';
//import VueAxios from 'vue-axios'
import axios from 'axios';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

const myAxios = axios.create({
  baseURL: 'http://localhost:3000'
})

// Variable $axios sur le port 3000 pour les requêtes au backend
Vue.use({
  install(Vue) {
    Vue.prototype.$axios = myAxios;
  }
});

Vue.use(VueRouter);
/*axios.post("/utilisateur", {
  login: this.login,
  password: this.password
});*/
async function beforeEnter(to, from, next) {
  try {
    await myAxios.get("/connected");
    next();
  }
  catch (error) {
    next('/login')
  }
}
async function beforeEnterComptable(to, from, next) {
  try {
    const result = await myAxios.get("/connected");
    if(result.data.role == 'Comptable' || result.data.role == 'Administrateur')
    {
          next();

    }

  }
  catch (error) {
    next('/login')
  }
}

async function beforeEnterEmploye(to, from, next) {
  try {
    const result = await myAxios.get("/connected");
    if(result.data.role == 'Employé' || result.data.role == 'Administrateur')
    {
          next();

    }
  }
  catch (error) {
    next('/login')
  }
}


async function beforeLogin(to, from, next) {
  try {
    const result = await myAxios.get("/connected");
    console.log('coucou je suis le resultat', result);
    if (result.data.role == 'Comptable')
    {
      next('/noteFrais')
    } else if (result.data.role == 'Employé')
    {
            next('/dashboard')

    }
    result.data.role
  }
  catch (error) {
    next()
  }
}

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login , beforeEnter:beforeLogin},

  { path: '/noteFrais', component: noteFraisComptable, beforeEnter:beforeEnterComptable },
  { path: '/dashboard', component: EmployeeDashboard, beforeEnter:beforeEnterEmploye },
  { path: '/createExpenses', component: createExpense, props: true, name: 'createExpenses', beforeEnter },
  { path: '/createExpensesReport', component: createExpenseReport, beforeEnter },
  { path: '/createUser', component: createUser}
];


const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});


Vue.use(BootstrapVue, {
  "BNavbar": {
    "variant": null
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
