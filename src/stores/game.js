import { reactive } from "vue";

const game = reactive({
  entities: [
    { type: "⚔", position: 0 },
    { type: "🐔", position: 5 },
  ],
  currentFight: {
    opponentHealth: 100,
  },
  exp: 100,
  upgrades: [
    { name: "More speed", cost: 100, level: 1 },
    { name: "More damage", cost: 200, level: 2 },
  ],
  tick() {
    this.exp += 1;
  },
});

setInterval(() => {
  game.tick();
}, 100);

export default game;
