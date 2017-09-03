// @flow
import type { UserConfig } from "src/config"
import { SYSTEM_CONFIG } from "src/config"

export type Point = {
  x: number,
  y: number,
}

// TODO 'Active' should be named more properly
export type Active = {
  active: boolean,
}

type BulletWithoutPoint = Active & {
  angle: number,
  speed: number,
  angularVelocity: number,
}

export type Bullet = BulletWithoutPoint & Point

export type Laser = BulletWithoutPoint & {
  +points: Point[],
}

export type Stage = {
  stageNumber: 1 | 2 | 3,
  frameCount: number,
}

type Pool<T> = {
  +pool: T[],
  nextIndex: number,
}

export type State = {
  +stage: Stage,
  +pool: {
    +bullet: {
      +normal: Pool<Bullet>,
    },
    +laser: {
      +normal: Pool<Laser>,
    },
  },
}

export function createInitialState(_: UserConfig): State {
  return {
    stage: {
      stageNumber: 1,
      frameCount: 0,
    },
    pool: {
      bullet: {
        normal: {
          pool: Array(SYSTEM_CONFIG.scene.game.bullet.normal.poolSize).fill().map(() => ({
            active: false,
            x: 0,
            y: 0,
            angle: 0,
            speed: 0,
            angularVelocity: 0,
          })),
          nextIndex: 0,
        },
      },
      laser: {
        normal: {
          pool: Array(SYSTEM_CONFIG.scene.game.laser.normal.poolSize).fill().map(() => ({
            active: false,
            angle: 0,
            speed: 0,
            angularVelocity: 0,
            points: Array(SYSTEM_CONFIG.scene.game.laser.normal.length).fill().map(() => ({ x: 0, y: 0 })),
          })),
          nextIndex: 0,
        },
      },
    },
  }
}
