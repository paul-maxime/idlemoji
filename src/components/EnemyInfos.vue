<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import twemoji from "twemoji";
import ProgressBar from "./ProgressBar.vue";

function twemojit(text) {
  return twemoji.parse(text, {
    className: "info-twemoji",
  });
}

const enemy = ref("");
const health = ref("");
const healthValue = ref(0);
const maxHealthValue = ref(0);
watch(game, (newGame) => {
  if (newGame.battle.isBattling === true) {
    enemy.value = twemojit(newGame.battle.enemy.type);
    health.value = twemojit("💗");
    healthValue.value = newGame.battle.enemy.health;
    maxHealthValue.value = newGame.battle.enemy.maxHealth;
  } else {
    enemy.value = "";
    health.value = "";
    healthValue.value = 0;
    maxHealthValue.value = 0;
  }
});
</script>

<template>
  <div class="enemy-infos">
    <div class="infos-type" v-html="action"></div>
    <div class="infos-text">
      <div class="infos-text-container" v-if="enemy">
        <div v-html="enemy"></div>
        <div class="health">
          <div v-html="health"></div>
          <ProgressBar :current-value="healthValue" :max-value="maxHealthValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.enemy-infos {
  display: flex;
  align-items: center;
  font-family: monospace;
}

.infos-type {
  display: inline-block;
  text-align: center;
  padding: 0px 10px;
}

.infos-text {
  width: 150px;
  padding: 0px 10px;
  text-align: left;
  font-size: 24px;
}

.infos-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.health {
  display: flex;
  align-items: center;
  width: 150px;
}

.health > div {
  margin: 5px;
}
</style>

<style>
.info-twemoji {
  height: 24px;
  width: 24px;
  vertical-align: -0.2em;
}
</style>
