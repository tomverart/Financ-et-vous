import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue'

Vue.use(VueRouter);

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login }, 

  { path: '/employee_dashboard', component: EmployeeDashboard }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
