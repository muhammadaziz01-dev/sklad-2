<script setup>
import { computed } from "vue";
import { useSotuvWizardStore } from "@/stores/useSotuvWizardStore.js";
import { UserOutlined } from "@ant-design/icons-vue";

const store = useSotuvWizardStore();

const getRoleColor = (rol) => {
  const colors = { admin: "red", manager: "orange", agent: "blue" };
  return colors[rol] || "default";
};

const filterAgent = (input, option) => {
  const agent = store.agents.find((a) => a.id === option.value);
  if (!agent) return false;
  return agent.fulName.toLowerCase().includes(input.toLowerCase());
};

const canContinue = computed(() => store.selectedAgent && store.clientName);
</script>

<template>
  <div class="step1">
    <h3 class="step1__title">Агент ва Клиент</h3>

    <!-- Agent tanlash -->
    <div class="step1__block">
      <label class="step1__label">Агент</label>
      <a-select
        v-model:value="store.selectedAgent"
        placeholder="Агентни танланг..."
        style="width: 100%"
        size="large"
        show-search
        :filter-option="filterAgent"
        option-filter-prop="label"
      >
        <a-select-option
          v-for="agent in store.agents"
          :key="agent.id"
          :value="agent.id"
          :label="agent.fulName"
        >
          <div class="agent-option">
            <span>{{ agent.fulName }}</span>
            <a-tag :color="getRoleColor(agent.rol)">{{ agent.rol }}</a-tag>
          </div>
        </a-select-option>
      </a-select>

      <!-- Tanlangan agent kartasi -->
      <div v-if="store.selectedAgent" class="agent-card">
        <div
          v-for="agent in store.agents.filter((a) => a.id === store.selectedAgent)"
          :key="agent.id"
          class="agent-card__row"
        >
          <a-avatar :src="agent.img" :size="42" />
          <div class="agent-card__info">
            <p class="agent-card__info__name">{{ agent.fulName }}</p>
            <p class="agent-card__info__region">📍 {{ agent.region }}</p>
          </div>
          <a-tag :color="getRoleColor(agent.rol)">{{ agent.rol }}</a-tag>
        </div>
      </div>
    </div>

    <!-- Klient ismi va kommentariya -->
    <div class="step1__block">
      <label class="step1__label">Клиент исми</label>
      <a-input
        v-model:value="store.clientName"
        placeholder="Клиент исми, манзили..."
        size="large"
        allow-clear
      >
        <template #prefix><UserOutlined /></template>
      </a-input>
    </div>

    <div class="step1__block">
      <label class="step1__label">Комментарий</label>
      <a-textarea
        v-model:value="store.comment"
        placeholder="Манзил, телефон рақами ва ҳ.к..."
        :rows="3"
        allow-clear
      />
    </div>

    <a-button
      type="primary"
      block
      size="large"
      class="step1__next"
      :disabled="!canContinue"
      @click="store.goToStep2()"
    >
      Давом этиш →
    </a-button>
  </div>
</template>

<style scoped lang="scss">
.step1 {
  padding: 12px 12px 24px;

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #224386;
    margin-bottom: 14px;
    text-align: center;
  }

  &__block {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    font-size: 12px;
    color: #888;
    margin-bottom: 6px;
    font-weight: 500;
  }

  &__next {
    background: #224386;
    border-color: #224386;
    border-radius: 10px;
    height: 46px;
    font-weight: 600;
    margin-top: 8px;
  }
}

.agent-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.agent-card {
  margin-top: 10px;
  background: #f0f5ff;
  border-radius: 10px;
  padding: 10px 12px;

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__info {
    flex: 1;
    min-width: 0;

    &__name {
      font-size: 13px;
      font-weight: 600;
      color: #224386;
      margin: 0;
    }
    &__region {
      font-size: 11px;
      color: #888;
      margin: 0;
    }
  }
}
</style>
