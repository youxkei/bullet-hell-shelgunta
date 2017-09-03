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
          poolSize: 32,
          length: 32,
        },
      },
    },
  },
}
