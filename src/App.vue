<script setup>
import GameLevel from "./components/GameLevel.vue";
import MessageLog from "./components/MessageLog.vue";
import DebugGameStore from "./components/DebugGameStore.vue";
import RemainingTime from "./components/RemainingTime.vue";
</script>

<template>
  <main class="main">
    <RemainingTime />
    <GameLevel />
    <MessageLog />
    <DebugGameStore />
  </main>
</template>

<style scoped></style>
