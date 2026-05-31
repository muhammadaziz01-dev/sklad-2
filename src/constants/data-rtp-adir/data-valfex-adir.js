import trubaRtp from "@/assets/productImgs/rtp/trubaPPR.webp";
import muftaPPR from "@/assets/productImgs/rtp/muftaPPR.webp"
import traynikPPR from "@/assets/productImgs/rtp/traynikPPR.webp"
import klipsPPR from "@/assets/productImgs/rtp/oporaPPR.webp"
import muftaPPRNr from "@/assets/productImgs/rtp/muftaPPRKbNr.webp"
import razyomNr from "@/assets/productImgs/rtp/muftaPPRAmrNr.webp"

export const dataValfexAdir = [
  // ==================== ТРУБА PPR (PN 20) ====================
  {
    id: 1,
    img: muftaPPR,
    name: "Муфта соединительная 20ф белый VALFEX",
    brand: "VALFEX",
    quantity: "500/125 шт",
    price: 6,
    unit: "шт",
    allResidual: 49000,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 2,
    img: muftaPPR,
    name: "Муфта соединительная 25ф белый VALFEX",
    brand: "VALFEX",
    quantity: "300/75 шт",
    price: 8,
    unit: "шт",
    allResidual: 23400,
    residualValue: "",
    isActive: true,
    category: "fitingPPR", 
  },
  {
    id: 3,
    img: muftaPPR,
    name: "Муфта соединительная 32ф белый VALFEX",
    brand: "VALFEX",
    quantity: "150/30 шт",
    price: 16,
    unit: "шт",
    allResidual: 5100,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 4,
    img: muftaPPR,
    name: "Муфта соединительная 40ф белый VALFEX",
    brand: "VALFEX",
    quantity: "100/20 шт",
    price: 28,
    unit: "шт",
    allResidual: 1800,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 5,
    img: traynikPPR,
    name: "Тройник 32ф белый VALFEX",
    brand: "VALFEX",
    quantity: "75/15 шт",
    price: 22,
    unit: "шт",
    allResidual: 225,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 6,
    img: traynikPPR,
    name: "Тройник переходной 25\\20\\25ф белый VALFEX",
    brand: "VALFEX",
    quantity: "200/25 шт",
    price: 12,
    unit: "шт",
    allResidual: 2200,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 7,
    img: klipsPPR,
    name: "Опора с защелкой 32ф белый VALFEX",
    brand: "VALFEX",
    quantity: "300/75 шт",
    price: 7,
    unit: "шт",
    allResidual: 8100,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 8,
    img: muftaPPRNr,
    name: "Муфта комбинированная с Н\\Р 20х1\\2ф белый VALFEX",
    brand: "VALFEX",
    quantity: "150/30 шт",
    price: 68,
    unit: "шт",
    allResidual: 1500,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 9,
    img: muftaPPRNr,
    name: "Муфта комбинированная с Н\\Р 25х1\\2ф белый VALFEX",
    brand: "VALFEX",
    quantity: "100 шт",
    price: 83,// narhini tekshirib qoy
    unit: "шт",
    allResidual: 1000,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 10,
    img: razyomNr,
    name: "Муфта комб. раз. (амер) с Н\\Р 20х1\\2 белый VALFEX",
    brand: "VALFEX",
    quantity: "175/25 шт",
    price: 155,
    unit: "шт",
    allResidual: 1050,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 11,
    img: razyomNr,
    name: "Муфта комб. раз. (амер) с Н\\Р 20х3\\4 белый VALFEX",
    brand: "VALFEX",
    quantity: "175/25 шт",
    price: 175,// narhini tekshirib qo'y
    unit: "шт",
    allResidual: 1225,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 12,
    img: razyomNr,
    name: "Муфта комб. раз. (амер) с Н\\Р 25х3\\4 белый VALFEX",
    brand: "VALFEX",
    quantity: "100/25 шт",
    price: 198,
    unit: "шт",
    allResidual: 425,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  },
  {
    id: 13,
    img: razyomNr,
    name: "Муфта комб. раз. (амер) с Н\\Р 40х1 1\\4 белый VALFEX",
    brand: "VALFEX",
    quantity: "40/10 шт",
    price: 495,
    unit: "шт",
    allResidual: 80,
    residualValue: "",
    isActive: true,
    category: "fitingPPR",
  }
];


// Valfex praduct list export
export const allDataValfexAdir = dataValfexAdir
.filter((itim)=>itim.isActive)
.map((itim)=>({
  ...itim,
  residualValue:itim.price * itim.allResidual
}));

// products count
export const productsCount = allDataValfexAdir.length;

// all products  residual valyue
export const totalResidualValue = allDataValfexAdir.reduce(
  (sum, item) => sum + item.residualValue,
  0
);
