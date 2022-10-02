<script setup>
import game from "@/stores/game.js";

function canUnlock(feature) {
  return game.gold >= feature.cost;
}
</script>

<template>
  <div v-if="game.currentRun > 1 && game.unlocks.next">
    <button @click="game.unlockFeature(game.unlocks.next)" :disabled="!canUnlock(game.unlocks.next)">
      {{ game.unlocks.next.text }} ({{ game.unlocks.next.cost }} gold)
    </button>
    <hr />
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>
