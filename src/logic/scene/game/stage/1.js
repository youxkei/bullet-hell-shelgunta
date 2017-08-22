// @flow
import type { State } from "src/state"
import { shootNormalLaser } from "src/logic/scene/game/bullet"

export function logic(state: State): State {
  if (state.scenes.game.stage.frameCount % 180 === 0) {
  }

  state.scenes.game.stage.frameCount++
  return state
}
