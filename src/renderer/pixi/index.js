// @flow
import { Application, Texture, Graphics, Container } from "pixi.js"

import type { UserConfig } from "src/config"
import type { State } from "src/state"
import { SYSTEM_CONFIG } from "src/config"
import { Renderer } from "src/renderer/renderer"
import { Bullet } from "src/renderer/pixi/bullet"
import { Laser } from "src/renderer/pixi/laser"

type Textures = {
  +circle: {
    +red: Texture,
    +black: Texture,
  },
  +rect: {
    +red: Texture,
    +black: Texture,
  },
}

const SCALING_FACTOR = 0.25

function createTextures(): Textures {
  const graphics = new Graphics()

  graphics.beginFill(0xff0000, 1)
  graphics.drawCircle(0, 0, 128)
  graphics.endFill()
  const redCircleTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0x000000, 1)
  graphics.drawCircle(0, 0, 128)
  graphics.endFill()
  const blackCircleTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0xff0000, 1)
  graphics.drawRect(-128, -128, 128, 128)
  graphics.endFill()
  const redRectTexture = graphics.generateCanvasTexture()

  graphics.clear()
  graphics.beginFill(0x000000, 1)
  graphics.drawRect(-128, -128, 128, 128)
  graphics.endFill()
  const blackRectTexture = graphics.generateCanvasTexture()

  return {
    circle: {
      red: redCircleTexture,
      black: blackCircleTexture,
    },
    rect: {
      red: redRectTexture,
      black: blackRectTexture,
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

    this._application = new Application(
      SYSTEM_CONFIG.screen.width * SCALING_FACTOR,
      SYSTEM_CONFIG.screen.height * SCALING_FACTOR,
      {
        autoStart: false,
        antialias: true,
      }
    )

    this._application.stage.scale.x = SCALING_FACTOR
    this._application.stage.scale.y = SCALING_FACTOR

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
            frontWidth: 96,
            frontHeight: 96,
            frontTexture: this._textures.circle.black,
            frontContainer: this._frontContainer,
            backWidth: 128,
            backHeight: 128,
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
            frontWidth: 96,
            frontHeight: 96,
            frontNodeTexture: this._textures.circle.black,
            frontEdgeTexture: this._textures.rect.black,
            frontContainer: this._frontContainer,
            backWidth: 128,
            backHeight: 128,
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

    for (const laser of this._bullets.normal) {
      laser.sync()
    }
  }

  render() {
    this._sync()
    this._application.render()
  }
}
