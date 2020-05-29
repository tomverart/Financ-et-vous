import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from './components/Home.vue';
import Login from './components/ConnexionForm.vue';
import noteFraisComptable from './components/noteFrais/noteFraisComptable.vue';
import createNoteFrais from './components/noteFrais/createNoteFrais.vue';
import createFrais from './components/noteFrais/createFrais.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';

Vue.use(VueRouter);

// Nom des routes liés aux composants
const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login },

  { path: '/noteFrais', component: noteFraisComptable },
  { path: '/createNoteFrais', component: createNoteFrais },
  { path: '/createFrais', component: createFrais, props: true, name: 'createFrais' },
  { path: '/dashboard/:userType/:userId', component: EmployeeDashboard }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
