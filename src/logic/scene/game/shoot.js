// @flow
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"

export function shootNormalBullet(
  state: State,
  active: boolean,
  x: number,
  y: number,
  direction: number,
  speed: number
): State {
  const pool = state.scene.game.pool.bullet.normal

  pool.pool[pool.nextIndex].active = active
  pool.pool[pool.nextIndex].x = x
  pool.pool[pool.nextIndex].y = y
  pool.pool[pool.nextIndex].direction = direction
  pool.pool[pool.nextIndex].speed = speed

  pool.nextIndex++
  if (SYSTEM_CONFIG.scene.game.bullet.normal.poolSize <= pool.nextIndex) {
    pool.nextIndex = 0
  }

  return state
}
