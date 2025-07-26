import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 完整引入 Element Plus UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 引入 vue-router
import router from '@/router/index'
app.use(router)

// 引入 pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// 最后
app.mount('#app')
