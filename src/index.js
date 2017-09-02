// @flow
import { PIXIRenderer } from "src/renderer/pixi"
import { createInitialState } from "src/state"
import { logic } from "src/logic/logic"

const userConfig = {}

let state = createInitialState(userConfig)

const renderer = new PIXIRenderer(state, userConfig)

if (document.body) {
  renderer.addRenderedCanvasToNode(document.body)
}

let count = 0
let previousTime = performance.now()
function main() {
  state = logic(state)
  renderer.render()

  ++count

  if (count === 60) {
    const nowTime = performance.now()
    console.log(Math.floor(60 / (nowTime - previousTime) * 100000) / 100)
    previousTime = nowTime
    count = 0
  }

  requestAnimationFrame(main)
}

requestAnimationFrame(main)
