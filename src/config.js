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

// TODO: should be properly named
export type BulletKindTo<T> = {
  +normal: T,
}

// TODO: should be properly named
export type LaserKindTo<T> = {
  +normal: T,
}

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
      }: BulletKindTo<BulletConfig>),
      laser: ({
        normal: {
          radius: 16,
          poolSize: 128,
          length: 96,
        },
      }: LaserKindTo<LaserConfig>),
    },
  },
}

function getObjectKeys<K, V, O: { +[key: K]: V }>(object: O): K {
  // $FlowFixMe
  return Object.keys(object)
}

export const BULLET_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.bullet)
export const LASER_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.laser)

// TODO: should be properly named
export function bulletKindTo<T>(mapper: $Keys<BulletKindTo<*>> => T): BulletKindTo<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}

// TODO: should be properly named
export function laserKindTo<T>(mapper: $Keys<LaserKindTo<*>> => T): LaserKindTo<T> {
  // $FlowFixMe
  return BULLET_KINDS.reduce((accumulated, key) => ({ ...accumulated, [key]: mapper(key) }), {})
}
