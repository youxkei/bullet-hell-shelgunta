// @flow
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"
import type { BulletActionKind } from "src/logic/scene/game/action"

export function shootNormalBullet(
  state: State,
  x: number,
  y: number,
  angle: number,
  speed: number,
  angularVelocity: number,
  actionKind: BulletActionKind
): State {
  const pool = state.scene.game.pool.bullet.normal

  pool.pool[pool.nextIndex].active = true
  pool.pool[pool.nextIndex].x = x
  pool.pool[pool.nextIndex].y = y
  pool.pool[pool.nextIndex].angle = angle
  pool.pool[pool.nextIndex].speed = speed
  pool.pool[pool.nextIndex].angularVelocity = angularVelocity
  pool.pool[pool.nextIndex].action.kind = actionKind
  pool.pool[pool.nextIndex].action.count = 0

  pool.nextIndex++
  if (SYSTEM_CONFIG.scene.game.bullet.normal.poolSize <= pool.nextIndex) {
    pool.nextIndex = 0
  }

  return state
}

export function shootNormalLaser(
  state: State,
  x: number,
  y: number,
  angle: number,
  speed: number,
  angularVelocity: number,
  actionKind: BulletActionKind
): State {
  const pool = state.scene.game.pool.laser.normal

  pool.pool[pool.nextIndex].active = true
  pool.pool[pool.nextIndex].x = x
  pool.pool[pool.nextIndex].y = y
  pool.pool[pool.nextIndex].angle = angle
  pool.pool[pool.nextIndex].speed = speed
  pool.pool[pool.nextIndex].angularVelocity = angularVelocity
  pool.pool[pool.nextIndex].action.kind = actionKind
  pool.pool[pool.nextIndex].action.count = 0

  for (const point of pool.pool[pool.nextIndex].points) {
    point.x = x
    point.y = y
  }

  pool.nextIndex++
  if (SYSTEM_CONFIG.scene.game.laser.normal.poolSize <= pool.nextIndex) {
    pool.nextIndex = 0
  }

  return state
}
