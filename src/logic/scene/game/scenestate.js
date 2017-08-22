// @flow
export type Point = {
  x: number,
  y: number,
}

// TODO 'Active' should be named more properly
export type Active = {
  active: boolean,
}

export type Bullet = Active &
  Point & {
    radius: number,
    speed: number,
    direction: number,
  }

export type Laser = Bullet & {
  tailPoints: Point[],
}

export type Stage = {
  stageNumber: 1 | 2 | 3,
  frameCount: number,
}

export type SceneState = {
  stage: Stage,
  bullets: {
    normal: Bullet[],
  },
  lasers: {
    normal: Laser[],
  },
}
