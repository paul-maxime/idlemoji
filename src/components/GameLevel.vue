<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import { updateLevel } from "@/components/game-level.js";

const levelString = ref("");
watch(game, (newGame) => {
  levelString.value = updateLevel(newGame);
});
</script>

<template>
  <div class="game-level">
    <div v-html="levelString"></div>
  </div>
</template>

<style scoped>
.game-level {
  width: 1024px;
  margin: 6px auto;
  border: 1px dashed black;
  background-color: rgb(115, 199, 136);
  font-family: monospace;
  white-space: pre;
  font-size: 0;
  letter-spacing: 48px;
}
</style>

<style>
img.level-emoji {
  height: 48px;
  width: 48px;
  vertical-align: middle;
}
</style>
