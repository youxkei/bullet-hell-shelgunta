// @flow
import type { State } from "src/state"
import { logic as stage1Logic } from "src/logic/scene/game/stage/1"
import { logic as stage2Logic } from "src/logic/scene/game/stage/2"
import { logic as stage3Logic } from "src/logic/scene/game/stage/3"
import { BULLET_ACTIONS } from "src/logic/scene/game/action"

function doAction(state: State): State {
  for (const bullet of state.scene.game.pool.bullet.normal.pool) {
    if (bullet.active) {
      BULLET_ACTIONS[bullet.action.kind](bullet)
    }
  }

  for (const laser of state.scene.game.pool.laser.normal.pool) {
    if (laser.active) {
      BULLET_ACTIONS[laser.action.kind](laser)
    }
  }

  return state
}

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
      laser.x += Math.cos(laser.angle) * laser.speed
      laser.y += Math.sin(laser.angle) * laser.speed

      for (let i = laser.points.length - 1; i >= 1; --i) {
        laser.points[i].x = laser.points[i - 1].x
        laser.points[i].y = laser.points[i - 1].y
      }

      laser.points[0].x = laser.x
      laser.points[0].y = laser.y

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

  changingState = doAction(changingState)
  changingState = move(changingState)

  return changingState
}
