<template>
  <div class="dashboard">
    <div class="dashboard--info-card">
      <div class="dashboard--info-card--title">
        <p>Складская стоимость</p>
        <img :src="Sclad" alt="Sclad icon" class="dashboard--info-card--title--img"  >
      </div>
      <div class="dashboard--info-card--statis">
        <div class="dashboard--info-card--statis--title">
          <h4><count-up :end-val="totalResidualValue + totalResidualValueValfex"></count-up> <span>сом</span></h4>
          <p><span><count-up :end-val="productsCount +productsCountValfex"></count-up></span> различных продукта </p>
        </div>
        <img :src="Diogram" alt="statistika icon">
      </div>
    </div>
    <nav class="dashboard--navbar" >
      <router-link to="/sklad">
        <img :src="RTP" alt="RTP logo">
      </router-link> 
      <router-link to="/sklad/valfex">
      <img :src="VALFEX" alt="Valfex logo">
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import RTP from "../../assets/rtp-logo.png";
import VALFEX from "../../assets/valfex-logo.png";
import Sclad from "../../assets/sclad.png";
import Diogram from "../../assets/diogram.svg"
import CountUp from 'vue-countup-v3'
import {productsCount , totalResidualValue} from "../../constants/rtp/index.js"
import {productsCountValfex , totalResidualValueValfex} from "../../constants/valfex/index.js"



</script>

<style scoped lang="scss" src="./style.scss"></style>