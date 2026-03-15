<template>
     <Navbar :props="propsDate"/>
    <div class="wrapper-cards">
     <AgentCard/>
     <AgentCard/>
     <AgentCard/>
     <AgentCard/>

    </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue"
import AgentCard from "../../components/card/agent/index.vue"
const propsDate = {
  title :"Агенты",
  ruot: "/menu",
  link: "/agents"
}

</script>

<style lang="scss" scoped src="./style.scss">

</style>