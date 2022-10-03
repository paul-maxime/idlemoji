<script setup>
import { ref } from "vue";
import logger from "@/stores/logger.js";

const messages = ref([]);

function add(text) {
  messages.value.unshift(text);
  while (messages.value.length > 8) {
    messages.value.pop();
  }
}

function opacityFromIndex(index) {
  if (index <= 2) return 1;
  if (index > 8) return 0;
  return 1 - (index - 2) * 0.2;
}

const handlers = {
  "game-start": (run) => add(`Simulation ${run} begins. The dragon will fire in 10 seconds.`),
  "game-over": () => add("Simulation failed. Trying again."),
  "game-won": (run) => add(`Simulation succeeded after ${run} runs.`),
  "enemy-encountered": (entity) => add(`You encountered ${entity.name}!`),
  "enemy-defeated": (entity) => add(`You defeated ${entity.name} and got ${entity.gold} gold.`),
  "stat-upgraded": (stat) => add(`Upgraded ${stat.name.toLowerCase()} to rank ${stat.level}.`),
  "change-area": (name) => add(`Entering a new area: ${name}.`),
};

logger.register((message, params) => {
  if (handlers[message]) handlers[message](params);
});
</script>

<template>
  <div class="messages">
    <p v-for="(message, index) in messages" :key="index" v-bind:style="{ opacity: opacityFromIndex(index) }">
      {{ message }}
    </p>
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
