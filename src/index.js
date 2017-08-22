// @flow
import { createKeyStateIteratorFromEvent } from "src/keystate"

const keyStateIterator = createKeyStateIteratorFromEvent()

setInterval(() => console.log(keyStateIterator.next().value), 1000)
