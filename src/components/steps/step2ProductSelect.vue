<script setup>
import { computed } from "vue";
import { useSotuvWizardStore } from "@/stores/useSotuvWizardStore.js";
import { SearchOutlined } from "@ant-design/icons-vue";

const store = useSotuvWizardStore();

const brands = [
  { label: "Барча", value: "all" },
  { label: "RTP", value: "RTP" },
  { label: "VALFEX", value: "VALFEX" },
];

const isValfexBrand = (b) => ["VALFEX", "VALFEX PRO", "CALDO"].includes(b);

const categories = computed(() => {
  const source =
    store.selectedBrand === "all"
      ? store.allProducts
      : store.allProducts.filter((p) =>
          store.selectedBrand === "VALFEX"
            ? isValfexBrand(p.brand)
            : p.brand === store.selectedBrand
        );
  const map = new Map();
  source.forEach((item) => {
    if (!map.has(item.category))
      map.set(item.category, {
        label: item.categoryName || item.category,
        value: item.category,
      });
  });
  return [{ label: "Барча", value: "all" }, ...Array.from(map.values())];
});

const filteredProducts = computed(() => {
  let r = store.allProducts;
  if (store.selectedBrand !== "all")
    r =
      store.selectedBrand === "VALFEX"
        ? r.filter((p) => isValfexBrand(p.brand))
        : r.filter((p) => p.brand === store.selectedBrand);
  if (store.selectedCategory !== "all")
    r = r.filter((p) => p.category === store.selectedCategory);
  if (store.searchQuery)
    r = r.filter((p) => p.name.toLowerCase().includes(store.searchQuery.toLowerCase()));
  return r;
});

const getQty = (id) => store.getQty(id);
const onInput = (product, e) => store.setQty(product, parseInt(e.target.value) || 0);
</script>

<template>
  <div class="step2">
    <!-- Qidiruv -->
    <a-input
      v-model:value="store.searchQuery"
      placeholder="Маҳсулот қидириш..."
      allow-clear
      size="large"
      class="step2__search"
    >
      <template #prefix><SearchOutlined /></template>
    </a-input>

    <!-- Brend filtri -->
    <div class="step2__brands">
      <div
        v-for="b in brands"
        :key="b.value"
        class="step2__brands__btn"
        :class="{ active: store.selectedBrand === b.value }"
        @click="store.setBrand(b.value)"
      >
        {{ b.label }}
      </div>
    </div>

    <!-- Kategoriya filtri -->
    <div class="step2__cats">
      <div
        v-for="cat in categories"
        :key="cat.value"
        class="step2__cats__item"
        :class="{ active: store.selectedCategory === cat.value }"
        @click="store.setCategory(cat.value)"
      >
        {{ cat.label }}
      </div>
    </div>

    <!-- Mahsulotlar grid -->
    <div class="step2__grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id + '_' + product.brand"
        class="step2__grid__card"
        :class="{ selected: getQty(product.id) > 0 }"
      >
        <div class="step2__grid__card__img-wrap">
          <img :src="product.img" :alt="product.name" class="step2__grid__card__img" />
          <div v-if="getQty(product.id) > 0" class="step2__grid__card__badge">
            {{ getQty(product.id) }} {{ product.unit }}
          </div>
        </div>
        <p class="step2__grid__card__name">{{ product.name }}</p>
        <div class="step2__grid__card__price-row">
          <span class="step2__grid__card__brand-tag">{{ product.brand }}</span>
          <span class="step2__grid__card__price"
            >{{ product.price }} сом/{{ product.unit }}</span
          >
        </div>
        <div class="step2__grid__card__qty">
          <button
            class="step2__grid__card__qty__btn minus"
            @click="store.decrement(product)"
          >
            −
          </button>
          <input
            class="step2__grid__card__qty__input"
            type="number"
            min="0"
            :value="getQty(product.id)"
            @change="onInput(product, $event)"
          />
          <button
            class="step2__grid__card__qty__btn plus"
            @click="store.increment(product)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Pastki panel -->
    <div v-if="!store.isEmpty" class="step2__footer">
      <div class="step2__footer__info">
        <span>{{ store.totalItems }} тур маҳсулот</span>
        <span class="step2__footer__info__total"
          >{{ store.totalAmount.toLocaleString("ru-RU") }} сом</span
        >
      </div>
      <a-button type="primary" class="step2__footer__btn" @click="store.nextStep()">
        Накладной →
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step2 {
  padding: 10px 10px 90px;

  &__search {
    margin-bottom: 10px;
    border-radius: 10px;
  }

  &__brands {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;

    &__btn {
      flex: 1;
      text-align: center;
      padding: 7px 0;
      border-radius: 8px;
      border: 1.5px solid #d0d0d0;
      font-size: 13px;
      font-weight: 500;
      color: #555;
      cursor: pointer;

      &.active {
        border-color: #224386;
        background: #224386;
        color: #fff;
      }
    }
  }

  &__cats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    margin-bottom: 14px;

    &__item {
      text-align: center;
      padding: 5px 4px;
      border-radius: 6px;
      border: 1px solid #ddd;
      font-size: 10px;
      color: #555;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.active {
        background: #224386;
        color: #fff;
        border-color: #224386;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    &__card {
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      padding: 10px 8px 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background: #fff;
      position: relative;

      &.selected {
        box-shadow: 0 3px 12px rgba(34, 67, 134, 0.25);
        border: 1.5px solid #224386;
      }

      &__img-wrap {
        width: 100%;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 6px;
        position: relative;
      }

      &__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      &__badge {
        position: absolute;
        top: 4px;
        right: 4px;
        background: #224386;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 10px;
      }

      &__name {
        font-size: 10px;
        font-weight: 500;
        color: #1a1a2e;
        text-align: center;
        margin: 0 0 6px;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &__price-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      &__brand-tag {
        font-size: 9px;
        background: #e8f0fe;
        color: #224386;
        padding: 1px 5px;
        border-radius: 4px;
        font-weight: 600;
      }

      &__price {
        font-size: 11px;
        font-weight: 700;
        color: #224386;
      }

      &__qty {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;

        &__btn {
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &.minus {
            background: #f5f5f5;
            color: #333;
          }
          &.plus {
            background: #224386;
            color: #fff;
          }
          &:active {
            opacity: 0.8;
          }
        }

        &__input {
          width: 38px;
          height: 28px;
          text-align: center;
          border: 1.5px solid #d0d0d0;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          outline: none;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
          &:focus {
            border-color: #224386;
          }
        }
      }
    }
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 12px 16px;
    box-shadow: 0 -3px 12px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;

    &__info {
      display: flex;
      flex-direction: column;
      span {
        font-size: 12px;
        color: #888;
      }
      &__total {
        font-size: 15px !important;
        font-weight: 700;
        color: #224386 !important;
      }
    }

    &__btn {
      background: #224386;
      border-color: #224386;
      border-radius: 10px;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
