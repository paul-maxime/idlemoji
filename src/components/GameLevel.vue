<script setup>
import game from "@/stores/game.js";
import { ref } from "vue";
import twemoji from "twemoji";

const entitieMax = game.entities.reduce((previousValue, currentValue) =>
  Math.max(previousValue.position, currentValue.position)
);
const entitiesMapped = new Map();
let levelStringToBuild = "";
for (const entitie of game.entities) {
  entitiesMapped.set(entitie.position, entitie);
}

for (let i = 0; i <= entitieMax; i += 1) {
  const entity = entitiesMapped.get(i);
  if (entity != undefined) {
    levelStringToBuild += twemoji.parse(entity.type);
  } else {
    levelStringToBuild += twemoji.parse(" ");
  }
}
const levelString = ref(levelStringToBuild);
</script>

<template>
  <div class="game-level">
    <div v-html="levelString"></div>
  </div>
  <pre>{{ game }}</pre>
</template>

<style scoped>
.game-level {
  width: 512px;
  margin: 0 auto;
  border: 1px dashed black;
  background-color: lightcoral;
  font-family: monospace;
  white-space: pre;
  font-size: 0;
  letter-spacing: 24px;
}
</style>
