<script>
export default {
  data() {
    return {
      count: twemoji.parse("⚔️🐔"),
    };
  },
};
</script>

<template>
  <div class="game-level">
    <div v-html="count"></div>
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
</style>
