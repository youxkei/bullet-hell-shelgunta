// @flow
export interface Renderer {
  addViewToNode(container: Node): void,
  setMainLoop(mainLoop: () => void): void,
}
