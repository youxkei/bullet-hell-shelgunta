// @flow
import { createKeyStateIteratorFromKeyboardEvent } from "src/keystate"

const keyStateIterator = createKeyStateIteratorFromKeyboardEvent()

setInterval(() => console.log(keyStateIterator.next().value), 1000)
