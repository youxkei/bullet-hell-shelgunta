// @flow
import type { UserConfig, BulletKindTo, LaserKindTo } from "src/config"
import type { BulletActionKind } from "src/logic/scene/game/action"
import { SYSTEM_CONFIG, bulletKindTo, laserKindTo } from "src/config"

export type Point = {
  x: number,
  y: number,
}

// TODO should be named more properly
export type Active = {
  active: boolean,
}

type Action<K> = {
  kind: K,
  count: number,
}

export type Bullet = Active & Point & {
  angle: number,
  speed: number,
  angularVelocity: number,
  +action: Action<BulletActionKind>,
}

export type Laser = Bullet & {
  +points: $ReadOnlyArray<Point>,
}

export type Stage = {
  stageNumber: 1 | 2 | 3,
  frameCount: number,
}

type Pool<T> = {
  +pool: $ReadOnlyArray<T>,
  nextIndex: number,
}

export type State = {
  +stage: Stage,
  +pool: {
    +bullet: BulletKindTo<Pool<Bullet>>,
    +laser: LaserKindTo<Pool<Laser>>,
  },
}

export function createInitialState(_: UserConfig): State {
  return {
    stage: {
      stageNumber: 1,
      frameCount: 0,
    },
    pool: {
      bullet: bulletKindTo(bulletKind => ({
        pool: Array(SYSTEM_CONFIG.scene.game.bullet[bulletKind].poolSize).fill().map(() => ({
          active: false,
          x: 0,
          y: 0,
          angle: 0,
          speed: 0,
          angularVelocity: 0,
          action: {
            kind: "nop",
            count: 0,
          },
        })),
        nextIndex: 0,
      })),
      laser: laserKindTo(laserKind => ({
        pool: Array(SYSTEM_CONFIG.scene.game.laser[laserKind].poolSize).fill().map(() => ({
          active: false,
          x: 0,
          y: 0,
          angle: 0,
          speed: 0,
          angularVelocity: 0,
          action: {
            kind: "nop",
            count: 0,
          },
          points: Array(SYSTEM_CONFIG.scene.game.laser.normal.length).fill().map(() => ({ x: 0, y: 0 })),
        })),
        nextIndex: 0,
      })),
    },
  }
}
