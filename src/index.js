// @flow
import { createKeyStateIteratorFromEvent } from "./keystate"

const keyStateIterator = createKeyStateIteratorFromEvent()

setInterval(() => console.log(keyStateIterator.next().value), 1000)
