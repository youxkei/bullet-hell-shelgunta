// @flow
import type { UserConfig } from "src/config"
import type { State } from "src/state"

export class Renderer {
  _state: State
  _userConfig: UserConfig

  constructor(state: State, userConfig: UserConfig) {
    this._state = state
    this._userConfig = userConfig
  }

  addRenderedCanvasToNode(_: Node) {} // eslint-disable-line class-methods-use-this
  render() {} // eslint-disable-line class-methods-use-this
}
