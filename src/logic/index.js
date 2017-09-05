// @flow
import type { State } from "src/state";
import { logic as titleSceneLogic } from "src/logic/scene/title";
import { logic as gameSceneLogic } from "src/logic/scene/game";
import { logic as clearSceneLogic } from "src/logic/scene/clear";
import { logic as gameOverSceneLogic } from "src/logic/scene/gameover";

export function logic(state: State): State {
  switch (state.currentScene) {
    case "TITLE":
      return titleSceneLogic(state);

    case "GAME":
      return gameSceneLogic(state);

    case "CLEAR":
      return clearSceneLogic(state);

    case "GAME_OVER":
      return gameOverSceneLogic(state);

    default:
      (state.currentScene: empty);
      throw "switch statement should be exhaustive";
  }
}
