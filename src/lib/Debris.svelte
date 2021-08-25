<script context='module' lang='ts'>

import { abs, queryAttr, ready } from './util'

let player = null
let bullets = null
let camera = null

ready(() => {
  camera = queryAttr('camera').object3D
  bullets = queryAttr(BULLETS).components.bullets

  on(EVENT_MODEL_LOADED, (e) => {
    player = getMesh(e.target).children[0]
  })
})

</script>

<script lang='ts'>

import { EVENT_MODEL_LOADED, FAR, BULLETS } from './constants'
import { addOBB, getMesh, on, random, randPointInCircle, register, updateOBB } from './util'

const NUM_DEBRIS = 100

let i = 0

const v = new THREE.Vector3()

const resetPosition = (position: THREE.Vector3, multiplier = 1) => {
  const [x, y] = randPointInCircle(0.5)
  position.set(x, y + camera.position.y, -FAR * multiplier)
}

register('debris', {

  init () {
    const z = random(FAR * 2) - FAR
    const mesh = getMesh(this)
    resetPosition(mesh.position)

    this.i = ++i
    this.spin = [random(0.05), random(0.05)]
    this.obb = addOBB(mesh)
  },

  tick () {
    const { obb } = this
    const [x, y] = this.spin
    const mesh = getMesh(this)
    const { position, rotation } = mesh
    position.z += ((this.i % 20) * 0.005)
    rotation.x += x
    rotation.y += y

    if (position.z > FAR) {
      resetPosition(position)
    }

    updateOBB(mesh)

    if (player && this.obb.intersectsOBB(player.userData.obb)) {
      resetPosition(position, 2)
    }

    if (bullets) {
      const positions = bullets.getPositions()
      const awake = bullets.getAwake()
      const l = positions.length

      for (const i of awake) {
        v.x = positions[i]
        v.y = positions[i + 1]
        v.z = positions[i + 2]

        if (obb.containsPoint(v)) {
          resetPosition(position, 2)
          bullets.removeAwake(i)
        }

        if (abs(v.x) > FAR && abs(v.y) > FAR && abs(v.z) > FAR) {
          bullets.removeAwake(i)
        }
      }
    }
  }

})

</script>
{#each Array(NUM_DEBRIS) as _, i (i)}
<a-icosahedron debris color='#FF926B' radius={random(0.1) + 0.1} />
{/each}
