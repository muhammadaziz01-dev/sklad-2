<template>
     <Navbar :props="propsDate"/>
    <div class="wrapper-cards" v-for="el in dataAgents" :key="el?.id">
     <AgentCard :agent="el" />

    </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue"
import AgentCard from "../../components/card/agent/index.vue"
import {dataAgents} from "../../constants/agents/index.js"
const propsDate = {
  title :"Агенты",
  ruot: "/menu",
  link: "/agents"
}
</script>

<style lang="scss" scoped src="./style.scss">

</style>