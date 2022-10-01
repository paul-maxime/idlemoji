<script setup>
import game from "@/stores/game.js";
</script>

<template>
  <div class="game-level">
    <div v-emoji="'⚔️➖➖➖➖➖🐔\n⚔️     🐔'"></div>
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
