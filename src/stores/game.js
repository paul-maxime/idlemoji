import { reactive } from "vue";
import unlocks from "./unlocks.js";
import logger from "./logger.js";

const game = reactive({
  currentRun: 0,
  remainingTime: 100,
  isGameOver: false,
  respawnTimer: 0,
  player: {
    attack: 10,
    attackSpeed: 10,
    movementSpeed: 10,
    currentMovement: 0,
    currentAttack: 0,
  },
  gold: 0,
  entities: [],
  battle: {
    isBattling: false,
    enemy: null,
  },
  unlocks: unlocks,
  stats: [
    {
      name: "Strength",
      level: 1,
      upgradeCost: 10,
      description: () => `${game.player.attack} damage per hit`,
      apply() {
        game.player.attack = 9 + this.level * this.level;
      },
    },
    {
      name: "Speed",
      level: 1,
      upgradeCost: 10,
      description: () =>
        `${game.player.movementSpeed / 10} cell${game.player.movementSpeed >= 20 ? "s" : ""} per second`,
      apply() {
        game.player.movementSpeed = 5 + this.level * 5;
      },
    },
    {
      name: "Velocity",
      level: 1,
      upgradeCost: 10,
      description: () => `${game.player.attackSpeed / 10} attack${game.player.attackSpeed >= 20 ? "s" : ""} per second`,
      apply() {
        game.player.attackSpeed = 5 + this.level * 5;
      },
    },
  ],
  upgradeStat(stat) {
    if (this.gold < stat.upgradeCost) {
      return;
    }
    this.gold -= stat.upgradeCost;
    stat.level += 1;
    stat.upgradeCost = stat.level * 10;
    logger.emit("stat-upgraded", stat);
    stat.apply();
  },
  unlockFeature(feature) {
    if (this.gold < feature.cost) {
      return;
    }
    this.gold -= feature.cost;
    this.unlocks.unlock(feature.id);
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
      this.player.currentAttack += this.player.attackSpeed;
      if (this.player.currentAttack >= 100) {
        this.player.currentAttack -= 100;
        this.attackEnemy();
      }
      return;
    }
    this.player.currentMovement += this.player.movementSpeed;
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
    this.currentRun += 1;
    this.isGameOver = false;
    this.remainingTime = 100;
    this.battle.isBattling = false;
    this.initEntities();
    logger.emit("game-start", this.currentRun);
  },
  movePlayer() {
    this.entities[0].position += 1;
    if (this.entities[0].position + 1 === this.entities[1].position) {
      this.battle.isBattling = true;
      this.player.currentMovement = 0;
      this.player.currentAttack = 0;
      this.battle.enemy = this.entities[1];
      logger.emit("enemy-encountered", this.battle.enemy);
    }
  },
  attackEnemy() {
    this.battle.enemy.health -= this.player.attack;
    if (this.battle.enemy.health <= 0) {
      logger.emit("enemy-defeated", this.battle.enemy);
      this.battle.isBattling = false;
      this.gold += this.battle.enemy.gold;
      const index = this.entities.findIndex((x) => x === this.battle.enemy);
      this.entities.splice(index, 1);
      this.battle.enemy = null;
    }
  },
  initEntities() {
    this.entities.splice(0, this.entities.length);
    this.entities.push(
      { type: "⚔", position: 0 },
      { type: "🐁", name: "a mouse", position: 3, health: 25, gold: 5 },
      { type: "🐔", name: "a chicken", position: 5, health: 60, gold: 10 },
      { type: "🦧", name: "an orangutan", position: 9, health: 200, gold: 20 },
      { type: "⛄", name: "a snowman", position: 15, health: 1500, gold: 50 },
      { type: "🐉", name: "the dragon", position: 20, health: 5000, gold: 1000 }
    );
  },
});

game.respawn();

let lastUpdate = Date.now();
let pendingMilliseconds = 0;
setInterval(() => {
  const now = Date.now();
  let delta = now - lastUpdate;
  lastUpdate = now;
  if (delta < 0) delta = 0;
  if (delta > 5000) delta = 5000;
  pendingMilliseconds += delta;
  while (pendingMilliseconds > 100) {
    game.tick();
    pendingMilliseconds -= 100;
  }
}, 100);

export default game;
