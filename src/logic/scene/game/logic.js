// @flow
import type { UserConfig } from "src/config"
import type { State } from "src/state"
import type { SceneState } from "src/logic/scene/game/scenestate"
import { SYSTEM_CONFIG } from "src/config"
import { logic as stage1Logic } from "src/logic/scene/game/stage/1.js"
import { logic as stage2Logic } from "src/logic/scene/game/stage/2.js"
import { logic as stage3Logic } from "src/logic/scene/game/stage/3.js"

export function createInitialSceneState(_: UserConfig): SceneState {
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
