import _ from "lodash";
import { computed, reactive } from "vue";
import unlocks from "./unlocks.js";
import logger from "./logger.js";
import areas from "./areas.js";

const game = reactive({
  currentRun: 0,
  remainingTime: 100,
  isGameWon: false,
  isGameOver: false,
  isInterfaceHidden: false,
  respawnTimer: 0,
  area: 0,
  currentArea: computed(() => areas[game.area]),
  areaSize: computed(() => _.max(areas[game.area].entities.map((x) => x.position))),
  player: {
    attack: 10,
    attackSpeed: 10,
    movementSpeed: 10,
    currentMovement: 0,
    currentAttack: 0,
    goldBonus: 0,
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
        game.player.movementSpeed = 10 + (this.level - 1) * 2;
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
    {
      name: "Luck",
      level: 1,
      upgradeCost: 10,
      description: () => `${game.player.goldBonus}% more gold`,
      apply() {
        game.player.goldBonus = (this.level - 1) * 10;
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
    if (this.handleGameSuccess()) {
      return;
    }
    if (this.handleGameOver()) {
      return;
    }
    if (this.battle.isBattling) {
      this.player.currentAttack += this.player.attackSpeed;
      while (this.battle.isBattling && this.player.currentAttack >= 100) {
        this.player.currentAttack -= 100;
        this.attackEnemy();
      }
      return;
    }
    this.player.currentMovement += this.player.movementSpeed;
    while (this.player.currentMovement >= 100 && !this.battle.isBattling) {
      this.player.currentMovement -= 100;
      this.movePlayer();
    }
  },
  handleGameSuccess() {
    if (this.isGameWon) {
      this.respawnTimer -= 1;
      if (this.respawnTimer === 60) {
        logger.emit("game-won", game.currentRun);
        this.isInterfaceHidden = true;
      }
      if (this.respawnTimer === 40) {
        this.area = (this.area + 1) % areas.length;
        logger.emit("change-area", areas[this.area].name);
      }
      if (this.respawnTimer === 20) {
        this.isInterfaceHidden = false;
        this.initEntities();
      }
      if (this.respawnTimer <= 0) {
        this.isGameWon = false;
        this.respawn();
      }
      return true;
    }
    if (this.entities.length === 1) {
      this.isGameWon = true;
      this.respawnTimer = 80;
      return true;
    }
    return false;
  },
  handleGameOver() {
    if (this.isGameOver) {
      this.respawnTimer -= 1;
      if (this.respawnTimer <= 0) {
        this.respawn();
      }
      return true;
    }
    this.remainingTime -= 1;
    if (this.remainingTime <= 0) {
      this.gameOver();
      return true;
    }
    return false;
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
      this.battle.enemy.gold = Math.ceil(this.battle.enemy.gold * (1 + this.player.goldBonus / 100));
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

    this.entities.push({ type: "⚔", position: 0 }, ..._.cloneDeep(areas[this.area].entities));

    for (const entity of this.entities) {
      entity.maxHealth = entity.health;
    }
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
