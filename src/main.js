import { createApp } from "vue";
import App from "./App.vue";
import twemoji from "twemoji";

import "./assets/main.css";

const app = createApp(App);

app.directive("emoji", (el) => {
  el.innerHTML = twemoji.parse(el.innerHTML);
});

app.mount("#app");
