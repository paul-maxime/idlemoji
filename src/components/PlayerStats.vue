<script setup>
import romans from "romans";
import game from "@/stores/game.js";

function canUpgrade(stat) {
  return game.gold >= stat.upgradeCost;
}
</script>

<template>
  <div>
    <table>
      <tr v-for="stat of game.stats" :key="stat.name">
        <td style="text-align: center">
          <strong>{{ stat.name }} {{ romans.romanize(stat.level) }}</strong>
          <br v-if="game.unlocks.has('hero-stats-details')" />
          <small v-if="game.unlocks.has('hero-stats-details')">({{ stat.description() }})</small>
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
  display: flex;
  align-items: center;
  border: 1px solid black;
  margin: 8px 0;
}
</style>
