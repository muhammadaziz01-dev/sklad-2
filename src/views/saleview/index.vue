<template>
  <div class="sotuv-container">
    <!-- HEADER: Sana va Nakladnoy raqami -->
    <a-card class="header-card">
      <a-row :gutter="16" align="middle">
        <a-col :xs="24" :sm="8">
          <div class="nakladnoy-number">
            <span class="label">Накладная №</span>
            <span class="number">{{ store.formattedNumber }}</span>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8" style="text-align: center">
          <div class="nakladnoy-date">
            <span class="label">Дата:</span>
            <a-date-picker
              v-model:value="selectedDate"
              format="DD.MM.YYYY"
              :allow-clear="false"
              style="width: 160px; margin-left: 8px"
            />
          </div>
        </a-col>
        <a-col :xs="24" :sm="8" style="text-align: right">
          <a-tag color="blue" style="font-size: 14px; padding: 4px 12px">
            Склад — Соtuv
          </a-tag>
        </a-col>
      </a-row>
    </a-card>

    <a-row :gutter="[16, 16]" style="margin-top: 16px">
      <!-- CHAP PANEL -->
      <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="15">
        <!-- Agent tanlash -->
        <a-card title="Агент" class="section-card">
          <a-select
            v-model:value="store.selectedAgent"
            placeholder="Агентни танланг..."
            style="width: 100%"
            show-search
            :filter-option="filterAgent"
            option-filter-prop="label"
            @change="onAgentChange"
          >
            <a-select-option
              v-for="agent in store.agents"
              :key="agent.id"
              :value="agent.id"
              :label="agent.fulName"
            >
              <div class="agent-option">
                <span class="agent-name">{{ agent.fulName }}</span>
                <a-tag :color="getRoleColor(agent.rol)" style="margin-left: 8px">
                  {{ agent.rol }}
                </a-tag>
                <span class="agent-region">{{ agent.region }}</span>
              </div>
            </a-select-option>
          </a-select>

          <!-- Tanlangan agent ma'lumoti -->
          <div v-if="selectedAgentData" class="agent-info">
            <a-descriptions :column="2" size="small" bordered>
              <a-descriptions-item label="Исм">
                {{ selectedAgentData.fulName }}
              </a-descriptions-item>
              <a-descriptions-item label="Телефон">
                {{ selectedAgentData.phone }}
              </a-descriptions-item>
              <a-descriptions-item label="Регион">
                {{ selectedAgentData.region }}
              </a-descriptions-item>
              <a-descriptions-item label="Роль">
                <a-tag :color="getRoleColor(selectedAgentData.rol)">
                  {{ selectedAgentData.rol }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-card>

        <!-- Mijoz nomi va kommentariya -->
        <a-card
          title="Клиент ва Комментарий"
          class="section-card"
          style="margin-top: 16px"
        >
          <a-form layout="vertical">
            <a-form-item label="Клиент исми">
              <a-input
                v-model:value="store.clientName"
                placeholder="Клиент исмини киритинг..."
                size="large"
                allow-clear
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="Комментарий">
              <a-textarea
                v-model:value="store.comment"
                placeholder="Қўшимча изоҳ..."
                :rows="3"
                allow-clear
              />
            </a-form-item>
          </a-form>
        </a-card>

        <!-- Mahsulot qidirish va qo'shish -->
        <a-card title="Маҳсулот қўшиш" class="section-card" style="margin-top: 16px">
          <!-- Brand filter -->
          <a-radio-group v-model:value="brandFilter" style="margin-bottom: 12px">
            <a-radio-button value="all">Барчаси</a-radio-button>
            <a-radio-button value="RTP">RTP</a-radio-button>
            <a-radio-button value="Valfex">Valfex</a-radio-button>
          </a-radio-group>

          <!-- Qidiruv -->
          <a-input
            v-model:value="searchQuery"
            placeholder="Маҳсулот номи бўйича қидириш..."
            allow-clear
            style="margin-bottom: 12px"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>

          <!-- Mahsulotlar jadval -->
          <a-table
            :data-source="filteredProducts"
            :columns="productColumns"
            :pagination="{ pageSize: 10, size: 'small' }"
            size="small"
            row-key="id"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <span style="font-size: 12px">{{ record.name }}</span>
              </template>
              <template v-if="column.key === 'quantity'">
                <a-tag color="purple">{{ record.quantity }}</a-tag>
              </template>
              <template v-if="column.key === 'price'">
                <a-tag color="green">{{ record.price }} сом</a-tag>
              </template>
              <template v-if="column.key === 'allResidual'">
                <a-tag :color="record.allResidual > 0 ? 'blue' : 'red'">
                  {{ record.allResidual }} {{ record.unit }}
                </a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <div class="add-action">
                  <a-input-number
                    v-model:value="qtyInputs[record.id]"
                    :min="1"
                    :max="record.allResidual"
                    size="small"
                    style="width: 70px"
                    :default-value="1"
                  />
                  <a-button
                    type="primary"
                    size="small"
                    style="margin-left: 6px"
                    @click="addProduct(record)"
                  >
                    <PlusOutlined />
                  </a-button>
                </div>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <!-- O'NG PANEL — SAVAT -->
      <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="9">
        <a-card class="cart-card">
          <template #title>
            <ShoppingCartOutlined /> Сават
            <a-badge :count="store.cart.length" style="margin-left: 8px" />
          </template>

          <!-- Savat bo'sh -->
          <a-empty
            v-if="store.isCartEmpty"
            description="Сават бўш"
            style="padding: 20px 0"
          />

          <!-- Savat mahsulotlari -->
          <div v-else>
            <div v-for="item in store.cart" :key="item.id" class="cart-item">
              <div class="cart-item-name">{{ item.name }}</div>
              <div class="cart-item-controls">
                <a-input-number
                  :value="item.quantity"
                  :min="1"
                  :max="item.allResidual"
                  size="small"
                  style="width: 70px"
                  @change="(val) => store.updateQuantity(item.id, val)"
                />
                <span class="cart-item-price">
                  {{ (item.price * item.quantity).toLocaleString() }} сом
                </span>
                <a-button
                  type="text"
                  danger
                  size="small"
                  @click="store.removeFromCart(item.id)"
                >
                  <DeleteOutlined />
                </a-button>
              </div>
            </div>

            <a-divider />

            <!-- Jami -->
            <div class="total-row">
              <span class="total-label">Жами:</span>
              <span class="total-value"> {{ store.totalSum.toLocaleString() }} сом </span>
            </div>

            <a-divider />

            <!-- Tugmalar -->
            <a-space direction="vertical" style="width: 100%">
              <a-button
                type="primary"
                block
                size="large"
                :disabled="!canGenerate"
                @click="generateNakladnoy"
              >
                <FileWordOutlined /> Накладной тайёрлаш
              </a-button>
              <a-button
                block
                danger
                :disabled="store.isCartEmpty"
                @click="store.resetForm"
              >
                <ClearOutlined /> Тозалаш
              </a-button>
            </a-space>

            <!-- Validation xabarlar -->
            <div v-if="!canGenerate" style="margin-top: 12px">
              <a-alert
                v-if="!store.selectedAgent"
                message="Агентни танланг"
                type="warning"
                show-icon
                style="margin-bottom: 6px"
              />
              <a-alert
                v-if="!store.clientName"
                message="Клиент исмини киритинг"
                type="warning"
                show-icon
                style="margin-bottom: 6px"
              />
              <a-alert
                v-if="store.isCartEmpty"
                message="Саватга маҳсулот қўшинг"
                type="warning"
                show-icon
              />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import dayjs from "dayjs";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  FileWordOutlined,
  ClearOutlined,
} from "@ant-design/icons-vue";
import { useSotuvStore } from "@/stores/saleStore.js";
import { generateNakladnoyWord } from "@/utils/nakladnoyGenerator";

const store = useSotuvStore();

// Sana
const selectedDate = ref(dayjs());

// Qidiruv va filter
const searchQuery = ref("");
const brandFilter = ref("all");

// Har bir mahsulot uchun miqdor input
const qtyInputs = reactive({});

// Tanlangan agent ma'lumoti
const selectedAgentData = computed(() => {
  if (!store.selectedAgent) return null;
  return store.agents.find((a) => a.id === store.selectedAgent);
});

// Filtr qilingan mahsulotlar
const filteredProducts = computed(() => {
  return store.allProducts.filter((p) => {
    const matchBrand = brandFilter.value === "all" || p.brand === brandFilter.value;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchBrand && matchSearch;
  });
});

// Jadval ustunlari
const productColumns = [
  {
    title: "Номи",
    key: "name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Фасовка",
    key: "quantity",
    dataIndex: "quantity",
    width: 100,
  },
  {
    title: "Нарх",
    key: "price",
    dataIndex: "price",
    width: 90,
  },
  {
    title: "Қолдиқ",
    key: "allResidual",
    dataIndex: "allResidual",
    width: 90,
  },
  {
    title: "",
    key: "action",
    width: 120,
  },
];

// Nakladnoy generatsiya qilish mumkinmi
const canGenerate = computed(() => {
  return store.selectedAgent && store.clientName && !store.isCartEmpty;
});

// Agent filter (qidiruv uchun)
const filterAgent = (input, option) => {
  const agent = store.agents.find((a) => a.id === option.value);
  if (!agent) return false;
  return agent.fulName.toLowerCase().includes(input.toLowerCase());
};

// Agent o'zgarganda
const onAgentChange = () => {};

// Rol rangi
const getRoleColor = (rol) => {
  const colors = {
    admin: "red",
    manager: "orange",
    agent: "blue",
  };
  return colors[rol] || "default";
};

// Mahsulot savatga qo'shish
const addProduct = (product) => {
  const qty = qtyInputs[product.id] || 1;
  store.addToCart(product, qty);
  qtyInputs[product.id] = 1;
};

// Nakladnoy generatsiya
const generateNakladnoy = async () => {
  const date = selectedDate.value
    ? selectedDate.value.format("DD.MM.YYYY")
    : store.currentDate;

  await generateNakladnoyWord({
    number: store.formattedNumber,
    date,
    agent: selectedAgentData.value,
    clientName: store.clientName,
    comment: store.comment,
    cart: store.cart,
    totalSum: store.totalSum,
  });

  store.incrementNakladnoyNumber();
  store.resetForm();
};
</script>

<style scoped>
.sotuv-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header-card {
  background: linear-gradient(135deg, #1890ff11, #ffffff);
  border: 1px solid #1890ff33;
}

.nakladnoy-number {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nakladnoy-number .label,
.nakladnoy-date .label {
  font-size: 14px;
  color: #888;
}

.nakladnoy-number .number {
  font-size: 22px;
  font-weight: 700;
  color: #1890ff;
  letter-spacing: 2px;
}

.nakladnoy-date {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-card {
  border-radius: 8px;
}

.agent-option {
  display: flex;
  align-items: center;
}

.agent-region {
  font-size: 11px;
  color: #aaa;
  margin-left: auto;
}

.agent-info {
  margin-top: 12px;
}

.add-action {
  display: flex;
  align-items: center;
}

.cart-card {
  border-radius: 8px;
  min-height: 300px;
}

@media (min-width: 992px) {
  .cart-card {
    position: sticky;
    top: 16px;
  }
}

.cart-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item-name {
  font-size: 12px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.4;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-item-price {
  flex: 1;
  text-align: right;
  font-weight: 600;
  color: #1890ff;
  font-size: 13px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 16px;
  font-weight: 600;
}

.total-value {
  font-size: 20px;
  font-weight: 700;
  color: #52c41a;
}
</style>
