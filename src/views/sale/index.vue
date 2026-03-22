<template>
  <Navbar :props="propsDate" />
  <div class="">
     <Saleview/>
  </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue";
import Saleview from "@/views/saleview/index.vue"

const propsDate = {
  title: "Продажа",
  ruot: "/menu",
};


</script>

<style lang="scss" scoped>
.wrapper-cards {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  margin: 0 auto;
  padding: 0 5px;
}
</style>
