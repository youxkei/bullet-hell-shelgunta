// @flow
export type UserConfig = {
  maxNum: {
    bullets: {
      normal: number,
    },
    lasers: {
      normal: number,
    },
  },
}

export const SYSTEM_CONFIG = {
  scene: {
    game: {
      bullet: {
        maxNumber: 1024,
      },
      laser: {
        maxNumber: 16,
        maxTailPointsNumber: 32,
      },
    },
  },
}
