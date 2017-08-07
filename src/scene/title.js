// @flow
import type { UserConfig } from "../config"
import type { Shelgunta } from "../shelgunta"

export type Scene = {}

export function createInitialScene(_userConfig: UserConfig): Scene {
  return {}
}

export function run(shelgunta: Shelgunta): Shelgunta {
  shelgunta.currentScene = "GAME"
  return shelgunta
}
