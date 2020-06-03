import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
// Pages
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';

// Notes de frais
import noteFraisComptable from './components/expensesReport/noteFraisComptable.vue';
import createExpenseReport from './components/CreateExpenseReport.vue';
import createExpense from './components/CreateExpense.vue';

Vue.use(VueRouter);

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login },

  { path: '/noteFrais', component: noteFraisComptable },
  { path: '/dashboard', component: EmployeeDashboard },
  { path: '/createExpenses', component: createExpense, props: true, name: 'createExpenses' },
  { path: '/createExpensesReport', component: createExpenseReport }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
