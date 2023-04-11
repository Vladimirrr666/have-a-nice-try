import { createApp } from "vue";
import App from "./App.vue";
import { Field, DatePicker, Popup } from "vant";
import "vant/lib/index.css";

const app = createApp(App);
app.use(Field).use(Popup).use(DatePicker).mount("#app");
