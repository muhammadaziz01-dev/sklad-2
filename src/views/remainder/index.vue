<template>
  <Navbar :props="propsDate" />
  <div class="dashboard">
    <nav class="dashboard--navbar">
      <img :src="RTP" alt="RTP logo" />
      <img :src="VALFEX" alt="Valfex logo" />
    </nav>
  </div>
</template>

<script setup>
import RTP from "../../assets/rtp-logo.png";
import VALFEX from "../../assets/valfex-logo.png";
import Navbar from "@/components/header/index.vue";
import { allDataValfexAdir } from "../../constants/data-adir/data-valfex-adir.js";
import { allDataRTPAdir } from "../../constants/data-adir/index.js";

const propsDate = {
  title: "Остаток",
  ruot: "/menu",
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
