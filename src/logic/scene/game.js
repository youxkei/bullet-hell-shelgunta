// @flow
import type { UserConfig } from "../../config"
import type { State } from "../../state"
import { SYSTEM_CONFIG } from "../../config"

import { logic as stage1Logic } from "./game/stage/1.js"
import { logic as stage2Logic } from "./game/stage/2.js"
import { logic as stage3Logic } from "./game/stage/3.js"

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
    radius: number,
    speed: number,
    direction: number,
  }

export type Laser = Bullet & {
  tailPoints: Point[],
}

export type Stage = {
  stageNumber: 1 | 2 | 3,
  frameCount: number,
}

export type SceneState = {
  stage: Stage,
  bullets: {
    normal: Bullet[],
  },
  lasers: {
    normal: Laser[],
  },
}

export function createInitialSceneState(_userConfig: UserConfig): SceneState {
  return {
    stage: {
      stageNumber: 1,
      frameCount: 0,
    },
    bullets: {
      normal: new Array(SYSTEM_CONFIG.scene.game.bullet.maxNumber).map(_ => ({
        active: false,
        x: 0,
        y: 0,
        radius: 0,
        speed: 0,
        direction: 0,
      })),
    },
    lasers: {
      normal: new Array(SYSTEM_CONFIG.scene.game.laser.maxNumber).map(_ => ({
        active: false,
        x: 0,
        y: 0,
        radius: 0,
        speed: 0,
        direction: 0,
        tailPoints: new Array(SYSTEM_CONFIG.scene.game.laser.tailLength).map(_ => ({ x: 0, y: 0 })),
      })),
    },
  }
}

export function logic(state: State): State {
  switch (state.scenes.game.stage.stageNumber) {
    case 1:
      return stage1Logic(state)

    case 2:
      return stage2Logic(state)

    case 3:
      return stage3Logic(state)

    default:
      ;(state.scenes.game.stage.stageNumber: empty)
      throw "switch statement should be exhaustive"
  }
}
