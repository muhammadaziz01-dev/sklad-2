<template>
    <div class="info-card">
      <div class="info-card--title">
        <p>Складская стоимость</p>
        <img :src="Sclad" alt="Sclad icon" class="info-card--title--img"  >
      </div>
      <div class="info-card--statis">
        <div class="info-card--statis--title">
          <h4><count-up :end-val="total"></count-up> <span>сом</span></h4>
          <p><span><count-up :end-val="count"></count-up></span> различных продукта </p>
        </div>
        <img :src="Diogram" alt="statistika icon">
      </div>
    </div>
</template>

<script setup>
import Sclad from "../../../assets/sclad.png";
import Diogram from "../../../assets/diogram.svg"
import CountUp from 'vue-countup-v3'
defineProps({
  count: Number,
  total: Number
})
</script>

<style lang="scss" scoped src="./style.scss">

</style>