// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router
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