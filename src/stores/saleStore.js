// stores/sotuvStore.js
import { defineStore } from "pinia";
import { dataRTP } from "@/constants/rtp/index.js";
import { dataValfex } from "@/constants/valfex/index.js";
import { dataAgents } from "@/constants/agents";

export const useSotuvStore = defineStore("sotuv", {
  state: () => ({
    // Barcha mahsulotlar (faqat isActive: true bo'lganlar)
    allProducts: [
      ...dataRTP.filter((p) => p.isActive),
      ...dataValfex.filter((p) => p.isActive),
    ],

    // Agentlar ro'yxati
    agents: dataAgents,

    // Tanlangan agent
    selectedAgent: null,

    // Savat (tanlangan mahsulotlar)
    cart: [],

    // Mijoz nomi va kommentariya
    clientName: "",
    comment: "",

    // Nakladnoy raqami (har safar +1 oshadi)
    nakladnoyNumber: localStorage.getItem("nakladnoyNumber")
      ? parseInt(localStorage.getItem("nakladnoyNumber"))
      : 1,

    // Sana
    currentDate: new Date().toLocaleDateString("ru-RU"),
  }),

  getters: {
    // Savatdagi jami summa
    totalSum: (state) => {
      return state.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },

    // Savat bo'shmi yoki yo'q
    isCartEmpty: (state) => state.cart.length === 0,

    // Nakladnoy nomeri formatlangan: 000001
    formattedNumber: (state) => {
      return String(state.nakladnoyNumber).padStart(6, "0");
    },
  },

  actions: {
    // Agent tanlash
    selectAgent(agent) {
      this.selectedAgent = agent;
    },

    // Savatga mahsulot qo'shish
    addToCart(product, qty = 1) {
      const existing = this.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        this.cart.push({
          ...product,
          quantity: qty,
        });
      }
    },

    // Savatdan mahsulot o'chirish
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },

    // Savatdagi miqdorni yangilash
    updateQuantity(productId, qty) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        if (qty <= 0) {
          this.removeFromCart(productId);
        } else {
          item.quantity = qty;
        }
      }
    },

    // Nakladnoy raqamini oshirish va saqlash
    incrementNakladnoyNumber() {
      this.nakladnoyNumber++;
      localStorage.setItem("nakladnoyNumber", this.nakladnoyNumber);
    },

    // Formni tozalash (nakladnoy tayyorlagandan keyin)
    resetForm() {
      this.selectedAgent = null;
      this.cart = [];
      this.clientName = "";
      this.comment = "";
      this.currentDate = new Date().toLocaleDateString("ru-RU");
    },
  },
});
