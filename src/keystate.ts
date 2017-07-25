export const KEYS = {
    UP:    1 << 0,
    DOWN:  1 << 1,
    LEFT:  1 << 2,
    RIGHT: 1 << 3,

    SHOT: 1 << 4,
    BOMB: 1 << 5,
    SLOW: 1 << 6,
};
export type KeyState = number;

export type KeyStateIterator = Iterator<KeyState>;

export const getKeyStateIteratorFromEvent= function*() {
    let keyState = 0;

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "KeyZ":
                keyState |= KEYS.SHOT;
                break;

            case "KeyX":
                keyState |= KEYS.BOMB;
                break;

            case "Shift":
                keyState |= KEYS.SLOW;
                break;
    });

    while (true) yield keyState;
};
