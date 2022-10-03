<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import { updateLevel } from "@/components/game-level.js";

const levelString = ref("");
const arenaLength = ref(0);
const arenaColor = ref("");
watch(game, () => {
  const entityMax = game.areaSize;
  levelString.value = updateLevel(game, entityMax);
  arenaLength.value = Math.min(20, entityMax) + 1;
  arenaColor.value = game.currentArea.color;
});
</script>

<template>
  <div class="game-level-arena">
    <div class="game-level">
      <div :class="game.isGameOver ? 'game-level-string-end' : 'game-level-string-start'" v-html="levelString"></div>
    </div>
  </div>
</template>

<style scoped>
.game-level {
  margin: 6px auto;
  border: 1px dashed black;
  background-color: v-bind(arenaColor);
  font-family: monospace;
  white-space: pre;
  font-size: 0;
  letter-spacing: 48px;
}

.game-level-string-start {
  transition-duration: 0.25s;
  opacity: 100;
}

.game-level-string-end {
  transition-duration: 1.75s;
  opacity: 0;
}

.game-level-arena {
  width: v-bind(arenaLength * 48 + "px");
  margin: 0 auto;
}
</style>

<style>
img.level-emoji {
  height: 48px;
  width: 48px;
  vertical-align: middle;
}
</style>
