// @flow
import type { State } from "src/state"

export function logic(state: State): State {
  state.currentScene = "GAME"
  return state
}
