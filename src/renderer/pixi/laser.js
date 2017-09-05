// @flow
import { Container, Texture, Sprite, mesh } from "pixi.js"

import type { Point, Laser as LaserState } from "src/logic/scene/game/state"

const HALF_PI = Math.PI / 2

function calcSegmentAngle(from: Point, to: Point): number {
  return Math.atan2(to.y - from.y, to.x - from.x)
}

export class Laser {
  _laserState: LaserState

  _backWidth: number
  _frontWidth: number

  _backVertices: Float32Array
  _frontVertices: Float32Array
  _uvs: Float32Array
  _indices: Uint16Array

  _frontMesh: mesh.Mesh
  _backMesh: mesh.Mesh

  _headNodeBackSprite: Sprite
  _headNodeFrontSprite: Sprite
  _tailNodeBackSprite: Sprite
  _tailNodeFrontSprite: Sprite

  constructor({
    laserState,
    frontWidth,
    frontHeight,
    frontNodeTexture,
    frontEdgeTexture,
    frontContainer,
    backWidth,
    backHeight,
    backNodeTexture,
    backEdgeTexture,
    backContainer,
  }: {
    laserState: LaserState,
    frontWidth: number,
    frontHeight: number,
    frontNodeTexture: Texture,
    frontEdgeTexture: Texture,
    frontContainer: Container,
    backWidth: number,
    backHeight: number,
    backNodeTexture: Texture,
    backEdgeTexture: Texture,
    backContainer: Container,
  }) {
    const numPoints = laserState.points.length

    this._laserState = laserState
    this._frontWidth = frontWidth
    this._backWidth = backWidth

    this._frontVertices = new Float32Array(numPoints * 4)
    this._backVertices = new Float32Array(numPoints * 4)

    this._uvs = new Float32Array(numPoints * 4)
    this._indices = new Uint16Array(numPoints * 2)

    const segmentLength = 1 / (numPoints - 1)
    for (let i = 0; i < numPoints; ++i) {
      this._uvs[i * 4 + 0] = this._uvs[i * 4 + 2] = segmentLength * i
      this._uvs[i * 4 + 1] = 0
      this._uvs[i * 4 + 3] = 1

      this._indices[i * 2 + 0] = i * 2 + 0
      this._indices[i * 2 + 1] = i * 2 + 1
    }

    this._frontMesh = new mesh.Mesh(
      frontEdgeTexture,
      this._frontVertices,
      this._uvs,
      this._indices,
      mesh.Mesh.DRAW_MODES.TRIANGLE_MESH
    )

    this._backMesh = new mesh.Mesh(
      backEdgeTexture,
      this._backVertices,
      this._uvs,
      this._indices,
      mesh.Mesh.DRAW_MODES.TRIANGLE_MESH
    )

    this._headNodeFrontSprite = new Sprite(frontNodeTexture)
    this._headNodeBackSprite = new Sprite(backNodeTexture)
    this._tailNodeFrontSprite = new Sprite(frontNodeTexture)
    this._tailNodeBackSprite = new Sprite(backNodeTexture)

    this._headNodeFrontSprite.width = this._tailNodeFrontSprite.width = frontWidth
    this._headNodeFrontSprite.height = this._tailNodeFrontSprite.height = frontHeight
    this._headNodeBackSprite.width = this._tailNodeBackSprite.width = backWidth
    this._headNodeBackSprite.height = this._tailNodeBackSprite.height = backHeight

    this._headNodeFrontSprite.anchor.set(0.5, 0.5)
    this._headNodeBackSprite.anchor.set(0.5, 0.5)
    this._tailNodeFrontSprite.anchor.set(0.5, 0.5)
    this._tailNodeBackSprite.anchor.set(0.5, 0.5)

    frontContainer.addChild(this._headNodeFrontSprite)
    frontContainer.addChild(this._tailNodeFrontSprite)
    frontContainer.addChild(this._frontMesh)
    backContainer.addChild(this._headNodeBackSprite)
    backContainer.addChild(this._tailNodeBackSprite)
    backContainer.addChild(this._backMesh)
  }

  sync() {
    this._headNodeFrontSprite.visible = this._headNodeBackSprite.visible = this._laserState.active
    this._tailNodeFrontSprite.visible = this._tailNodeBackSprite.visible = this._laserState.active
    this._frontMesh.visible = this._backMesh.visible = this._laserState.active

    if (!this._laserState.active) {
      return
    }

    const points = this._laserState.points
    const numPoints = this._laserState.points.length

    this._headNodeFrontSprite.x = this._headNodeBackSprite.x = this._laserState.points[0].x
    this._headNodeFrontSprite.y = this._headNodeBackSprite.y = this._laserState.points[0].y
    this._tailNodeFrontSprite.x = this._tailNodeBackSprite.x = this._laserState.points[numPoints - 1].x
    this._tailNodeFrontSprite.y = this._tailNodeBackSprite.y = this._laserState.points[numPoints - 1].y

    this._headNodeFrontSprite.rotation = this._headNodeBackSprite.rotation = this._laserState.angle

    const halfFrontWidth = this._frontWidth / 2
    const halfBackWidth = this._backWidth / 2

    for (let i = 0; i < numPoints; ++i) {
      const segmentAngle = i === 0 ? calcSegmentAngle(points[0], points[1]) : calcSegmentAngle(points[i - 1], points[i])

      this._frontVertices[i * 4 + 0] = points[i].x + halfFrontWidth * Math.cos(segmentAngle - HALF_PI)
      this._frontVertices[i * 4 + 1] = points[i].y + halfFrontWidth * Math.sin(segmentAngle - HALF_PI)
      this._frontVertices[i * 4 + 2] = points[i].x + halfFrontWidth * Math.cos(segmentAngle + HALF_PI)
      this._frontVertices[i * 4 + 3] = points[i].y + halfFrontWidth * Math.sin(segmentAngle + HALF_PI)

      this._backVertices[i * 4 + 0] = points[i].x + halfBackWidth * Math.cos(segmentAngle - HALF_PI)
      this._backVertices[i * 4 + 1] = points[i].y + halfBackWidth * Math.sin(segmentAngle - HALF_PI)
      this._backVertices[i * 4 + 2] = points[i].x + halfBackWidth * Math.cos(segmentAngle + HALF_PI)
      this._backVertices[i * 4 + 3] = points[i].y + halfBackWidth * Math.sin(segmentAngle + HALF_PI)

      if (i === numPoints - 1) {
        this._tailNodeFrontSprite.rotation = this._tailNodeBackSprite.rotation = segmentAngle
      }
    }
  }
}
