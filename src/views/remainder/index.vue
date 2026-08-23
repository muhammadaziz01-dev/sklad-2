<template>
  <Navbar :props="propsDate" />
  
  <div class="dashboard">

    <!-- Brend tanlanmagan holat -->
    <template v-if="!selectedBrand">
     <h3>Выберите бренд 👇</h3>
      <nav class="dashboard--navbar">
        <div class="dashboard--navbar__item" @click="selectBrand('RTP')">
          <img :src="RTP" alt="RTP logo" />
        </div>
        <div class="dashboard--navbar__item" @click="selectBrand('VALFEX')">
          <img :src="VALFEX" alt="Valfex logo" />
        </div>
      </nav>
    </template>

    <!-- Brend tanlangandan keyin — ostatka jadvali -->
    <template v-else>
      <div class="dashboard--table-wrap">
        <div class="dashboard--table-wrap__header">
          <button class="dashboard--table-wrap__back" @click="selectedBrand = null">
            ← Назад
          </button>
          <span class="dashboard--table-wrap__title">
            {{ selectedBrand === "RTP" ? "RTP Rostirplast" : "Valfex" }}
          </span>
          <span class="dashboard--table-wrap__date">{{ today }}</span>
        </div>

        <div class="dashboard--table">
          <div class="dashboard--table__head">
            <span>#</span>
            <span class="left">Номенклатура</span>
            <span>Кол.</span>
            <span>Цена</span>
            <span>Сумма</span>
          </div>

          <template v-for="[catName, catItems] in groupedItems" :key="catName">
            <div class="dashboard--table__cat">{{ catName }}</div>
            <div
              v-for="(product, idx) in catItems"
              :key="product.id"
              class="dashboard--table__row"
              :class="{ even: idx % 2 === 1 }"
            >
              <span>{{ idx + 1 }}</span>
              <span class="left">{{ product.name }}</span>
              <span>{{ fmt(product.allResidual) }} {{ product.unit }}</span>
              <span>{{ fmt(product.price) }}</span>
              <span class="sum">{{ fmt(rowSum(product)) }}</span>
            </div>
          </template>
        </div>

        <div class="dashboard--totals">
          <div class="dashboard--totals__row">
            <span>Общая позиция:</span>
            <span>{{ totalCount }} типа</span>
          </div>
          <div class="dashboard--totals__row total">
            <span>Общая сумма:</span>
            <span>{{ fmt(totalSum) }} сом</span>
          </div>
        </div>

        <button class="dashboard--word-btn" :disabled="loadingWord" @click="downloadWord">
          {{ loadingWord ? "Загрузка..." : "📄 Скачать в формате Word" }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RTP from "../../assets/rtp-logo.png";
import VALFEX from "../../assets/valfex-logo.png";
import Navbar from "@/components/header/index.vue";
import { dataValfex } from "../../constants/data-adir/data-valfex-adir.js";
import { dataRTPAdir } from "../../constants/data-adir/index.js";
import { generateOstatkaWord } from "@/utils/useOstatkaGenerator.js";

const propsDate = {
  title: "Остаток",
  ruot: "/menu",
};

// ── Brand tanlash ────────────────────────────────────────────
const selectedBrand = ref(null); // null | "RTP" | "VALFEX"

function selectBrand(key) {
  selectedBrand.value = key;
}

const brandData = computed(() => {
  if (selectedBrand.value === "RTP") return dataRTPAdir;
  if (selectedBrand.value === "VALFEX") return dataValfex;
  return [];
});

// faqat qoldig'i bor tovarlar
const items = computed(() => brandData.value.filter((p) => (p.allResidual || 0) > 0));

// kategoriya bo'yicha guruhlash
const groupedItems = computed(() => {
  const groups = {};
  items.value.forEach((product) => {
    const cat = product.categoryName || product.category || "Бошқа";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(product);
  });
  return Object.entries(groups);
});

const fmt = (val) => (val || 0).toLocaleString("ru-RU");
const rowSum = (product) => (product.allResidual || 0) * (product.price || 0);

const totalSum = computed(() => items.value.reduce((acc, p) => acc + rowSum(p), 0));
const totalCount = computed(() => items.value.length);

const today = new Date().toLocaleDateString("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// ── Word generatsiya ────────────────────────────────────────
const loadingWord = ref(false);

async function downloadWord() {
  loadingWord.value = true;
  try {
    await generateOstatkaWord({
      brandName: selectedBrand.value === "RTP" ? "RTP Rostirplast" : "Valfex",
      date: today,
      groupedItems: groupedItems.value,
      totalSum: totalSum.value,
      totalCount: totalCount.value,
    });
  } catch (e) {
    console.error(e);
    alert("Хато юз берди");
  } finally {
    loadingWord.value = false;
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
