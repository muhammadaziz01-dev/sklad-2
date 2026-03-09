import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login/index.vue';
import DashboardPage from '../views/deshbord/index.vue';
import DashboardHome from '../views/deshbordHome/index.vue';
import DashboardSettings from '../views/deshbordStatik/index.vue';
import ErrorPage from '../views/error/index.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: DashboardSettings
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;