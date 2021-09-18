<script lang='ts'>

import { EVENT_FIRE, FAR, PURPLE, SPRITE_CIRCLE, BULLETS, EVENT_FIRE_END } from './constants'
import { createPoints, float32Array, needsUpdate, on, register, setMesh, setXYZ, v3 } from './util'

let FIRE_LIMIT_RATE = 300
let FIRE_OFFSET = 0.1
let SPRITE_SIZE = 0.1
let COUNT = 500
let SPEED = 0.1
let vector = v3()
let [points, positionAttr] = createPoints(COUNT, SPRITE_SIZE, SPRITE_CIRCLE, PURPLE)
let velocities = float32Array(COUNT * 3)
let awake = new Set<number>()
let index = 0, fireOffset = 0, lastTime = 0
let i = 0, j = 0, x = 0, y = 0, z = 0
let source

register(BULLETS, {
  init () {
    setMesh(this, points)

    on(EVENT_FIRE, (e) => {
      source = e.detail
    })

    on(EVENT_FIRE_END, () => {
      source = null
    })

    while (i < COUNT) {
      setXYZ(positionAttr, i, FAR, FAR, FAR)
      i += 1
    }
  },

  tick (time: number) {
    if (source && time - lastTime > FIRE_LIMIT_RATE) {
      vector.set(0, 0, -1).applyQuaternion(source.quaternion).normalize()

      i = index * 3
      fireOffset = index % 2 === 0 ? -FIRE_OFFSET : FIRE_OFFSET
      velocities[i] = vector.x * SPEED
      velocities[i + 1] = vector.y * SPEED
      velocities[i + 2] = vector.z * SPEED

      let { x, y, z } = source.position
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

  positions () {
    return positionAttr.array
  },

  awake () {
    return awake
  },

  sleep (i: number): void {
    awake.delete(i)
    setXYZ(positionAttr, i, FAR, FAR, FAR)
  },
})
</script>
<a-entity bullets />
