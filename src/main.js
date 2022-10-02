import { createApp } from "vue";
import twemoji from "twemoji";
import App from "./App.vue";

const app = createApp(App);

app.directive("emoji", (el, bindings) => {
  el.innerHTML = twemoji.parse(bindings.value);
});

app.mount("#app");
