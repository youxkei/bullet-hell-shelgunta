// @flow
export type UserConfig = {}

export const SYSTEM_CONFIG = {
  screen: {
    width: 960,
    height: 1080,
  },
  gameArea: {
    x: 120,
    y: 120,
    width: 720,
    hight: 840,
  },
  scene: {
    game: {
      bullet: {
        normal: {
          radius: 16,
          poolSize: 2048,
        },
        large: {
          radius: 32,
          poolSize: 512,
        },
      },
      laser: {
        normal: {
          radius: 16,
          poolSize: 128,
          length: 96,
        },
      },
    },
  },
}

export type BulletKind = $Keys<typeof SYSTEM_CONFIG.scene.game.bullet>
export type LaserKind = $Keys<typeof SYSTEM_CONFIG.scene.game.laser>

export const BULLET_KINDS = Object.keys(SYSTEM_CONFIG.scene.game.bullet)
export const LASER_KINDS = Object.keys(SYSTEM_CONFIG.scene.game.laser)

export type BulletKindObject<T> = $ObjMap<typeof SYSTEM_CONFIG.scene.game.bullet, <U>(U) => T>
export type LaserKindObject<T> = $ObjMap<typeof SYSTEM_CONFIG.scene.game.laser, <U>(U) => T>

export function createBulletKindObject<T>(mapper: BulletKind => T): BulletKindObject<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}

export function createLaserKindObject<T>(mapper: LaserKind => T): LaserKindObject<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}
