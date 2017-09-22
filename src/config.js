// @flow
export type UserConfig = {}

type BulletConfig = {
  radius: number,
  poolSize: number,
}

type LaserConfig = {
  radius: number,
  poolSize: number,
  length: number,
}

export type BulletKindObject<T> = {
  +normal: T,
}

export type LaserKindObject<T> = {
  +normal: T,
}

export type BulletKind = $Keys<BulletKindObject<*>>
export type LaserKind = $Keys<LaserKindObject<*>>

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
      bullet: ({
        normal: {
          radius: 16,
          poolSize: 2048,
        },
      }: BulletKindObject<BulletConfig>),
      laser: ({
        normal: {
          radius: 16,
          poolSize: 128,
          length: 96,
        },
      }: LaserKindObject<LaserConfig>),
    },
  },
}

function getObjectKeys<K, V, O: { +[key: K]: V }>(object: O): K {
  // $FlowFixMe
  return Object.keys(object)
}

export const BULLET_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.bullet)
export const LASER_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.laser)

export function createBulletKindObject<T>(mapper: BulletKind => T): BulletKindObject<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}

export function createLaserKindObject<T>(mapper: LaserKind => T): LaserKindObject<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}
