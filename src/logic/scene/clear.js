// @flow
import type { UserConfig } from "src/config"
import type { State } from "src/state"

export type SceneState = {}

export function createInitialSceneState(_userConfig: UserConfig): SceneState {
  return {}
}

export function logic(state: State): State {
  return state
}
