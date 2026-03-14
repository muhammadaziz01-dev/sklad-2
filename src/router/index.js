import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/login/index.vue";
import Sklad from "../views/deshbord/index.vue";
import Agents from "../views/agents/index.vue";
import SkladValfef from "../views/deshbordValfex/index.vue";
import SkladdRTP from "../views/deshbordRTP/index.vue";
import MenuPage from "@/views/menu/index.vue";
import ErrorPage from "../views/error/index.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
  },
  {
    path: "/sklad",
    name: "Skald",
    component: Sklad,
    children: [
      {
        path: "",
        name: "SkladRTP",
        component: SkladdRTP,
      },
      {
        path: "valfex",
        name: "SkladValfef",
        component: SkladValfef,
      },
    ],
  },
  {
    path: "/agents",
    name: "Agents",
    component: Agents,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;