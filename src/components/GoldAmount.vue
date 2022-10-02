<script setup>
import game from "@/stores/game.js";

const numberFormat = new Intl.NumberFormat("en-US");
</script>

<template>
  <div>
    <span v-emoji="'💰'"></span>
    <span>{{ numberFormat.format(game.gold) }}</span>
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
