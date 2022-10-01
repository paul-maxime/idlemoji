<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import twemoji from "twemoji";

function twemojit(text) {
  return twemoji.parse(text, {
    className: "info-twemoji",
  });
}

const action = ref(twemojit("👞"));
const enemy = ref(twemojit(""));
const health = ref(twemojit(""));
watch(game, (newGame) => {
  if (newGame.battle.isBattling === true) {
    action.value = twemojit("⚔️");
    enemy.value = twemojit(newGame.battle.enemy.type);
    health.value = twemojit("💗 " + newGame.battle.enemy.health);
  } else {
    action.value = twemojit("👞");
    enemy.value = twemojit("");
    health.value = twemojit("");
  }
});
</script>

<template>
  <div class="enemy-infos">
    <div class="infos-type" v-html="action"></div>
    <div class="infos-text">
      <div v-html="enemy"></div>
      <div v-html="health"></div>
    </div>
  </div>
</template>

<style scoped>
.enemy-infos {
  height: 300px;
  text-align: center;
}

.infos-type {
  width: 100px;
  display: inline-block;
  text-align: center;
  padding: 100px 0;
}

.infos-text {
  width: 500px;
  display: inline-block;
  padding: 50px 100px;
  text-align: left;
  font-size: 50px;
}
</style>

<style>
.info-twemoji {
  height: 56px;
  width: 56px;
  vertical-align: -0.2em;
}
</style>
