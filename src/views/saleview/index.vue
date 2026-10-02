<script setup>
import { useSotuvWizardStore } from "@/stores/useSotuvWizardStore.js";
import Step1AgentClient from "@/components/steps/Step1AgentClient.vue";
import Step2ProductSelect from "@/components/steps/step2ProductSelect.vue";
import Step3Nakladnoy from "@/components/steps/step3Nakladnoy.vue";

const store = useSotuvWizardStore();
</script>

<template>
  <div class="prodaja">
    <!-- Qadamlar indikatori -->
    <div class="prodaja__steps">
      <div
        v-for="n in 3"
        :key="n"
        class="prodaja__steps__item"
        :class="{ active: store.step === n, done: store.step > n }"
      >
        <span class="prodaja__steps__item__circle">{{ n }}</span>
      </div>
    </div>

    <Step1AgentClient v-if="store.step === 1" />
    <Step2ProductSelect v-else-if="store.step === 2" />
    <Step3Nakladnoy v-else-if="store.step === 3" />
  </div>
</template>

<style scoped lang="scss">
.prodaja {
  min-height: 100vh;
  background: #f7f8fa;

  &__steps {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 14px 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

    &__item {
      display: flex;
      align-items: center;

      &__circle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        background: #eee;
        color: #999;
      }

      &.active &__circle {
        background: #224386;
        color: #fff;
      }

      &.done &__circle {
        background: #52c41a;
        color: #fff;
      }
    }
  }
}
</style>