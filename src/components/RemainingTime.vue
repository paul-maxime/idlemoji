<script setup>
import { ref, watch } from "vue";
import game from "@/stores/game.js";

const MOON_PHASES = ["🌕", "🌖", "🌗", "🌘", "🌑"];

const timer = ref("");
const moon = ref("");

watch(game, () => {
  timer.value = (game.remainingTime / 10).toFixed(1);
  if (timer.value === "10.0") timer.value = "9.9";
  const currentPhase = Math.floor(MOON_PHASES.length - 1 - game.remainingTime / (100 / (MOON_PHASES.length - 1)));
  moon.value = MOON_PHASES[currentPhase];
});
</script>

<template>
  <div>
    <span v-emoji="moon"></span>
    <span class="timer-text">{{ timer }}</span>
  </div>
</template>

<style scoped>
div {
  font-size: 2em;
  font-family: monospace;
}
span {
  margin-right: 6px;
}
</style>
