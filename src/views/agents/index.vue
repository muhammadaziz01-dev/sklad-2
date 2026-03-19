<template>
     <Navbar :props="propsDate"/>
     <ChartAgents :agents="dataAgents" />
    <div class="wrapper-cards" v-for="el in dataAgents" :key="el?.id">
     <AgentCard :agent="el" />

    </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue"
import AgentCard from "../../components/card/agent/index.vue"
import {dataAgents} from "../../constants/agents/index.js"
import ChartAgents from "@/components/chart/index.vue"
const propsDate = {
  title :"Агенты",
  ruot: "/menu",
  link: "/agents"
}
</script>

<style lang="scss" scoped src="./style.scss">

</style>