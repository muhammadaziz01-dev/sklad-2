import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login/index.vue';
import DashboardPage from '../views/deshbord/index.vue';
import DashboardValfef from '../views/deshbordValfex/index.vue';
import DashboardRTP from '../views/deshbordRTP/index.vue';
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
        name: 'DashboardRTP',
        component: DashboardRTP
      },
      {
        path: 'valfex',
        name: 'DashboardValfef',
        component: DashboardValfef
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