<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import { updateLevel } from "@/components/game-level.js";
import RemainingTime from "./RemainingTime.vue";

const levelString = ref("");
watch(game, (newGame) => {
  levelString.value = updateLevel(newGame);
});
</script>

<template>
  <RemainingTime />
  <div class="game-level">
    <div v-html="levelString"></div>
  </div>
  <pre>{{ game }}</pre>
</template>

<style scoped>
.game-level {
  width: 512px;
  margin: 0 auto;
  border: 1px dashed black;
  background-color: lightcoral;
  font-family: monospace;
  white-space: pre;
  font-size: 0;
  letter-spacing: 24px;
}
</style>
