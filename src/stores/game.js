import { reactive } from "vue";

const game = reactive({
  remainingTime: 100,
  isGameOver: false,
  respawnTimer: 10,
  player: {
    gold: 0,
    speed: 10,
    attack: 10,
    currentMovement: 0,
  },
  entities: [],
  battle: {
    isBattling: false,
    enemy: null,
  },
  gold: 100,
  upgrades: [
    { name: "More speed", cost: 100, level: 1 },
    { name: "More damage", cost: 200, level: 2 },
  ],
  tick() {
    if (this.entities.length === 1) {
      // We won!
      return;
    }
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
      return;
    }
    if (this.battle.isBattling) {
      this.battle.enemy.health -= this.player.attack;
      if (this.battle.enemy.health <= 0) {
        this.battle.isBattling = false;
        this.player.gold += this.battle.enemy.gold;
        const index = this.entities.findIndex((x) => x === this.battle.enemy);
        this.entities.splice(index, 1);
        this.battle.enemy = null;
      }
      return;
    }
    this.player.currentMovement += this.player.speed;
    if (this.player.currentMovement >= 100) {
      this.player.currentMovement -= 100;
      this.movePlayer();
    }
  },
  gameOver() {
    this.isGameOver = true;
    this.respawnTimer = 10;
  },
  respawn() {
    this.isGameOver = false;
    this.remainingTime = 100;
    this.battle.isBattling = false;
    this.initEntities();
  },
  movePlayer() {
    this.entities[0].position += 1;
    if (this.entities[0].position + 1 === this.entities[1].position) {
      this.battle.isBattling = true;
      this.player.currentMovement = 0;
      this.battle.enemy = this.entities[1];
    }
  },
  initEntities() {
    this.entities.splice(0, this.entities.length);
    this.entities.push(
      { type: "⚔", position: 0 },
      { type: "🐔", position: 5, health: 300, gold: 5 },
      { type: "🦧", position: 10, health: 1000, gold: 20 },
      { type: "🐉", position: 20, health: 50000, gold: 0 }
    );
  },
});

game.respawn();
setInterval(() => {
  game.tick();
}, 100);

export default game;
