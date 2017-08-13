// @flow
import type { State } from "../state"

import { logic as titleSceneLogic } from "./scene/title"
import { logic as gameSceneLogic } from "./scene/game"
import { logic as clearSceneLogic } from "./scene/clear"
import { logic as gameOverSceneLogic } from "./scene/gameover"

export function logic(state: State): State {
  switch (state.currentScene) {
    case "TITLE":
      return titleSceneLogic(state)

    case "GAME":
      return gameSceneLogic(state)

    case "CLEAR":
      return clearSceneLogic(state)

    case "GAME_OVER":
      return gameOverSceneLogic(state)

    default:
      ;(state.currentScene: empty)
      throw "switch statement should be exhaustive"
  }
}
