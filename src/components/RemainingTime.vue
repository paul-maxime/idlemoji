<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";

const MOON_PHASES = ["🌕", "🌖", "🌗", "🌘", "🌑"];

const timer = ref("");
const moon = ref("");

watch(game, () => {
  timer.value = (game.remainingTime / 10).toFixed(1);
  const currentPhase = Math.floor(MOON_PHASES.length - 1 - game.remainingTime / (100 / (MOON_PHASES.length - 1)));
  moon.value = MOON_PHASES[currentPhase];
});
</script>

<template>
  <div class="timer">
    <span class="yooo" v-emoji="moon"></span>
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
