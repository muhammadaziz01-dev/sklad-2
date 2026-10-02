import { defineStore } from "pinia";
import { dataRTPAdir } from "@/constants/data-adir/index.js";
import { dataValfex } from "@/constants/data-adir/data-valfex-adir.js";
import { dataAgents } from "@/constants/agents";

export const useSotuvWizardStore = defineStore("sotuvWizard", {
  state: () => ({
    // Joriy qadam: 1 = agent+klиент, 2 = mahsulotlar, 3 = nakladnoy
    step: 1,

    // Agentlar ro'yxati
    agents: dataAgents,

    // Tanlangan agent
    selectedAgent: null,

    // Mijoz ismi va kommentariya
    clientName: "",
    comment: "",

    // Tanlangan mahsulotlar: { productId: { product, qty } }
    orderItems: {},

    // Filterlar
    selectedBrand: "all",
    selectedCategory: "all",
    searchQuery: "",

    // Nakladnoy raqami
    nakladnoyNumber: localStorage.getItem("nakladnoyNumber")
      ? parseInt(localStorage.getItem("nakladnoyNumber"))
      : 1,
  }),

  getters: {
    // Faqat isActive mahsulotlar
    allProducts: () => [
      ...dataRTPAdir.filter((p) => p.isActive),
      ...dataValfex.filter((p) => p.isActive),
    ],

    orderList: (state) => Object.values(state.orderItems),

    totalAmount: (state) => {
      return Object.values(state.orderItems).reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0
      );
    },

    totalItems: (state) => Object.values(state.orderItems).length,

    getQty: (state) => (productId) => state.orderItems[productId]?.qty || 0,

    isEmpty: (state) => Object.keys(state.orderItems).length === 0,

    formattedNumber: (state) => String(state.nakladnoyNumber).padStart(6, "0"),

    canGenerate: (state) =>
      !!state.selectedAgent &&
      !!state.clientName &&
      Object.keys(state.orderItems).length > 0,
  },

  actions: {
    selectAgent(agent) {
      this.selectedAgent = agent;
    },

    goToStep2() {
      if (this.selectedAgent && this.clientName) this.step = 2;
    },

    prevStep() {
      if (this.step > 1) this.step--;
    },

    nextStep() {
      if (this.step < 3) this.step++;
    },

    setQty(product, qty) {
      if (qty <= 0) {
        delete this.orderItems[product.id];
      } else {
        this.orderItems[product.id] = { product, qty };
      }
    },

    increment(product) {
      const current = this.orderItems[product.id]?.qty || 0;
      this.setQty(product, current + 1);
    },

    decrement(product) {
      const current = this.orderItems[product.id]?.qty || 0;
      if (current > 0) this.setQty(product, current - 1);
    },

    setBrand(brand) {
      this.selectedBrand = brand;
      this.selectedCategory = "all";
    },

    setCategory(category) {
      this.selectedCategory = category;
    },

    incrementNakladnoyNumber() {
      this.nakladnoyNumber++;
      localStorage.setItem("nakladnoyNumber", this.nakladnoyNumber);
    },

    resetForm() {
      this.selectedAgent = null;
      this.orderItems = {};
      this.clientName = "";
      this.comment = "";
      this.step = 1;
      this.selectedBrand = "all";
      this.selectedCategory = "all";
      this.searchQuery = "";
    },
  },
});
