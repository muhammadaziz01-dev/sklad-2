import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "@/assets/globol.scss"

// Toastify
import 'vue3-toastify/dist/index.css';

// Pinia
import { createPinia } from 'pinia'

// Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(Antd)
app.use(router)
app.mount('#app');