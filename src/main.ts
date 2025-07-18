import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 完整引入 Element Plus UI
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(ElementPlus);

// 最后
app.mount("#app");
