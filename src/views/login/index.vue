<template>
  <div class="login-page">
    <div class="login-page--card">
      <!-- Login form -->
      <h1 class="login-page--card--title">Тизимга кириш</h1>
      <img :src="LoginImg" alt="Login Image" class="login-page--card--img" />
      <form @submit.prevent="handleLogin" class="login-page--card--form">
        <label for="login" class="login-page--card--form--label">
          <input type="text" placeholder="Логин" v-model="user.login" required />
          <img :src="User" alt="User icon" />
        </label>
        <label for="login" class="login-page--card--form--label">
          <input
            :type="isOpen ? 'password' : 'text'"
            placeholder="Пароль"
            v-model="user.password"
            required
          />
          <img @click="toggleOpen" :src="isOpen ? Open : Clos" alt=" icon" />
        </label>
        <button type="submit">Кириш</button>
      </form>
      <!-- <p class="forgot-password">Parolni unutdingizmi?</p>
    <p v-if="error" class="error">{{ error }}</p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import User from "../../assets/user.svg";
import Open from "../../assets/open.svg";
import Clos from "../../assets/clos.svg";
import LoginImg from "../../assets/login-image.png";


    const router = useRouter();

    const isOpen = ref(true);

    const user = reactive({
      login: "",
      password: "",
    });

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const handleLogin = () => {
  if (user.login.trim() && user.password.trim()) {

    if (user.login === "Muhammadaziz" && user.password === "571633") {
      toast.success("Кириш муваффақиятли!");
      console.log("User login: " + user.login + " User password: " + user.password);

      user.login = "";
      user.password = "";

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } else {
      toast.error("Login ёки пароль нотўғри!");
    }

  } else {
    toast.error("Илтимос, иккала майдонни ҳам тўлдиринг!");
  }
};

   
</script>
<style scoped lang="scss" src="./style.scss"></style>
