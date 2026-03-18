<template>
     <Navbar :props="propsDate"/>
    <div class="wrapper-cards" v-for="el in dataAgents">
     <AgentCard :agent="el" :key="el?.id" />

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