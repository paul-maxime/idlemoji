import _ from "lodash";
import twemoji from "twemoji";

const MAX_DISPLAYED_CELLS = 20;

export function updateLevel(game) {
  const entityMax = _.max(game.entities.map((x) => x.position));
  const playerPosition = game.entities[0].position;

  const entitiesMapped = new Map();
  for (const entity of game.entities) {
    entitiesMapped.set(entity.position, entity);
  }

  let levelStringToBuild = "";

  let start = 0;
  let end = entityMax;
  if (entityMax > MAX_DISPLAYED_CELLS) {
    if (playerPosition >= 3) {
      if (playerPosition >= entityMax - MAX_DISPLAYED_CELLS) {
        start = entityMax - MAX_DISPLAYED_CELLS;
        end = entityMax;
      } else {
        start = playerPosition - 3;
        end = start + MAX_DISPLAYED_CELLS;
      }
    } else {
      end = MAX_DISPLAYED_CELLS;
    }
  }

  console.log(start, end);
  for (let i = start; i <= end; i += 1) {
    const entity = entitiesMapped.get(i);
    if (game.isGameOver && entity?.type !== "🐉") {
      levelStringToBuild += game.currentArea.fire;
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
