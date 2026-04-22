<template>
    <Navbar :props="propsDate" />
    <div class="wrapper">
    <h3 class="wrapper--title"><span>Rosturplast</span> продукты</h3>
    <InfoCard 
    :count="productsCount"
    :total="totalResidualValue" />
    <div class="wrapper--parent-card">
      <div class="wrapper--parent-card--card" v-for="item in allDataRTP" :key="item.id">
        <img :src="item.img" alt="Truba PPR" class="wrapper--parent-card--card--img" />
        <div class="wrapper--parent-card--card--wrapper-title">
          <p>{{ item.name }}</p>
          <ul class="wrapper--parent-card--card--wrapper-title--property">
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">Бренд</div>
              <div class="wrapper--parent-card--card--wrapper-title--property__empty"></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">{{ item.brand }}</div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">Количество</div>
              <div class="wrapper--parent-card--card--wrapper-title--property__empty"></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">{{ item?.quantity}}</div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">Цена </div>
              <div class="wrapper--parent-card--card--wrapper-title--property__empty"></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">{{ item?.price }} сом</div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">общий остаток</div>
              <div class="wrapper--parent-card--card--wrapper-title--property__empty"></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">{{ item?.allResidual + " " + item?.unit }}</div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item" v-if="userRole !== 'agent'">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">Оставшаяся сумма </div>
              <div class="wrapper--parent-card--card--wrapper-title--property__empty"></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">{{ item?.residualValue }} сом</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Navbar from "../../components/header/index.vue";
import{ allDataRTP , productsCount , totalResidualValue} from "../../constants/rtp/index.js"
import InfoCard from "../../components/card/infoCard/index.vue"

const userRole = localStorage.getItem("userRole");

const propsDate = {
  title: "Склад адир",
  ruot: "/menu",
};
</script>

<style lang="scss" scoped src="./style.scss">

</style>