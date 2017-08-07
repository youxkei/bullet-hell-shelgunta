// @flow
import type { UserConfig } from "../config"
import type { Shelgunta } from "../shelgunta"
import { SYSTEM_CONFIG } from "../config"

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

export type Scene = {
  stage: Stage,
  bullets: {
    normal: Bullet[],
  },
  lasers: {
    normal: Laser[],
  },
}

export function createInitialScene(_userConfig: UserConfig): Scene {
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
        tailPoints: new Array(SYSTEM_CONFIG.scene.game.laser.maxTailPointsNumber).map(_ => ({ x: 0, y: 0 })),
      })),
    },
  }
}

export function run(shelgunta: Shelgunta): Shelgunta {
  switch (shelgunta.scenes.game.stage.stageNumber) {
    case 1:
      return runStage1(shelgunta)

    case 2:
      return runStage2(shelgunta)

    case 3:
      return runStage3(shelgunta)

    default:
      ;(shelgunta.scenes.game.stage.stageNumber: empty)
      throw "switch statement should be exhaustive"
  }
}

function runStage1(shelgunta: Shelgunta): Shelgunta {
  return shelgunta
}

function runStage2(shelgunta: Shelgunta): Shelgunta {
  return shelgunta
}

function runStage3(shelgunta: Shelgunta): Shelgunta {
  return shelgunta
}
