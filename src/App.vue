<script setup>
import game from "@/stores/game.js";
import unlocks from "@/stores/unlocks.js";
import UnlockButton from "./components/UnlockButton.vue";
import GameLevel from "./components/GameLevel.vue";
import MessageLog from "./components/MessageLog.vue";
import RemainingTime from "./components/RemainingTime.vue";
import EnemyInfos from "./components/EnemyInfos.vue";
import PlayerStats from "./components/PlayerStats.vue";
import GoldAmount from "./components/GoldAmount.vue";
import { usePageTitle } from "./components/page-title.js";

usePageTitle();
</script>

<template>
  <main class="main">
    <UnlockButton />
    <div class="panel" v-if="!game.isInterfaceHidden">
      <GoldAmount v-if="unlocks.has('gold-display')" />
      <RemainingTime v-if="unlocks.has('remaining-time')" />
    </div>
    <GameLevel v-if="unlocks.has('level-gui') && !game.isInterfaceHidden" />
    <div class="panel" v-if="!game.isInterfaceHidden">
      <PlayerStats v-if="unlocks.has('hero-stats')" />
      <EnemyInfos v-if="unlocks.has('battle-info')" />
    </div>
    <MessageLog />
    <!-- <DebugGameStore /> -->
  </main>
</template>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
}
</style>

<style>
body {
  background-color: rgb(230, 255, 255);
}
button {
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 4px 6px;
  cursor: pointer;
}
button:hover {
  outline: 2px solid black;
  border: 1px solid white;
}
button:active {
  outline: 1px solid black;
}
button:disabled {
  color: #707070;
  border: 1px solid #505050;
  outline: none;
  cursor: default;
}
button:disabled:hover {
  border: 1px solid #505050;
  outline: none;
}
img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}

@font-face {
  font-family: Comme-Regular;
  src: url("Comme-Regular.ttf");
}

* {
  font-family: Comme-Regular;
}
</style>
