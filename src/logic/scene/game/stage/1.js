// @flow
import type { State } from "src/state"
import { shootNormalBullet } from "src/logic/scene/game/shoot"

export function logic(state: State): State {
  const stage = state.scene.game.stage

  if (stage.frameCount % 180 === 0) {
    shootNormalBullet(state, true, 1024, 1024, Math.PI / 2 - 0.5, 12)
  }

  stage.frameCount++
  return state
}
