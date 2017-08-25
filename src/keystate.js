// @flow
export const KEYS = {
  SHOT: 1 << 0,
  BOMB: 1 << 1,
  SLOW: 1 << 2,

  UP: 1 << 3,
  DOWN: 1 << 4,
  LEFT: 1 << 5,
  RIGHT: 1 << 6,
}

export type KeyState = number

export type KeyStateIterator = Iterator<KeyState>

export function* createKeyStateIteratorFromDOMEvent(): KeyStateIterator {
  let keyState = 0

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyZ":
        keyState |= KEYS.SHOT
        break

      case "KeyX":
        keyState |= KEYS.BOMB
        break

      case "ShiftLeft":
        keyState |= KEYS.SLOW
        break

      case "ArrowUp":
        keyState |= KEYS.UP
        break

      case "ArrowDown":
        keyState |= KEYS.DOWN
        break

      case "ArrowLeft":
        keyState |= KEYS.LEFT
        break

      case "ArrowRight":
        keyState |= KEYS.RIGHT
        break
    }
  })

  document.addEventListener("keyup", (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyZ":
        keyState &= ~KEYS.SHOT
        break

      case "KeyX":
        keyState &= ~KEYS.BOMB
        break

      case "ShiftLeft":
        keyState &= ~KEYS.SLOW
        break

      case "ArrowUp":
        keyState &= ~KEYS.UP
        break

      case "ArrowDown":
        keyState &= ~KEYS.DOWN
        break

      case "ArrowLeft":
        keyState &= ~KEYS.LEFT
        break

      case "ArrowRight":
        keyState &= ~KEYS.RIGHT
        break
    }
  })

  while (true) {
    yield keyState
  }
}
