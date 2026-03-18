<template>
  <div class="wrapper">
    <Navbar  :props="propsDate"/>

    <!-- Faqat admin uchun -->
    <div class="wrapper--menu" v-if="userRole === 'admin'" >
      <div class="wrapper--menu--card" @click="pushRouter(`/sklad`)">
        <img :src="Sklad" alt="sclad icon" />
        <p>Склад</p>
      </div>

      <div class="wrapper--menu--card" @click="pushRouter(`/agents`)">
        <img :src="AgentsImg" alt="agents icon" />
        <p>Агенты</p>
      </div>
      <div class="wrapper--menu--card">
        <img :src="Settings" alt="settings icon" />
        <p>Настройка</p>
      </div>
    </div>
    
     <!-- Faqat manager uchun -->
    <div class="wrapper--menu" v-if="userRole === 'manager'" >
      <div class="wrapper--menu--card" @click="pushRouter(`/sklad`)">
        <img :src="Sklad" alt="sclad icon" />
        <p>Склад</p>
      </div>

      <div class="wrapper--menu--card" @click="pushRouter(`/agents`)">
        <img :src="AgentsImg" alt="agents icon" />
        <p>Агенты</p>
      </div>
    </div>

     <!-- Faqat agent uchun -->
     <div class="wrapper--menu" v-if="userRole === 'agent'" >
      <div class="wrapper--menu--card" @click="pushRouter(`/sklad`)">
        <img :src="Sklad" alt="sclad icon" />
        <p>Склад</p>
      </div>

      <div class="wrapper--menu--card" @click="pushRouter(`/agents`)">
        <img :src="AgentsImg" alt="agents icon" />
        <p>Профил</p>
      </div>
    </div>

    <!-- MUHIM QISM -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue"
import Sklad from "../../assets/sclad.png"
import AgentsImg from "../../assets/users.svg"
import Settings from "../../assets/gear.svg"
import { useRouter } from "vue-router"
import { ref } from "vue";
const propsDate = {
  title :"Меню",
  ruot: "/",
}

const router = useRouter()
const userRole = ref(localStorage.getItem("userRole") || "");

const pushRouter = (link) => {
  router.push(link)
}

</script>

<style lang="scss" scoped src="./style.scss"></style>