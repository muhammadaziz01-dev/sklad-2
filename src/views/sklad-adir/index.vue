<template>
    <Navbar :props="propsDate" />
    <div>
     <h1>Склад адир</h1>
    </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue";

const propsDate = {
  title: "Склад адир",
  ruot: "/menu",
};
</script>

<style lang="scss" scoped src="./style.scss">

</style>