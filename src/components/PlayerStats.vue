<script setup>
import romans from "romans";
import game from "@/stores/game.js";

function canUpgrade(stat) {
  return game.gold >= stat.upgradeCost;
}
</script>

<template>
  <div v-if="game.currentRun >= 3">
    <h2>Hero stats</h2>
    <table>
      <tr v-for="stat of game.stats" :key="stat.name">
        <td style="text-align: center">
          <strong>{{ stat.name }} {{ romans.romanize(stat.level) }}</strong>
          <br />
          <small>({{ stat.description() }})</small>
        </td>
        <td>
          <button :disabled="!canUpgrade(stat)" @click="game.upgradeStat(stat)">
            Upgrade ({{ stat.upgradeCost }} gold)
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
div {
  display: inline-block;
  border: 1px solid black;
  margin: 8px 0;
}
h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 6px;
}
</style>
