<template>
  <div class="wrapper">
    <Navbar  :props="propsDate"/>

    <div class="wrapper--menu">
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
const propsDate = {
  title :"Меню",
  ruot: "/",
}

const router = useRouter()

const pushRouter = (link) => {
  router.push(link)
}

</script>

<style lang="scss" scoped src="./style.scss"></style>