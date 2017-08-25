// @flow
import type { State } from "src/state"
import { logic as stage1Logic } from "src/logic/scene/game/stage/1.js"
import { logic as stage2Logic } from "src/logic/scene/game/stage/2.js"
import { logic as stage3Logic } from "src/logic/scene/game/stage/3.js"

export function logic(state: State): State {
  switch (state.scene.game.stage.stageNumber) {
    case 1:
      return stage1Logic(state)

    case 2:
      return stage2Logic(state)

    case 3:
      return stage3Logic(state)

    default:
      ;(state.scene.game.stage.stageNumber: empty)
      throw "switch statement should be exhaustive"
  }
}
