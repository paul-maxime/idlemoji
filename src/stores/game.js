import { reactive } from "vue";

const game = reactive({
  remainingTime: 100,
  isGameOver: false,
  respawnTimer: 10,
  player: {
    exp: 100,
    speed: 1,
    position: 0,
  },
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
    if (this.isGameOver) {
      this.respawnTimer -= 1;
      if (this.respawnTimer <= 0) {
        this.respawn();
      }
      return;
    }
    this.remainingTime -= 1;
    if (this.remainingTime <= 0) {
      this.gameOver();
    }
  },
  gameOver() {
    this.isGameOver = true;
    this.respawnTimer = 10;
  },
  respawn() {
    this.isGameOver = false;
    this.remainingTime = 100;
  },
});

setInterval(() => {
  game.tick();
}, 100);

export default game;
