import { reactive } from "vue";
import logger from "./logger";

const game = reactive({
  remainingTime: 100,
  isGameOver: false,
  respawnTimer: 0,
  player: {
    speed: 10,
    attack: 10,
    currentMovement: 0,
  },
  gold: 500,
  entities: [],
  battle: {
    isBattling: false,
    enemy: null,
  },
  upgrades: [
    {
      name: "More speed",
      cost: 100,
      level: 1,
      applyUpgrade: () => {
        game.player.speed += 5;
      },
    },
    {
      name: "More damage",
      cost: 100,
      level: 1,
      applyUpgrade: () => {
        game.player.attack += 5;
      },
    },
  ],
  buyUpgrade(upgrade) {
    if (game.gold < upgrade.cost) {
      return false;
    }
    game.gold -= upgrade.cost;
    upgrade.level += 1;
    upgrade.cost *= 2;
    upgrade.applyUpgrade();
  },
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
        logger.emit("enemy-defeated", this.battle.enemy);
        this.battle.isBattling = false;
        this.gold += this.battle.enemy.gold;
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
    this.respawnTimer = 20;
    logger.emit("game-over");
  },
  respawn() {
    this.isGameOver = false;
    this.remainingTime = 100;
    this.battle.isBattling = false;
    this.initEntities();
    logger.emit("start");
  },
  movePlayer() {
    this.entities[0].position += 1;
    if (this.entities[0].position + 1 === this.entities[1].position) {
      this.battle.isBattling = true;
      this.player.currentMovement = 0;
      this.battle.enemy = this.entities[1];
      logger.emit("enemy-encountered", this.battle.enemy);
    }
  },
  initEntities() {
    this.entities.splice(0, this.entities.length);
    this.entities.push(
      { type: "⚔", position: 0 },
      { type: "🐔", name: "a chicken", position: 5, health: 300, gold: 5 },
      { type: "🦧", name: "an orangutan", position: 10, health: 1000, gold: 20 },
      { type: "🐉", name: "the dragon", position: 20, health: 50000, gold: 0 }
    );
  },
});

game.respawn();
setInterval(() => {
  game.tick();
}, 100);

export default game;
