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
  <div class="timer">
    <span v-emoji="moon"></span>
    <small>{{ timer }}</small>
  </div>
</template>

<style scoped>
.timer {
  text-align: center;
  font-family: monospace;
  font-size: 22px;
  margin-bottom: 6px;
}
.timer small {
  margin-left: 6px;
}
</style>
