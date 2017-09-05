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

function getObjectKeys<K, V, O: { [key: K]: V }>(object: O): K {
  // $FlowFixMe
  return Object.keys(object)
}

export const BULLET_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.bullet)
export const LASER_KINDS = getObjectKeys(SYSTEM_CONFIG.scene.game.laser)
