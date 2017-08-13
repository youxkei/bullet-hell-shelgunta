// @flow
import type { UserConfig } from "./config"
import type { SceneState as TitleSceneState } from "./logic/scene/title"
import type { SceneState as GameSceneState } from "./logic/scene/game"
import type { SceneState as ClearSceneState } from "./logic/scene/clear"
import type { SceneState as GameOverSceneState } from "./logic/scene/gameover"
import { createInitialSceneState as createInitialTitleSceneState } from "./logic/scene/title"
import { createInitialSceneState as createInitialGameSceneState } from "./logic/scene/game"
import { createInitialSceneState as createInitialClearSceneState } from "./logic/scene/clear"
import { createInitialSceneState as createInitialGameOverSceneState } from "./logic/scene/gameover"

export type State = {
  currentScene: "TITLE" | "GAME" | "CLEAR" | "GAME_OVER",
  scenes: {
    title: TitleSceneState,
    game: GameSceneState,
    clear: ClearSceneState,
    gameOver: GameOverSceneState,
  },
}

export function createInitialState(userConfig: UserConfig): State {
  return {
    currentScene: "TITLE",
    scenes: {
      title: createInitialTitleSceneState(userConfig),
      game: createInitialGameSceneState(userConfig),
      clear: createInitialClearSceneState(userConfig),
      gameOver: createInitialGameOverSceneState(userConfig),
    },
  }
}
