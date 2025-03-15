import { createRouter, createWebHistory } from 'vue-router';
import PageLogin from './components/PageLogin.vue';
import HomePage from './components/HomePage.vue';
import ProfilPage from './components/ProfilPage.vue';

const routes = [
  { path: '/', component: PageLogin },
  { path: '/home', component: HomePage },
  { path: '/profile', component: ProfilPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
