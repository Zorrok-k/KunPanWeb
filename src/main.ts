import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 完整引入 Element Plus UI
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

// 引入 vue-router
import router from "@/router/index";
app.use(router);

// 挂载 Api 到全局
import api from "@/apis/index.ts";
app.config.globalProperties.$api = api;

// 最后
app.mount("#app");
