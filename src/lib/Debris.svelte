<script lang='ts'>

import { onMount } from 'svelte'
import { EVENT_MODEL_LOADED, FAR, ID_BULLETS, ID_PLAYER } from './constants'
import { addOBB, getMesh, on, query, random, randPointInCircle, register, updateOBB } from './util'

const NUM_DEBRIS = 50
const BASE_HEIGHT = 1.8

let i = 0
let player = null
let bullets = null

const v = new THREE.Vector3()

register('debris', {
  init () {
    this.i = ++i
    this.spin = [random(0.05), random(0.05)]

    const [x, y] = randPointInCircle(0.5)
    const z = random(FAR * 2) - FAR
    const mesh = getMesh(this)

    this.obb = addOBB(mesh)
    mesh.position.set(x, y + BASE_HEIGHT, z)
  },

  tick () {
    const { obb } = this
    const [x, y] = this.spin
    const mesh = getMesh(this)
    const { position, rotation } = mesh
    position.z += ((this.i % 25) * 0.01)
    rotation.x += x
    rotation.y += y

    if (position.z > FAR) position.z = -FAR

    updateOBB(mesh)

    if (player && this.obb.intersectsOBB(player.userData.obb)) {
      position.z = -FAR * 2
    }

    if (bullets) {
      const positions = bullets.getPositions()
      const l = positions.length

      for (i = 0; i < l; i += 3) {
        v.x = positions[i]
        v.y = positions[i + 1]
        v.z = positions[i + 2]
        if (obb.containsPoint(v)) {
          position.z = -FAR * 2
        }
      }

    }

    // test bullet collisions
  }
})

onMount(() => on(EVENT_MODEL_LOADED, (e) => {
  player = getMesh(e.target).children[0]
  bullets = query(ID_BULLETS).components.bullets
}, ID_PLAYER))

</script>
{#each Array(NUM_DEBRIS) as _, i (i)}
<a-icosahedron debris color='#FF926B' radius={random(0.1) + 0.1} />
{/each}
