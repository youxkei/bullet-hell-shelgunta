// @flow
import type { Scene as GameScene } from "./scene/game";
import type { Scene as TitleScene } from "./scene/title";
import type { Scene as ClearScene } from "./scene/clear";
import type { Scene as GameOverScene } from "./scene/gameover";

import { run as runGameScene } from "./scene/game";
import { run as runTitleScene } from "./scene/title";
import { run as runClearScene } from "./scene/clear";
import { run as runGameOverScene } from "./scene/gameover";


export type Shelgunta = {
    currentScene: "title" | "game" | "clear" | "gameOver",
    scenes: {
        title: TitleScene,
        game: GameScene,
        clear: ClearScene,
        gameOver: GameOverScene,
    },
};

export function run(shelgunta: Shelgunta): Shelgunta {
    switch (shelgunta.currentScene) {
        case "title":
            return runTitleScene(shelgunta);

        case "game":
            return runGameScene(shelgunta);

        case "clear":
            return runClearScene(shelgunta);

        case "gameOver":
            return runGameOverScene(shelgunta);

        default:
            (shelgunta.currentScene: empty);
            throw "switch statement should be exhaustive";
    }
};
