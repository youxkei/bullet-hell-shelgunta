// @flow
import type { Config } from "./config";
import type { Scene as TitleScene } from "./scene/title";
import type { Scene as GameScene } from "./scene/game";
import type { Scene as ClearScene } from "./scene/clear";
import type { Scene as GameOverScene } from "./scene/gameover";

import { createInitialScene as createInitialTitleScene,    run as runTitleScene } from "./scene/title";
import { createInitialScene as createInitialGameScene,     run as runGameScene } from "./scene/game";
import { createInitialScene as createInitialClearScene,    run as runClearScene } from "./scene/clear";
import { createInitialScene as createInitialGameOverScene, run as runGameOverScene } from "./scene/gameover";


export type Shelgunta = {
    currentScene: "TITLE" | "GAME" | "CLEAR" | "GAME_OVER",
    scenes: {
        title: TitleScene,
        game: GameScene,
        clear: ClearScene,
        gameOver: GameOverScene,
    },
};

export function createInitialShelgunta(config: Config): Shelgunta {
    return {
        currentScene: "TITLE",
        scenes: {
            title: createInitialTitleScene(config),
            game: createInitialGameScene(config),
            clear: createInitialClearScene(config),
            gameOver: createInitialGameOverScene(config),
        },
    };
}

export function run(shelgunta: Shelgunta): Shelgunta {
    switch (shelgunta.currentScene) {
        case "TITLE":
            return runTitleScene(shelgunta);

        case "GAME":
            return runGameScene(shelgunta);

        case "CLEAR":
            return runClearScene(shelgunta);

        case "GAME_OVER":
            return runGameOverScene(shelgunta);

        default:
            (shelgunta.currentScene: empty);
            throw "switch statement should be exhaustive";
    }
}
