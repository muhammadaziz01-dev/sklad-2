import Admin from "@/assets/agents/admin.png";
import AgentImg from "@/assets/agents/agent-img.png";



export const dataAgents = [
    {
        id:1,
        name:"Мухаммадазиз",
        fulName: "Акбаров Мухаммадазиз",
        img: Admin ,
        phone: "+996 999 142 444",
        phoneUrl : "tel:+996999142444",
        region : "Ош",
        currency:"сом",
        monthlySales: 4450500,
        monthlyCollected: 3450000,
        totalDebt: 500500,
        rol: "admin"
    },
    {
        id:2,
        name:"Нодирбек",
        fulName: "Нодирбек Кадиржан угли",
        img: AgentImg ,
        phone: "+996 553 010 675",
        phoneUrl : "tel:+996553010675",
        region : "Джалал-Абад , Ноокат",
        currency:"сом",
        monthlySales: 3450500,
        monthlyCollected: 2450000,
        totalDebt: 1500500,
        rol: "agent"
    },
    {
        id:3,
        name:"Али",
        fulName: "Вахапжон  Арипов",
        img: AgentImg ,
        phone: "+996 557 588 831",
        phoneUrl : "tel:+996557588831",
        region : "Озгон , Кара-Суу",
        currency:"сом",
        monthlySales: 3450500,
        monthlyCollected: 2450000,
        totalDebt: 1500500,
        rol: "agent"
    },
    {
        id:4,
        name:"Вохиджон",
        fulName: "Вохиджон  Арипов",
        img: AgentImg ,
        phone: "+996 700 292 906",
        phoneUrl : "tel:+996700292906",
        region : "Ош",
        currency:"сом",
        monthlySales: 2450500,
        monthlyCollected: 1450000,
        totalDebt: 1500500,
        rol: "agent"
    },
    {
        id:5,
        name:"Умиджон",
        fulName: "Умиджон Мамажанов",
        img: AgentImg ,
        phone: "+996 557 110 046",
        phoneUrl : "tel:+996557110046",
        region : "Кызыл-Кия , Кадамжай",
        currency:"сом",
        monthlySales: 1450500,
        monthlyCollected: 1450000,
        totalDebt: 1000000,
        rol: "agent"
    },
    {
        id:6,
        name:"Зухриддин",
        fulName: "Зухриддин Маҳаммаджанов",
        img: AgentImg ,
        phone: "+996 708 161 023",
        phoneUrl : "tel:+996708161023",
        region : "Ош , Араван",
        currency:"сом",
        monthlySales: 3850500,
        monthlyCollected: 2850000,
        totalDebt: 1500500,
        rol: "agent"
    },
    {
        id:7,
        name:"Шерзодбек",
        fulName: "Турсунов Шерзодбек",
        img: AgentImg ,
        phone: "+996 558 745 858",
        phoneUrl : "tel:+996558745858",
        region : "Ош",
        currency:"сом",
        monthlySales: 0,
        monthlyCollected: 0,
        totalDebt: 0,
        rol: "manager"
    },
    {
        id:8,
        name:"Козимжон",
        fulName: "Козимжон Алимов",
        img: AgentImg ,
        phone: "+996 551 220 186",
        phoneUrl : "tel:+996551220186",
        region : "Ош",
        currency:"сом",
        monthlySales: 450500,
        monthlyCollected: 450000,
        totalDebt: 100500,
        rol: "agent"
    },
    {
        id:9,
        name:"Хабибуллох",
        fulName: "Хабибуллох",
        img: AgentImg ,
        phone: "+996 550 371 792",
        phoneUrl : "tel:+996550371792",
        region : "Ош",
        currency:"сом",
        monthlySales: 3450500,
        monthlyCollected: 1450000,
        totalDebt: 2500500,
        rol: "agent"
    },
    {
        id:10,
        name:"Бахтиёр",
        fulName: "Бахтиёр ака(Джалал-Абад)",
        img: AgentImg ,
        phone: "+996 550 371 792",
        phoneUrl : "tel:+996550371792",
        region : "Джалал-Абад",
        currency:"сом",
        monthlySales: 3450500,
        monthlyCollected: 2450000,
        totalDebt: 1500500,
        rol: "agent"
    },
    {
        id:11,
        name:"Сойибжон",
        fulName: "Сойибжон ака(Джалал-Абад)",
        img: AgentImg ,
        phone: "+996 550 371 792",
        phoneUrl : "tel:+996550371792",
        region : "Джалал-Абад",
        currency:"сом",
        monthlySales: 2450500,
        monthlyCollected: 2450000,
        totalDebt: 200000,
        rol: "agent"
    },
    {
        id:12,
        name:"Холмухаммад",
        fulName: "Холмухаммад ака",
        img: AgentImg ,
        phone: "+996 550 434 510",
        phoneUrl : "tel:+996550434510",
        region : "Кыргызстан",
        currency:"сом",
        monthlySales: 0,
        monthlyCollected: 0,
        totalDebt: 0,
        rol: "manager"
    },


]


export const usersData = [
    {
        id:1,
        name:"Muhammadaziz",
        rol: "admin",
        password:"57163363",
    },
    {
        id:2,
        name:"Нодирбек",
        rol: "agent",
        password: "010675",
    },
    {
        id:3,
        name:"Али",
        password : "588831",
        rol: "agent"
    },
    {
        id:5,
        name:"Умиджон",
        password : "110046",
        rol: "agent"
    },
    {
        id:6,
        name:"Зухриддин",
        password : "161023",
        rol: "agent"
    },
    {
        id:7,
        name:"Шерзодбек",
        password : "745858",
        rol: "manager"
    },
    {
        id:8,
        name:"Козимжон",
        password : "220186",
        region : "Ош",
        rol: "agent"
    },
    {
        id:9,
        name:"Хабибуллох",
        password : "371792",
        region : "Ош",
        rol: "agent"
    },
    {
        id:12,
        name:"Холмухаммад",
        password : "434510",
        rol: "manager"
    },


]