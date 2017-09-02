// @flow
import type { State } from "src/state"
import { logic as stage1Logic } from "src/logic/scene/game/stage/1.js"
import { logic as stage2Logic } from "src/logic/scene/game/stage/2.js"
import { logic as stage3Logic } from "src/logic/scene/game/stage/3.js"

function move(state: State): State {
  for (const bullet of state.scene.game.pool.bullet.normal.pool) {
    if (bullet.active) {
      bullet.x += Math.floor(Math.cos(bullet.direction) * bullet.speed)
      bullet.y += Math.floor(Math.sin(bullet.direction) * bullet.speed)
    }
  }

  return state
}

export function logic(state: State): State {
  let changingState = state

  switch (state.scene.game.stage.stageNumber) {
    case 1:
      changingState = stage1Logic(changingState)
      break

    case 2:
      changingState = stage2Logic(changingState)
      break

    case 3:
      changingState = stage3Logic(changingState)
      break

    default:
      ;(state.scene.game.stage.stageNumber: empty)
      throw "switch statement should be exhaustive"
  }

  changingState = move(changingState)

  return changingState
}
