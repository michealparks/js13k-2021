<script context='module' lang='ts'>

import { Events, FAR, PURPLE, SPRITE_CIRCLE, BULLETS } from './constants'
import { createPoints, float32Array, needsUpdate, on, register, setMesh, setXYZ } from './util'

const FIRE_LIMIT_RATE = 300
const FIRE_OFFSET = 0.1
const SPRITE_SIZE = 0.1
const COUNT = 500
const SPEED = 0.1
const vector = new THREE.Vector3()
const [points, positionAttr] = createPoints(COUNT, SPRITE_SIZE, SPRITE_CIRCLE, PURPLE)
const velocities = float32Array(COUNT * 3)
const awake = new Set<number>()

let index = 0, fireOffset = 0, lastTime = 0
let i = 0, j = 0, x = 0, y = 0, z = 0
let source = null

register(BULLETS, {
  init () {
    setMesh(this, points)

    on(Events.FIRE, (e) => {
      source = e.srcElement.object3D
    })

    on(Events.FIRE_END, () => {
      source = null
    })

    while (i < COUNT) {
      setXYZ(positionAttr, i, FAR, FAR, FAR)
      i += 1
    }
  },

  tick (time) {
    if (source && time - lastTime > FIRE_LIMIT_RATE) {
      vector.set(0, 0, -1).applyQuaternion(source.quaternion).normalize()

      i = index * 3
      fireOffset = index % 2 === 0 ? -FIRE_OFFSET : FIRE_OFFSET
      velocities[i] = vector.x * SPEED
      velocities[i + 1] = vector.y * SPEED
      velocities[i + 2] = vector.z * SPEED

      const { x, y, z } = source.position
      setXYZ(positionAttr, index, x + fireOffset, y, z)

      
      if (index === COUNT - 1) index = 0

      awake.add(index)
      lastTime = time
      index += 1
    }

    for (i of awake) {
      j = i * 3
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
    setXYZ(positionAttr, i, FAR, FAR, FAR)
  },
})
</script>
<a-entity bullets />
