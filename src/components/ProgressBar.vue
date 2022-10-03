<script setup>
import { defineProps } from "vue";

defineProps({ currentValue: Number, maxValue: Number });
</script>

<template>
  <div class="bar-background">
    <div class="bar-foreground"></div>
    <div class="bar-text">{{ currentValue }}</div>
  </div>
</template>

<style scoped>
.bar-background {
  display: inline-block;
  background-color: rgb(219, 219, 219);
  height: 20px;
  width: 100%;
  border-radius: 8px;
}

.bar-foreground {
  background-color: rgb(221, 98, 115);
  height: 20px;
  width: v-bind(currentValue / maxValue * 100 + "%");
  border-radius: 8px;
  box-shadow: 0 0 4px rgb(221, 98, 115);
  transition: width 0.1s;
}

.bar-text {
  font-size: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin-top: -21px;
}
</style>
