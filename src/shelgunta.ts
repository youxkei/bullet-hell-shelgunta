import { Scene as GameScene, run as runGameScene } from "./scene/game";
import { Scene as TitleScene, run as runTitleScene } from "./scene/title";
import { Scene as ClearScene, run as runClearScene } from "./scene/clear";
import { Scene as GameOverScene, run as runGameOverScene } from "./scene/game-over";

export type Shelgunta = {
    currentScene: "title" | "game" | "clear" | "gameOver",
    scenes: {
        title: TitleScene,
        game: GameScene,
        clear: ClearScene,
        gameOver: GameOverScene,
    },
};

export const run = (shelgunta: Shelgunta) => {
    switch (shelgunta.currentScene) {
        case "title":
            return runTitleScene(shelgunta);

        case "game":
            return runGameScene(shelgunta);

        case "clear":
            return runClearScene(shelgunta);

        case "gameOver":
            return runGameOverScene(shelgunta);
    }
};
