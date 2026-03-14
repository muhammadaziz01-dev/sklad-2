<template>
     <Navbar :props="propsDate"/>
    <div>

    </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue"
const propsDate = {
  title :"Агенты",
  ruot: "/menu",
  link: "/agents"
}

</script>

<style lang="scss" scoped src="./style.scss">

</style>