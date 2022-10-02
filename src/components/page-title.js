import game from "@/stores/game.js";
import { watch } from "vue";

export function usePageTitle() {
  watch(game, () => {
    if (game.unlocks.has("gold-display")) {
      document.title = `${game.gold} gold • run ${game.currentRun} • lemojid`;
    } else {
      document.title = `run ${game.currentRun} • lemojid`;
    }
  });
}
