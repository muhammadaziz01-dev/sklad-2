<script setup>
import {
    allDataValfexAdir,
  productsCount,
  totalResidualValue,
} from "../../constants/data-rtp-adir/data-valfex-adir.js";
import InfoCard from "../../components/card/infoCard/index.vue";

const userRole = localStorage.getItem("userRole");


</script>

<template>
  <div class="wrapper">
    <h3 class="wrapper--title"><span>Valfex</span> продукты</h3>
    <InfoCard :count="productsCount" :total="totalResidualValue" />
    <div class="wrapper--parent-card">
      <div
        class="wrapper--parent-card--card"
        v-for="item in allDataValfexAdir"
        :key="item.id"
      >
        <img :src="item.img" alt="Truba PPR" class="wrapper--parent-card--card--img" />
        <div class="wrapper--parent-card--card--wrapper-title">
          <p>{{ item.name }}</p>
          <ul class="wrapper--parent-card--card--wrapper-title--property">
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                Бренд
              </div>
              <div
                class="wrapper--parent-card--card--wrapper-title--property__empty"
              ></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                {{ item.brand }}
              </div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                Количество
              </div>
              <div
                class="wrapper--parent-card--card--wrapper-title--property__empty"
              ></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                {{ item?.quantity }}
              </div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                Цена
              </div>
              <div
                class="wrapper--parent-card--card--wrapper-title--property__empty"
              ></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                {{ item?.price }} сом
              </div>
            </li>
            <li class="wrapper--parent-card--card--wrapper-title--property__item">
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                общий остаток
              </div>
              <div
                class="wrapper--parent-card--card--wrapper-title--property__empty"
              ></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                {{ item?.allResidual + " " + item?.unit }}
              </div>
            </li>
            <li
              class="wrapper--parent-card--card--wrapper-title--property__item"
              v-if="userRole !== 'agent'"
            >
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                Оставшаяся сумма
              </div>
              <div
                class="wrapper--parent-card--card--wrapper-title--property__empty"
              ></div>
              <div class="wrapper--parent-card--card--wrapper-title--property__text">
                {{ item?.residualValue }} сом
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &--title {
    text-align: center;
    padding-bottom: 20px;

    span {
      color: #D70000;
    }
  }

  &--parent-card {
    max-width: 410px;
    // background-color: #224386;
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 5px;
    margin: 0 auto;
    margin-top: 10px;

    &--card {
      display: flex;
      align-items: start;
      flex-direction: column;
      // border: 1px solid gray;
      padding: 0px 5px 15px 5px;
      border-radius: 10px;
      box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.2);

      &--img {
        width: 180px;
      }

      &--wrapper-title {
        p {
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          padding-bottom: 5px;
          color: #0e0f0f;
        }

        &--property {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        &--property__item {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 4px;
        }

        &--property__text {
          color: #0e0f0f;
          font-size: 10px;
          font-weight: 400;
        }

        &--property__empty {
          border-bottom: 1px dashed #0e0f0f;
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
