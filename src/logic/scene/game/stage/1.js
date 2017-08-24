// @flow
import type { State } from "src/state"
import { shootNormalBullet } from "src/logic/scene/game/shoot"

export function logic(state: State): State {
  const stage = state.scenes.game.stage

  if (stage.frameCount % 180 === 0) {
    shootNormalBullet(state, true, 0, 0, 0, 3)
  }

  stage.frameCount++
  return state
}
