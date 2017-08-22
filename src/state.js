// @flow
import type { UserConfig } from "src/config"
import type { SceneState as TitleSceneState } from "src/logic/scene/title"
import type { SceneState as GameSceneState } from "src/logic/scene/game/scenestate"
import type { SceneState as ClearSceneState } from "src/logic/scene/clear"
import type { SceneState as GameOverSceneState } from "src/logic/scene/gameover"
import { createInitialSceneState as createInitialTitleSceneState } from "src/logic/scene/title"
import { createInitialSceneState as createInitialGameSceneState } from "src/logic/scene/game/logic"
import { createInitialSceneState as createInitialClearSceneState } from "src/logic/scene/clear"
import { createInitialSceneState as createInitialGameOverSceneState } from "src/logic/scene/gameover"

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
