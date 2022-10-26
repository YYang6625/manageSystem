import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import "./api/mock.js";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
// 将处理后的请求拦截api
import api from "./api/request/api";

// 引入pinia
const pinia = createPinia();
// 引用elementUI(全局使用)
const app = createApp(App);
// 注册动态图标component使用不同图标效果
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 将api请求转化为全局使用
app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.mount("#app");

