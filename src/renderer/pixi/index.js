// @flow
import { Application, Texture, Graphics, Container, ticker } from "pixi.js"

import type { UserConfig } from "src/config"
import type { State } from "src/state"
import { SYSTEM_CONFIG, BULLET_KINDS, LASER_KINDS } from "src/config"
import { Renderer } from "src/renderer/"
import { Bullet } from "src/renderer/pixi/bullet"
import { Laser } from "src/renderer/pixi/laser"

type Textures = {
  +bullet: $ObjMap<typeof SYSTEM_CONFIG.scene.game.bullet, <T>(T) => { front: Texture, back: Texture }>,
  +laser: $ObjMap<typeof SYSTEM_CONFIG.scene.game.laser, <T>(T) => { nodeFront: Texture, nodeBack: Texture, edgeFront: Texture, edgeBack: Texture }>
}

function mapObject<K, V, O: { [key: K]: V }, R>(object: O, mapper: (K) => R): $ObjMap<O, <T>(T) => R> {
  // $FlowFixMe
  return Object.keys(object).reduce((accumulated, key) => Object.assign(accumulated, { [key]: mapper(key) }), {})
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
    bullet: {
      normal: {
        front: whiteCircleTexture,
        back: redCircleTexture,
      },
    },
    laser: {
      normal: {
        nodeFront: whiteCircleTexture,
        nodeBack: redCircleTexture,
        edgeFront: whiteRectTexture,
        edgeBack: redRectTexture,
      },
    },
  }
}

export class PIXIRenderer extends Renderer {
  _application: Application
  _textures: Textures

  _frontContainer: Container
  _backContainer: Container

  _bullets: $ObjMap<typeof SYSTEM_CONFIG.scene.game.bullet, <T>(T) => Bullet[]>
  _lasers: $ObjMap<typeof SYSTEM_CONFIG.scene.game.laser, <T>(T) => Laser[]>

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

    this._bullets = mapObject(SYSTEM_CONFIG.scene.game.bullet, bulletKind =>
      state.scene.game.pool.bullet[bulletKind].pool.map(
        bulletState =>
          new Bullet({
            bulletState,
            frontWidth: 18,
            frontHeight: 18,
            frontTexture: this._textures.bullet[bulletKind].front,
            frontContainer: this._frontContainer,
            backWidth: 24,
            backHeight: 24,
            backTexture: this._textures.bullet[bulletKind].back,
            backContainer: this._backContainer,
          })
      )
    )

    this._lasers = mapObject(SYSTEM_CONFIG.scene.game.laser, laserKind =>
      state.scene.game.pool.laser[laserKind].pool.map(
        laserState =>
          new Laser({
            laserState,
            frontWidth: 6,
            frontHeight: 6,
            frontNodeTexture: this._textures.laser[laserKind].nodeFront,
            frontEdgeTexture: this._textures.laser[laserKind].edgeFront,
            frontContainer: this._frontContainer,
            backWidth: 12,
            backHeight: 12,
            backNodeTexture: this._textures.laser[laserKind].nodeBack,
            backEdgeTexture: this._textures.laser[laserKind].edgeBack,
            backContainer: this._backContainer,
          })
      )
    )
  }

  addRenderedCanvasToNode(node: Node) {
    node.appendChild(this._application.view)
  }

  // TODO 'sync' should be named more properly
  _sync() {
    for (const bulletKind of BULLET_KINDS) {
      for (const bullet of this._bullets[bulletKind]) {
        bullet.sync()
      }
    }

    for (const laserKind of LASER_KINDS) {
      for (const laser of this._lasers[laserKind]) {
        laser.sync()
      }
    }
  }

  render() {
    this._sync()
    this._application.render()
  }
}
