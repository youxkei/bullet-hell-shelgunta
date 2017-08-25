// @flow
import { createKeyStateIteratorFromDOMEvent } from "src/keystate"

const keyStateIterator = createKeyStateIteratorFromDOMEvent()

setInterval(() => console.log(keyStateIterator.next().value), 1000)
