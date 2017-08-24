// @flow
export type UserConfig = {}

export const SYSTEM_CONFIG = {
  screen: {
    width: 3840,
    height: 4320,
  },
  gameArea: {
    x: 480,
    y: 480,
    width: 2880,
    hight: 3360,
  },
  scene: {
    game: {
      bullet: {
        normal: {
          poolSize: 1024,
        },
      },
      laser: {
        normal: {
          poolSize: 16,
          tailLength: 8,
        },
      },
    },
  },
}
