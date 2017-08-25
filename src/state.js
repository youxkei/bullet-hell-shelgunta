// @flow
import type { UserConfig } from "src/config"
import type { State as TitleSceneState } from "src/logic/scene/title/state"
import type { State as GameSceneState } from "src/logic/scene/game/state"
import type { State as ClearSceneState } from "src/logic/scene/clear/state"
import type { State as GameOverSceneState } from "src/logic/scene/gameover/state"
import { createInitialState as createInitialTitleSceneState } from "src/logic/scene/title/state"
import { createInitialState as createInitialGameSceneState } from "src/logic/scene/game/state"
import { createInitialState as createInitialClearSceneState } from "src/logic/scene/clear/state"
import { createInitialState as createInitialGameOverSceneState } from "src/logic/scene/gameover/state"

export type State = {
  currentScene: "TITLE" | "GAME" | "CLEAR" | "GAME_OVER",
  +scene: {
    +title: TitleSceneState,
    +game: GameSceneState,
    +clear: ClearSceneState,
    +gameOver: GameOverSceneState,
  },
}

export function createInitialState(userConfig: UserConfig): State {
  return {
    currentScene: "TITLE",
    scene: {
      title: createInitialTitleSceneState(userConfig),
      game: createInitialGameSceneState(userConfig),
      clear: createInitialClearSceneState(userConfig),
      gameOver: createInitialGameOverSceneState(userConfig),
    },
  }
}
