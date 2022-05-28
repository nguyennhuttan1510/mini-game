import { createApp } from "vue";
import "./index.css";
import "@/assets/global.scss";
import App from "./App.vue";
import store from "./store";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");
