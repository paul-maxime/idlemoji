import { reactive } from "vue";

export default reactive({
  available: [
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
});
