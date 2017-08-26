// @flow
import { Application, Sprite } from "pixi.js"

import type { UserConfig } from "src/config"
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"
import { Renderer } from "src/renderer/renderer"

export class PIXIRenderer extends Renderer {
  _application: Application

  constructor(state: State, userConfig: UserConfig) {
    super(state, userConfig)

    this._application = new Application(SYSTEM_CONFIG.screen.width, SYSTEM_CONFIG.screen.height, {
      autoStart: false,
      antialias: true,
    })
  }

  addRenderedCanvasToNode(node: Node) {
    node.appendChild(this._application.view)
  }

  render() {
    this._application.render()
  }
}
