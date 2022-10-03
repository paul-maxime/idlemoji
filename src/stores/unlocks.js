import { computed, reactive } from "vue";

const FEATURES = [
  { id: "gold-display", text: "Unlock the current gold", cost: 5 },
  { id: "level-gui", text: "Unlock the graphical interface", cost: 10 },
  { id: "hero-stats", text: "Unlock the hero upgrades", cost: 10 },
  { id: "remaining-time", text: "Unlock the remaining time", cost: 100 },
  { id: "hero-stats-details", text: "Unlock the upgrade details", cost: 200 },
  { id: "battle-info", text: "Unlock the battle information", cost: 500 },
];

const unlocked = reactive({
  unlocked: new Set(),
  next: computed(() => {
    const available = FEATURES.filter((x) => !unlocked.has(x.id));
    return available.length ? available[0] : null;
  }),
  unlock(id) {
    const unlock = FEATURES.find((x) => x.id === id);
    if (unlock) {
      this.unlocked.add(id);
    }
  },
  has(id) {
    return this.unlocked.has(id);
  },
});

export default unlocked;
