// @flow
import type { UserConfig } from "../../config"
import type { State } from "../../state"

export type SceneState = {}

export function createInitialSceneState(_userConfig: UserConfig): SceneState {
  return {}
}

export function logic(state: State): State {
  state.currentScene = "GAME"
  return state
}
