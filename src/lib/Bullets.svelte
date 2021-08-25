<script context='module' lang='ts'>

import { EVENT_FIRE, EVENT_FIRE_END, FAR, BULLETS, PURPLE, SPRITE_CIRCLE } from './constants'
import { createPoints, float32Array, needsUpdate, on, register, setMesh, setXYZ } from './util'

const SPRITE_SIZE = 0.1
const COUNT = 500
const SPEED = 0.1
const vector = new THREE.Vector3()
const [points, positionAttr] = createPoints(COUNT, SPRITE_SIZE, SPRITE_CIRCLE, PURPLE)
const velocities = float32Array(COUNT * 3)
const awake = new Set<number>()

let index = 0
let i = 0, j = 0, x = 0, y = 0, z = 0
let source = null

register(BULLETS, {
  init () {
    setMesh(this, points)

    on(EVENT_FIRE, (e) => {
      source = e.srcElement.object3D
    })

    on(EVENT_FIRE_END, () => {
      source = null
    })

    while (i < COUNT) {
      setXYZ(positionAttr, i, FAR, FAR, FAR)
      i += 1
    }
  },

  tick () {
    if (source) {
      vector.set(0, 0, -1).applyQuaternion(source.quaternion).normalize()

      i = index * 3
      velocities[i] = vector.x * SPEED
      velocities[i + 1] = vector.y * SPEED
      velocities[i + 2] = vector.z * SPEED

      const { x, y, z } = source.position
      setXYZ(positionAttr, index, x, y, z)

      index += 1
      if (index === COUNT) index = 0

      awake.add(i)
    }

    for (j of awake) {
      i = j / 3
      x = velocities[j]
      y = velocities[j + 1]
      z = velocities[j + 2]

      if (x === 0 && y === 0 && z === 0) {
        continue
      }

      x += positionAttr.getX(i)
      y += positionAttr.getY(i)
      z += positionAttr.getZ(i)

      setXYZ(positionAttr, i, x, y, z)
    }

    needsUpdate(positionAttr)
  },

  getPositions () {
    return positionAttr.array
  },

  getAwake () {
    return awake
  },

  removeAwake (i: number) {
    awake.delete(i)
    setXYZ(positionAttr, i / 3, FAR, FAR, FAR)
  },
})
</script>
<a-entity bullets />
