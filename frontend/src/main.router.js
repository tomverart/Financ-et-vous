import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
<<<<<<< HEAD

import noteFraisComptable from './components/noteFrais/noteFraisComptable.vue';

=======
import EmployeeDashboard from './components/EmployeeDashboard.vue'
>>>>>>> yacine
Vue.use(VueRouter);

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

<<<<<<< HEAD
  { path: '/login', component: Login },

  { path: '/noteFrais', component: noteFraisComptable }
=======
  { path: '/login', component: Login }, 

  { path: '/employee_dashboard', component: EmployeeDashboard }
>>>>>>> yacine
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
