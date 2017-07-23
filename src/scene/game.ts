import { Shelgunta } from "../shelgunta";

export type Point = {
    x: number,
    y: number,
};

export type Bullet = Point & {
    radius: number,
    speed: number,
    direction: number,
};

export type Laser = Bullet & {
    tailPoints: Point[],
};

export type Stage = {
    stageNum: 1 | 2 | 3,
    frameCount: number,
};

export type Scene = {
    stage: Stage,
    bullets: {
        normal: Bullet[],
    },
    lasers: {
        normal: Laser[],
    },
};

export const run = (shelgunta: Shelgunta) => {
    return shelgunta;
};
