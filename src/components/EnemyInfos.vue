<script setup>
import game from "@/stores/game.js";
import { ref, watch } from "vue";
import twemoji from "twemoji";

function twemojitType(text) {
  return twemoji.parse(text, {
    className: "info-twemoji-type",
  });
}

function twemojitText(text) {
  return twemoji.parse(text, {
    className: "info-twemoji-text",
  });
}

const action = ref(twemojitType("👞"));
const enemy = ref(twemojitText(""));
const health = ref(twemojitText(""));
watch(game, (newGame) => {
  if (newGame.battle.isBattling === true) {
    action.value = twemojitType("⚔️");
    enemy.value = twemojitText(newGame.battle.enemy.type);
    health.value = twemojitText("💗 " + newGame.battle.enemy.health);
  } else {
    action.value = twemojitType("👞");
    enemy.value = twemojitText("");
    health.value = twemojitText("");
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
  display: flex;
  align-items: center;
}

.infos-type {
  display: inline-block;
  text-align: center;
  padding: 0px 10px;
}

.infos-text {
  width: 100px;
  display: inline-block;
  padding: 0px 10px;
  text-align: left;
  font-size: 24px;
}
</style>

<style>
.info-twemoji-type {
  height: 48px;
  width: 48px;
  vertical-align: -0.2em;
}

.info-twemoji-text {
  height: 24px;
  width: 24px;
  vertical-align: -0.2em;
}
</style>
