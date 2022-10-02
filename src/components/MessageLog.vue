<script setup>
import { ref } from "vue";
import logger from "@/stores/logger.js";

const messages = ref([]);

function clear() {
  messages.value = [];
}

function add(text) {
  messages.value.unshift(text);
}

const handlers = {
  start: () => {
    clear();
    add("A new day begins. The dragon will destroy the castle in 10 seconds.");
  },
  "game-over": () => add("Too late, you lost. Trying again."),
  "enemy-encountered": (entity) => add(`You encountered ${entity.name}!`),
  "enemy-defeated": (entity) => add(`You defeated ${entity.name} and got ${entity.gold} gold.`),
};

logger.register((message, params) => {
  console.log(message, params);
  if (handlers[message]) handlers[message](params);
});
</script>

<template>
  <div class="messages">
    <p v-for="message of messages" :key="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.messages {
  text-align: center;
}
p {
  margin: 0;
}
</style>
