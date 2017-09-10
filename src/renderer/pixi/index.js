// @flow
import { Application, Texture, Graphics, Container, ticker } from "pixi.js"

import type { UserConfig, BulletKindTo, LaserKindTo } from "src/config"
import type { State } from "src/state"
import { SYSTEM_CONFIG, BULLET_KINDS, LASER_KINDS, bulletKindTo, laserKindTo } from "src/config"
import { Renderer } from "src/renderer/"
import { Bullet } from "src/renderer/pixi/bullet"
import { Laser } from "src/renderer/pixi/laser"

type BulletConfig = BulletKindTo<{
  frontWidth: number,
  frontHeight: number,
  backWidth: number,
  backHeight: number,
  frontTexture: Texture,
  backTexture: Texture,
}>

type LaserConfig = LaserKindTo<{
  frontWidth: number,
  frontHeight: number,
  backWidth: number,
  backHeight: number,
  nodeFrontTexture: Texture,
  nodeBackTexture: Texture,
  edgeFrontTexture: Texture,
  edgeBackTexture: Texture,
}>

function createProjectileConfig(): { bullet: BulletConfig, laser: LaserConfig } {
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
        frontWidth: 18,
        frontHeight: 18,
        backWidth: 24,
        backHeight: 24,
        frontTexture: whiteCircleTexture,
        backTexture: redCircleTexture,
      },
    },
    laser: {
      normal: {
        frontWidth: 26,
        frontHeight: 26,
        backWidth: 32,
        backHeight: 32,
        nodeFrontTexture: whiteCircleTexture,
        nodeBackTexture: redCircleTexture,
        edgeFrontTexture: whiteRectTexture,
        edgeBackTexture: redRectTexture,
      },
    },
  }
}

export class PIXIRenderer extends Renderer {
  _application: Application

  _bullets: BulletKindTo<$ReadOnlyArray<Bullet>>
  _lasers: LaserKindTo<$ReadOnlyArray<Laser>>

  constructor(state: State, userConfig: UserConfig) {
    super(state, userConfig)

    ticker.shared.autoStart = false
    ticker.shared.stop()
    this._application = new Application(SYSTEM_CONFIG.screen.width, SYSTEM_CONFIG.screen.height, {
      autoStart: false,
      antialias: true,
    })
    this._application.ticker.stop()

    const projectileConfig = createProjectileConfig()

    const frontContainer = new Container()
    const backContainer = new Container()

    this._application.stage.addChild(backContainer)
    this._application.stage.addChild(frontContainer)

    this._bullets = bulletKindTo(bulletKind =>
      state.scene.game.pool.bullet[bulletKind].pool.map(
        bulletState =>
          new Bullet({
            ...projectileConfig.bullet[bulletKind],
            bulletState,
            frontContainer: frontContainer,
            backContainer: backContainer,
          })
      )
    )

    this._lasers = laserKindTo(laserKind =>
      state.scene.game.pool.laser[laserKind].pool.map(
        laserState =>
          new Laser({
            ...projectileConfig.laser[laserKind],
            laserState,
            frontContainer: frontContainer,
            backContainer: backContainer,
          })
      )
    )
  }

  addRenderedCanvasToNode(node: Node) {
    node.appendChild(this._application.view)
  }

  // TODO should be named more properly
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
