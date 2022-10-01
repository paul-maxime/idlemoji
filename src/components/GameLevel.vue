<script></script>

<template>
  <div class="game-level">
    <div v-emoji="'⚔️🐔'"></div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.game-level {
  top: 0;
  left: 0;
  padding: 10px;
  flex: 0 0 100%;
  border: 1px dashed black;
  flex-wrap: wrap;
  background-color: lightcoral;
}
img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
</style>
