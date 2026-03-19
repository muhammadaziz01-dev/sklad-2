<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard__header">
      <h2 class="dashboard__title">Результаты агента</h2>
      <p class="dashboard__subtitle">{{ agents.length }} агентов · {{ currentMonth }}</p>
    </div>

    <!-- Metric cards -->
    <div class="dashboard__metrics">
      <div class="metric-card">
        <span class="metric-card__label">Общий объем продаж</span>
        <span class="metric-card__value">{{ formatShort(totalSales) }}</span>
        <span class="metric-card__currency">сом</span>
      </div>
      <div class="metric-card metric-card--success">
        <span class="metric-card__label">Собрано</span>
        <span class="metric-card__value">{{ formatShort(totalCollected) }}</span>
        <span class="metric-card__currency">сом</span>
      </div>
      <div class="metric-card metric-card--danger">
        <span class="metric-card__label">Общий долг</span>
        <span class="metric-card__value">{{ formatShort(totalDebt) }}</span>
        <span class="metric-card__currency">сом</span>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="dashboard__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-btn', { 'tab-btn--active': activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Bar chart -->
    <div class="dashboard__chart-section">
      <p class="dashboard__chart-label">{{ activeTabLabel }}</p>
      <div class="chart-wrapper" :style="{ height: barChartHeight + 'px' }">
        <canvas ref="barCanvasRef"></canvas>
      </div>
    </div>

    <!-- Legend -->
    <div class="dashboard__legend">
      <span class="legend-item" v-for="item in legendItems" :key="item.label">
        <span class="legend-item__dot" :style="{ background: item.color }"></span>
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  agents: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// ─── State ───────────────────────────────────────────────
const activeTab = ref("all");
const barCanvasRef = ref(null);
let barChartInstance = null;

const tabs = [
  { key: "all", label: "Все" },
  { key: "monthlySales", label: "Торговля" },
  { key: "monthlyCollected", label: "Собрано" },
  { key: "totalDebt", label: "Долг" },
];

const legendItems = [
  { label: "Торговля", color: "#378ADD" },
  { label: "Собрано", color: "#1D9E75" },
  { label: "Долг", color: "#D85A30" },
];

// ─── Computed ─────────────────────────────────────────────
const currentMonth = computed(() => {
  return new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
});

const agentList = computed(() =>
  props.agents.filter((a) => a.rol === 'agent' || a.rol === 'manager' || a.rol === 'admin')
);

const totalSales = computed(() =>
  agentList.value.reduce((s, a) => s + (a.monthlySales || 0), 0)
);
const totalCollected = computed(() =>
  agentList.value.reduce((s, a) => s + (a.monthlyCollected || 0), 0)
);
const totalDebt = computed(() =>
  agentList.value.reduce((s, a) => s + (a.totalDebt || 0), 0)
);

const sortedAgents = computed(() =>
  [...agentList.value].sort((a, b) => b.monthlySales - a.monthlySales)
);

const activeTabLabel = computed(
  () => tabs.find((t) => t.key === activeTab.value)?.label || ""
);

const barChartHeight = computed(() => Math.max(agentList.value.length * 48 + 60, 200));

// ─── Helpers ──────────────────────────────────────────────
const formatShort = (v) => {
  if (!v) return "0";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + " M";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + " K";
  return v.toString();
};

const formatFull = (v) => (v || 0).toLocaleString("ru-RU") + " сом";

const efficiency = (agent) =>
  agent.monthlySales
    ? Math.round((agent.monthlyCollected / agent.monthlySales) * 100)
    : 0;

const efficiencyColor = (agent) => {
  const e = efficiency(agent);
  if (e >= 70) return "#1D9E75";
  if (e >= 60) return "#378ADD";
  return "#D85A30";
};

// ─── Charts ───────────────────────────────────────────────
const getBarDatasets = () => {
  if (activeTab.value === "all") {
    return [
      {
        label: "Торговля",
        data: agentList.value.map((a) => a.monthlySales || 0),
        backgroundColor: "#378ADD",
        borderRadius: 4,
        barPercentage: 0.5,
      },
      {
        label: "Собрано",
        data: agentList.value.map((a) => a.monthlyCollected || 0),
        backgroundColor: "#1D9E75",
        borderRadius: 4,
        barPercentage: 0.5,
      },
      {
        label: "Долг",
        data: agentList.value.map((a) => a.totalDebt || 0),
        backgroundColor: "#D85A30",
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ];
  }
  const colorMap = {
    monthlySales: "#378ADD",
    monthlyCollected: "#1D9E75",
    totalDebt: "#D85A30",
  };
  return [
    {
      label: activeTabLabel.value,
      data: agentList.value.map((a) => a[activeTab.value] || 0),
      backgroundColor: colorMap[activeTab.value],
      borderRadius: 4,
      barPercentage: 0.6,
    },
  ];
};

const buildBarChart = () => {
  if (barChartInstance) {
    barChartInstance.destroy();
    barChartInstance = null;
  }
  if (!barCanvasRef.value) return;
  barChartInstance = new Chart(barCanvasRef.value, {
    type: "bar",
    data: {
      labels: agentList.value.map((a) => a.name),
      datasets: getBarDatasets(),
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => " " + formatFull(ctx.raw) } },
      },
      scales: {
        x: {
          ticks: { callback: (v) => formatShort(v), font: { size: 11 } },
          grid: { color: "rgba(128,128,128,0.1)" },
        },
        y: {
          ticks: { font: { size: 12 } },
          grid: { display: false },
        },
      },
    },
  });
};

// ─── Watchers ─────────────────────────────────────────────
watch(activeTab, () => {
  if (!barChartInstance) return;
  barChartInstance.data.datasets = getBarDatasets();
  barChartInstance.update();
});

watch(
  () => props.agents,
  async () => {
    await nextTick();
    buildBarChart();
  },
  { deep: true }
);

// ─── Lifecycle ────────────────────────────────────────────
onMounted(async () => {
  await nextTick();
  buildBarChart();
});

onBeforeUnmount(() => {
  barChartInstance?.destroy();
});
</script>

<style scoped>
.dashboard {
  padding: 1rem;
  max-width: 640px;
  margin: 0 auto;
  font-family: "Segoe UI", system-ui, sans-serif;
}

/* Header */
.dashboard__header {
  margin-bottom: 1rem;
}
.dashboard__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 2px;
}
.dashboard__subtitle {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}

/* Metrics */
.dashboard__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 1.25rem;
}
.metric-card {
  background: #f4f6f8;
  border-radius: 10px;
  padding: 0.75rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.metric-card--success {
  background: #eaf7f2;
}
.metric-card--danger {
  background: #fff0eb;
}

.metric-card__label {
  font-size: 0.7rem;
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.metric-card__value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}
.metric-card--success .metric-card__value {
  color: #0f6e56;
}
.metric-card--danger .metric-card__value {
  color: #993c1d;
}
.metric-card__currency {
  font-size: 0.68rem;
  color: #aaa;
}

/* Tabs */
.dashboard__tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.tab-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: transparent;
  color: #666;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.tab-btn--active {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

/* Charts */
.dashboard__chart-section {
  margin-bottom: 1.5rem;
}
.dashboard__chart-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #999;
  margin: 0 0 0.5rem;
}
.chart-wrapper {
  position: relative;
  width: 100%;
}

/* Legend */
.dashboard__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 1.5rem;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: #666;
}
.legend-item__dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

/* Agent list */
.dashboard__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.agent-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.agent-row__rank {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #888;
  flex-shrink: 0;
}
.agent-row__rank--gold {
  background: #fff3cd;
  color: #b8860b;
}
.agent-row__rank--silver {
  background: #eee;
  color: #666;
}
.agent-row__rank--bronze {
  background: #fde8d8;
  color: #a0522d;
}

.agent-row__info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.agent-row__name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.agent-row__region {
  font-size: 0.7rem;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.agent-row__stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
  min-width: 90px;
}
.agent-row__sales {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
}
.agent-row__progress-bar {
  width: 80px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}
.agent-row__progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}
.agent-row__pct {
  font-size: 0.7rem;
  font-weight: 700;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .dashboard__title {
    color: #f0f0f0;
  }
  .metric-card {
    background: #2a2a2a;
  }
  .metric-card--success {
    background: #0d2e24;
  }
  .metric-card--danger {
    background: #2e1a12;
  }
  .metric-card__value {
    color: #f0f0f0;
  }
  .tab-btn {
    border-color: #444;
    color: #aaa;
  }
  .tab-btn--active {
    background: #f0f0f0;
    color: #1a1a1a;
    border-color: #f0f0f0;
  }
  .agent-row {
    border-bottom-color: #2a2a2a;
  }
  .agent-row__name {
    color: #f0f0f0;
  }
  .agent-row__sales {
    color: #ddd;
  }
  .agent-row__progress-bar {
    background: #333;
  }
  .agent-row__rank {
    background: #2a2a2a;
    color: #888;
  }
}

/* Mobile fine-tuning */
@media (max-width: 360px) {
  .dashboard__metrics {
    gap: 6px;
  }
  .metric-card__value {
    font-size: 0.95rem;
  }
  .agent-row__stats {
    min-width: 80px;
  }
}
</style>
