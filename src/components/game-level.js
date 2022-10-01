import twemoji from "twemoji";

export function updateLevel(newGame) {
  const entitieMax = newGame.entities.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.position),
    0
  );
  console.log(entitieMax);
  const entitiesMapped = new Map();
  let levelStringToBuild = "";
  for (const entitie of newGame.entities) {
    entitiesMapped.set(entitie.position, entitie);
  }

  for (let i = 0; i <= entitieMax; i += 1) {
    const entity = entitiesMapped.get(i);
    if (entity != undefined) {
      levelStringToBuild += twemoji.parse(entity.type);
    } else {
      levelStringToBuild += twemoji.parse(" ");
    }
  }
  return levelStringToBuild;
}
