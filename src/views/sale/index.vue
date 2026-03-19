<template>
  <Navbar :props="propsDate" />
  <div class="wrapper-cards ">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam autem error aliquam,
      minima excepturi, id cumque at ullam temporibus qui accusantium iste voluptatum!
    </p>
  </div>
</template>

<script setup>
import Navbar from "../../components/header/index.vue";

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
