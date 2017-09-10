// @flow
import type { Bullet } from "src/logic/scene/game/state"

export const BULLET_ACTIONS = {
  nop(_: Bullet) {},
}

export type BulletActionKind = $Keys<typeof BULLET_ACTIONS>
