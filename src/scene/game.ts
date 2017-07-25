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
    switch (shelgunta.scenes.game.stage.stageNum) {
        case 1:
            return runStage1(shelgunta);

        case 2:
            return runStage2(shelgunta);

        case 3:
            return runStage3(shelgunta);
    }
};

const runStage1 = (shelgunta: Shelgunta) => {
    return shelgunta;
};

const runStage2 = (shelgunta: Shelgunta) => {
    return shelgunta;
}

const runStage3 = (shelgunta: Shelgunta) => {
    return shelgunta;
}
