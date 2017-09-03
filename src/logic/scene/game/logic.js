// @flow
import type { State } from "src/state"
import { logic as stage1Logic } from "src/logic/scene/game/stage/1.js"
import { logic as stage2Logic } from "src/logic/scene/game/stage/2.js"
import { logic as stage3Logic } from "src/logic/scene/game/stage/3.js"

function move(state: State): State {
  for (const bullet of state.scene.game.pool.bullet.normal.pool) {
    if (bullet.active) {
      bullet.x += Math.cos(bullet.angle) * bullet.speed
      bullet.y += Math.sin(bullet.angle) * bullet.speed

      bullet.angle += bullet.angularVelocity
    }
  }

  for (const laser of state.scene.game.pool.laser.normal.pool) {
    if (laser.active) {
      for (let i = laser.points.length - 1; i >= 1; --i) {
        laser.points[i].x = laser.points[i - 1].x
        laser.points[i].y = laser.points[i - 1].y
      }

      laser.points[0].x += Math.cos(laser.angle) * laser.speed
      laser.points[0].y += Math.sin(laser.angle) * laser.speed

      laser.angle += laser.angularVelocity
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
