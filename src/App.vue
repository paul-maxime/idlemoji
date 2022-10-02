<script setup>
import UnlockButton from "./components/UnlockButton.vue";
import GameLevel from "./components/GameLevel.vue";
import MessageLog from "./components/MessageLog.vue";
import RemainingTime from "./components/RemainingTime.vue";
import EnemyInfos from "./components/EnemyInfos.vue";
import PlayerStats from "./components/PlayerStats.vue";
import GoldAmount from "./components/GoldAmount.vue";
import unlocks from "@/stores/unlocks.js";
</script>

<template>
  <main class="main">
    <UnlockButton />
    <div style="display: flex; justify-content: center" v-if="unlocks.has('gold-display')">
      <GoldAmount />
      <RemainingTime v-if="unlocks.has('remaining-time')" />
    </div>
    <GameLevel v-if="unlocks.has('level-gui')" />
    <div class="bottom-panel">
      <EnemyInfos v-if="unlocks.has('battle-info')" />
      <PlayerStats v-if="unlocks.has('hero-stats')" />
    </div>
    <MessageLog />
    <!-- <DebugGameStore /> -->
  </main>
</template>

<style scoped>
.bottom-panel {
  display: flex;
  justify-content: center;
}
</style>

<style>
body {
  background-color: rgb(230, 255, 255);
}
img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
</style>
