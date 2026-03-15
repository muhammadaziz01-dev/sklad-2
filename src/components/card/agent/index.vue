<template>
  <div class="agent-card">
    <img :src="AdminImg" alt="Agent imag" class="agent-card--img" />
    <div class="agent-card--info">
      <h3 class="agent-card--info--title">Мухаммадазиз</h3>
      <ul class="agent-card--info--property">
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Полное имя</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text">Акбаров Мухаммадазиз</div>
        </li>
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Номер телефона</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text"> <a href="tel:+996999142444">+996 999 142 444</a></div>
        </li>
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Регион ответственности</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text">Ош</div>
        </li>
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Объем продаж за месяц</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text">3 450 500 сом</div>
        </li>
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Собрано за месяц</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text">2 450 000 сом</div>
        </li>
        <li class="agent-card--info--property--item">
          <div class="agent-card--info--property--text">Общая задолженность</div>
          <div class="agent-card--info--property--empty"></div>
          <div class="agent-card--info--property--text">1 500 500 сом</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import AdminImg from "@/assets/agents/admin.jpg";
</script>

<style scoped lang="scss">
.agent-card {
  display: flex;
  flex-direction: column;
  gap: 100px;
  // background-color: rgba(246, 246, 246, 1);
  background-color: rgb(217, 217, 217);
  border-radius: 15px;
  position: relative;
  width: 100%;
  padding: 10px 10px 20px 10px;
  margin-top: 60px;


  &--img {
    width: 120px;
    height: 120px;
    border-radius: 5000px;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #ffff;
  }

  &--info {
    padding-top: 75px;

    &--title {
      text-align: center;
      padding-bottom: 20px;

    }

    &--property {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &--item {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 4px;
      }

      &--text {
        color: #0e0f0f;
        font-size: 16px;
        font-weight: 400;
      }

      &--empty {
        border-bottom: 1px dashed #0e0f0f;
        flex: 1 1 auto;
      }
    }
  }
}
</style>
