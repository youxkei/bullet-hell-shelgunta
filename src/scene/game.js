// @flow
import type { Config } from "../config";
import type { Shelgunta } from "../shelgunta";

export type Point = {
    x: number,
    y: number,
};

export type Active = { // TODO should be named more properly
    active: boolean, // TODO should be named more properly
};

export type Bullet = Point & Active & {
    radius: number,
    speed: number,
    direction: number,
};

export type Laser = Bullet & {
    tailPoints: (Point & Active)[],
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

export function createInitialScene(config: Config): Scene {
    return {
        stage: {
            stageNum: 1,
            frameCount: 0,
        },
        bullets: {
            normal: new Array(config.maxNum.bullets.normal).map(_ => ({
                x: 0,
                y: 0,
                active: false,
            })),
        },
        lasers: {
            normal: [],
        },
    };
}

export function run(shelgunta: Shelgunta): Shelgunta {
    switch (shelgunta.scenes.game.stage.stageNum) {
        case 1:
            return runStage1(shelgunta);

        case 2:
            return runStage2(shelgunta);

        case 3:
            return runStage3(shelgunta);

        default:
            (shelgunta.scenes.game.stage.stageNum: empty);
            throw "switch statement should be exhaustive";
    }
}

function runStage1(shelgunta: Shelgunta): Shelgunta {
    return shelgunta;
}

function runStage2(shelgunta: Shelgunta): Shelgunta {
    return shelgunta;
}

function runStage3(shelgunta: Shelgunta): Shelgunta {
    return shelgunta;
}
