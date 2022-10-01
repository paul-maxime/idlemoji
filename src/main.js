import { createApp } from "vue";
import App from "./App.vue";
import twemoji from "twemoji";

import "./assets/main.css";

const app = createApp(App);

app.directive("emoji", (el, bindings) => {
  el.innerHTML = twemoji.parse(bindings.value);
});

app.mount("#app");
