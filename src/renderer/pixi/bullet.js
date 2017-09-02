// @flow
import { Texture, Sprite, Container } from "pixi.js"

import type { Bullet as BulletState } from "src/logic/scene/game/state"

export class Bullet {
  _bulletState: BulletState
  _frontSprite: Sprite
  _backSprite: Sprite

  constructor({
    bulletState,
    frontWidth,
    frontHeight,
    frontTexture,
    backWidth,
    backHeight,
    backTexture,
    frontContainer,
    backContainer,
  }: {
    bulletState: BulletState,
    frontWidth: number,
    frontHeight: number,
    frontTexture: Texture,
    backWidth: number,
    backHeight: number,
    backTexture: Texture,
    frontContainer: Container,
    backContainer: Container,
  }) {
    this._bulletState = bulletState
    this._frontSprite = new Sprite(frontTexture)
    this._backSprite = new Sprite(backTexture)

    this._frontSprite.width = frontWidth
    this._frontSprite.height = frontHeight

    this._backSprite.width = backWidth
    this._backSprite.height = backHeight

    this._frontSprite.anchor.set(0.5, 0.5)
    this._backSprite.anchor.set(0.5, 0.5)

    frontContainer.addChild(this._frontSprite)
    backContainer.addChild(this._backSprite)
  }

  sync() {
    this._frontSprite.visible = this._backSprite.visible = this._bulletState.active
    this._frontSprite.x = this._backSprite.x = this._bulletState.x
    this._frontSprite.y = this._backSprite.y = this._bulletState.y
    this._frontSprite.rotation = this._backSprite.rotation = this._bulletState.direction
  }
}
