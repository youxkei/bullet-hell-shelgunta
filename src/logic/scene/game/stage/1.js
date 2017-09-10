// @flow
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"
import { shootNormalBullet, shootNormalLaser } from "src/logic/scene/game/shoot"

const NUM_BULLET_WAYS = 128
const NUM_LASER_WAYS = 32

export function logic(state: State): State {
  const stage = state.scene.game.stage

  if (stage.frameCount % 20 === 0) {
    const baseAngle = Math.PI * 2 * Math.random()

    for (let i = 0; i < NUM_BULLET_WAYS; ++i) {
      shootNormalBullet(
        state,
        SYSTEM_CONFIG.screen.width / 2,
        SYSTEM_CONFIG.screen.height / 4,
        baseAngle + Math.PI * 2 / NUM_BULLET_WAYS * i,
        3,
        0,
        "nop",
      )
    }
  }

  if (stage.frameCount % 200 === 0) {
    const baseAngle = Math.PI * 2 * Math.random()

    for (let i = 0; i < NUM_LASER_WAYS; ++i) {
      shootNormalLaser(
        state,
        SYSTEM_CONFIG.screen.width / 2,
        SYSTEM_CONFIG.screen.height / 4,
        baseAngle + Math.PI * 2 / NUM_LASER_WAYS * i,
        4,
        0.007,
        "nop",
      )
    }

    for (let i = 0; i < NUM_LASER_WAYS; ++i) {
      shootNormalLaser(
        state,
        SYSTEM_CONFIG.screen.width / 2,
        SYSTEM_CONFIG.screen.height / 4,
        baseAngle + Math.PI * 2 / NUM_LASER_WAYS * i,
        4,
        -0.007,
        "nop",
      )
    }
  }

  stage.frameCount++
  return state
}
