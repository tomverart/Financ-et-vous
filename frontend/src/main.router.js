/*import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
// Pages
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';

// Notes de frais
import noteFraisComptable from './components/NoteFraisComptable.vue';
import createExpenseReport from './components/CreateExpenseReport.vue';
import createExpense from './components/CreateExpense.vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueRouter);
this.$axios.post("/utilisateur", {
  login: this.login,
  password: this.password
});
// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login },

  {
    path: '/noteFrais', component: noteFraisComptable, beforeEnter: async (to, from, next) => {
      await this.$axios
        .get("/connected")
        .then(response => {
          if (response.status === 200) {
            next();
          }
        }
        )
    }
  },
  { path: '/dashboard', component: EmployeeDashboard },
  { path: '/createExpenses', component: createExpense, props: true, name: 'createExpenses' },
  { path: '/createExpensesReport', component: createExpenseReport }
];



export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
*/