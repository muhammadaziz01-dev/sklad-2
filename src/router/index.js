import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/login/index.vue";
import Sklad from "../views/deshbord/index.vue";
import Agents from "../views/agents/index.vue";
import SkladValfef from "../views/deshbordValfex/index.vue";
import SkladdRTP from "../views/deshbordRTP/index.vue";
import MenuPage from "@/views/menu/index.vue";
import Profil from "@/views/profil/index.vue";
import Sale from "@/views/sale/index.vue";
import ScladAdir from "@/views/sklad-adir/index.vue"
import ErrorPage from "../views/error/index.vue";

// ✅ Mobil uchun: ilova background/yopilganda sessionStorage tozalansin
// visibilitychange - tab yashirilganda (mobilda background)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    sessionStorage.removeItem("userRole");
  }
});

// pagehide - sahifa yopilganda yoki navigatsiya chiqganda (mobilda ishonchli)
window.addEventListener("pagehide", () => {
  sessionStorage.removeItem("userRole");
});

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
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/sklad",
    name: "Skald",
    component: Sklad,
    meta: { requiresAuth: true, roles: ["admin", "manager", "agent"] },
    children: [
      {
        path: "",
        name: "SkladRTP",
        component: SkladdRTP,
        meta: { requiresAuth: true, roles: ["admin", "manager", "agent"] },
      },
      {
        path: "valfex",
        name: "SkladValfef",
        component: SkladValfef,
        meta: { requiresAuth: true, roles: ["admin", "manager", "agent"] },
      },
    ],
  },
  {
    path: "/agents",
    name: "Agents",
    component: Agents,
    meta: { requiresAuth: true, roles: ["admin", "manager"] },
  },
  {
    path: "/sklad-adir",
    name: "Sklad-Adir",
    component: ScladAdir,
    meta: { requiresAuth: true, roles: ["admin", "manager"] },
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
  // ✅ localStorage emas, sessionStorage ishlatiladi
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!userRole;

  // 1. Login sahifasiga har doim kirish mumkin (redirect yo'q)
  if (to.name === "Login") {
    return next();
  }

  // 2. requiresAuth yo'q sahifalar uchun
  if (!to.meta.requiresAuth) {
    return next();
  }

  // 3. Login qilmagan bo'lsa → Login ga redirect
  if (!isAuthenticated) {
    return next({ name: "Login" });
  }

  // 4. Rol cheklovi tekshirish
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return next({ name: "Menu" });
  }

  // 5. Hammasi OK
  next();
});

export default router;