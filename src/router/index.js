import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/login/index.vue";
import Sklad from "../views/deshbord/index.vue";
import Agents from "../views/agents/index.vue";
import SkladValfef from "../views/deshbordValfex/index.vue";
import SkladdRTP from "../views/deshbordRTP/index.vue";
import MenuPage from "@/views/menu/index.vue";
import Profil from "@/views/profil/index.vue"
import Sale from "@/views/sale/index.vue"
import ErrorPage from "../views/error/index.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
    meta: { requiresAuth: true }, // Barcha login qilganlar
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/sale",
    name: "Sale",
    component: Sale,
    meta: { requiresAuth: true , roles:["admin"]}, 
  },
  {
    path: "/sklad",
    name: "Skald",
    component: Sklad,
    meta: { requiresAuth: true, roles: ["admin", "manager", "agent"] }, // faqat admin va manager
    children: [
      {
        path: "",
        name: "SkladRTP",
        component: SkladdRTP,
        meta: { requiresAuth: true, roles: ["admin", "manager","agent"] },
      },
      {
        path: "valfex",
        name: "SkladValfef",
        component: SkladValfef,
        meta: { requiresAuth: true, roles: ["admin", "manager","agent"] },
      },
    ],
  },
  {
    path: "/agents",
    name: "Agents",
    component: Agents,
    meta: { requiresAuth: true, roles: ["admin", "manager"] }, // faqat admin
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

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!userRole;

  // 1. Login sahifasiga har doim kirish mumkin
  if (!to.meta.requiresAuth) {
    // Agar login qilgan bo'lsa, loginga qaytmasin
    if (isAuthenticated && to.name === "Login") {
      return next({ name: "Menu" });
    }
    return next();
  }

  // 2. Login qilmagan bo'lsa → loginга redirect
  if (!isAuthenticated) {
    return next({ name: "Login" });
  }

  // 3. Sahifada rol cheklovi bormi?
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    // Ruxsat yo'q → menyuga qaytarish
    return next({ name: "Menu" });
  }

  // 4. Hammasi OK → sahifaga o'tish
  next();
});

export default router;