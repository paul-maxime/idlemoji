<script setup>
import GameLevel from "./components/GameLevel.vue";
import MessageLog from "./components/MessageLog.vue";
import DebugGameStore from "./components/DebugGameStore.vue";
import RemainingTime from "./components/RemainingTime.vue";
import EnemyInfos from "./components/EnemyInfos.vue";
import PlayerStats from "./components/PlayerStats.vue";
</script>

<template>
  <main class="main">
    <RemainingTime />
    <EnemyInfos />
    <GameLevel />
    <div style="display: flex; justify-content: center">
      <PlayerStats />
    </div>
    <MessageLog />
    <DebugGameStore />
  </main>
</template>

<style>
body {
  background-color: rgb(230, 255, 255);
}
</style>
