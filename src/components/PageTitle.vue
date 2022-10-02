<script setup>
import game from "@/stores/game.js";
import { watch } from "vue";

watch(game, () => {
  document.title = `${game.gold} gold • run ${game.currentRun} • lemojid`;
});
</script>
