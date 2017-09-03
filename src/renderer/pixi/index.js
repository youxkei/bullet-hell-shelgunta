// @flow
import { Application, Texture, Graphics, Container, ticker } from "pixi.js"

import type { UserConfig } from "src/config"
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"
import { Renderer } from "src/renderer/renderer"
import { Bullet } from "src/renderer/pixi/bullet"
import { Laser } from "src/renderer/pixi/laser"

type Textures = {
  +circle: {
    +red: Texture,
    +white: Texture,
  },
  +rect: {
    +red: Texture,
    +white: Texture,
  },
}

function createTextures(): Textures {
  const graphics = new Graphics()

  graphics.beginFill(0xff0000, 1)
  graphics.drawCircle(0, 0, 64)
  graphics.endFill()
  const redCircleTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0xffffff, 1)
  graphics.drawCircle(0, 0, 64)
  graphics.endFill()
  const whiteCircleTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0xff0000, 1)
  graphics.drawRect(-64, -64, 64, 64)
  graphics.endFill()
  const redRectTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0xffffff, 1)
  graphics.drawRect(-64, -64, 64, 64)
  graphics.endFill()
  const whiteRectTexture = graphics.generateCanvasTexture()

  return {
    circle: {
      red: redCircleTexture,
      white: whiteCircleTexture,
    },
    rect: {
      red: redRectTexture,
      white: whiteRectTexture,
    },
  }
}

export class PIXIRenderer extends Renderer {
  _application: Application
  _textures: Textures

  _frontContainer: Container
  _backContainer: Container

  _bullets: { normal: Bullet[] }
  _lasers: { normal: Laser[] }

  constructor(state: State, userConfig: UserConfig) {
    super(state, userConfig)

    ticker.shared.autoStart = false
    ticker.shared.stop()
    this._application = new Application(SYSTEM_CONFIG.screen.width, SYSTEM_CONFIG.screen.height, {
      autoStart: false,
      antialias: true,
    })
    this._application.ticker.stop()

    this._textures = createTextures()

    this._frontContainer = new Container()
    this._backContainer = new Container()

    this._application.stage.addChild(this._backContainer)
    this._application.stage.addChild(this._frontContainer)

    this._bullets = {
      normal: state.scene.game.pool.bullet.normal.pool.map(
        bulletState =>
          new Bullet({
            bulletState,
            frontWidth: 18,
            frontHeight: 18,
            frontTexture: this._textures.circle.white,
            frontContainer: this._frontContainer,
            backWidth: 24,
            backHeight: 24,
            backTexture: this._textures.circle.red,
            backContainer: this._backContainer,
          })
      ),
    }

    this._lasers = {
      normal: state.scene.game.pool.laser.normal.pool.map(
        laserState =>
          new Laser({
            laserState,
            frontWidth: 18,
            frontHeight: 18,
            frontNodeTexture: this._textures.circle.white,
            frontEdgeTexture: this._textures.rect.white,
            frontContainer: this._frontContainer,
            backWidth: 24,
            backHeight: 24,
            backNodeTexture: this._textures.circle.red,
            backEdgeTexture: this._textures.rect.red,
            backContainer: this._backContainer,
          })
      ),
    }
  }

  addRenderedCanvasToNode(node: Node) {
    node.appendChild(this._application.view)
  }

  // TODO 'sync' should be named more properly
  _sync() {
    for (const bullet of this._bullets.normal) {
      bullet.sync()
    }

    for (const laser of this._lasers.normal) {
      laser.sync()
    }
  }

  render() {
    this._sync()
    this._application.render()
  }
}
