import twemoji from "twemoji";

export function updateLevel(game, entityMax) {

  const entitiesMapped = new Map();
  let levelStringToBuild = "";
  for (const entity of game.entities) {
    entitiesMapped.set(entity.position, entity);
  }

  for (let i = 0; i <= entityMax; i += 1) {
    const entity = entitiesMapped.get(i);
    if (game.isGameOver && entity?.type !== "🐉") {
      levelStringToBuild += "🔥";
      continue;
    }
    if (entity) {
      levelStringToBuild += entity.type;
    } else {
      levelStringToBuild += " ";
    }
  }
  return twemoji.parse(levelStringToBuild, { className: "level-emoji" });
}
