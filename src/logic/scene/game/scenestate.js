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

export type Bullet = Active &
  Point & {
    direction: number,
    speed: number,
  }

export type Laser = Bullet & {
  tailPoints: Point[],
}

export type Stage = {
  stageNumber: 1 | 2 | 3,
  frameCount: number,
}

type Pool<T> = {
  pool: T[],
  nextIndex: number,
}

export type SceneState = {
  stage: Stage,
  pools: {
    bullet: {
      normal: Pool<Bullet>,
    },
    laser: {
      normal: Pool<Laser>,
    },
  },
}

export function createInitialSceneState(_: UserConfig): SceneState {
  return {
    stage: {
      stageNumber: 1,
      frameCount: 0,
    },
    pools: {
      bullet: {
        normal: {
          pool: new Array(SYSTEM_CONFIG.scene.game.bullet.normal.poolSize).map(_ => ({
            active: false,
            x: 0,
            y: 0,
            direction: 0,
            speed: 0,
          })),
          nextIndex: 0,
        },
      },
      laser: {
        normal: {
          pool: new Array(SYSTEM_CONFIG.scene.game.laser.normal.poolSize).map(_ => ({
            active: false,
            x: 0,
            y: 0,
            direction: 0,
            speed: 0,
            tailPoints: new Array(SYSTEM_CONFIG.scene.game.laser.normal.tailLength).map(_ => ({ x: 0, y: 0 })),
          })),
          nextIndex: 0,
        },
      },
    },
  }
}
