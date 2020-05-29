import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import noteFraisComptable from './components/expensesReport/noteFraisComptable.vue';
import createExpensesReport from './components/expensesReport/createExpensesReport.vue';
import createExpenses from './components/expensesReport/createExpenses.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';
import Loading from './components/Loading.vue';

Vue.use(VueRouter);

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login },

  { path: '/noteFrais', component: noteFraisComptable },
  { path: '/dashboard', component: EmployeeDashboard }
  { path: '/adele', component: Loading },
  { path: '/createExpenses', component: createExpenses, props: true, name: 'createExpenses' },
  { path: '/createExpensesReport', component: createExpensesReport },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
