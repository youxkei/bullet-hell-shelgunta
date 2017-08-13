// @flow
import type { State } from "../../../../state"

import { shootNormalLaser } from "../bullet"

export function logic(state: State): State {
  if (state.scenes.game.stage.frameCount % 180 === 0) {
  }

  state.scenes.game.stage.frameCount++
  return state
}
