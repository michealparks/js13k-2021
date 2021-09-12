<script context='module' lang='ts'>

import { abs, createOBB, float32Array, queryAttr, ready, setMesh } from './util'

let playerComponent = null
let player = null
let bullets = null
let camera = null

ready(() => {
  camera = queryAttr('camera').object3D
  bullets = queryAttr(BULLETS).components.bullets

  on(EVENT_MODEL_LOADED, (e) => {
    playerComponent = e.target.components.ship
    player = getMesh(playerComponent).children[0]
  })
})

</script>

<script lang='ts'>

import { EVENT_MODEL_LOADED, FAR, BULLETS } from './constants'
import { getMesh, on, random, randPointInCircle, register } from './util'

const count = 100
const dummy = new THREE.Object3D()
const v3 = new THREE.Vector3()
const v3_2 = new THREE.Vector3()
const m3 = new THREE.Matrix3()
const positions = float32Array(count * 3)
const rotations = float32Array(count * 4)
const av = float32Array(count * 3)
const radius = 0.4
const obb = createOBB()
const geometry = new THREE.IcosahedronGeometry(radius)
const material = new THREE.MeshStandardMaterial({ color: '#FF926B' })
const mesh = new THREE.InstancedMesh(geometry, material, count)

let playerDead = false

mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage )

const each = (fn: (i: number) => void) => {
  for (const i of Array(count).keys()) fn(i)
}

const setPosition = (index: number, z = random(FAR) - (FAR / 2)): void => {
  const [x, y] = randPointInCircle(2)
  const scale = random(0.1) + 0.1
  const stride = index * 3

  dummy.position.set(x, y, z)
  dummy.updateMatrix()

  // v.setScalar(s)
  // m.scale(v)

  positions[stride + 0] = x
  positions[stride + 1] = y
  positions[stride + 2] = z

  av[stride + 0] = random(0.01)
  av[stride + 1] = random(0.01)
  av[stride + 2] = random(0.01)
}

register('debris', {

  init () {
    setMesh(this, mesh)
    each((i) => {
      setPosition(i)
      mesh.setMatrixAt(i, dummy.matrix)
    })
  },

  tick () {
    if (!player) return

    each((i) => {
      const stride = i * 3
      positions[stride + 2] += ((i % 20) * 0.005)

      rotations[stride] += av[stride]
      rotations[stride + 1] += av[stride + 1]
      rotations[stride + 2] += av[stride + 2]

      dummy.position.set(positions[stride], positions[stride + 1], positions[stride + 2])
      dummy.rotation.x = rotations[stride]
      dummy.rotation.y = rotations[stride + 1]
      dummy.rotation.z = rotations[stride + 2]
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      if (playerDead) {
        return
      }

      v3.set(0, 0, 0)
      obb.set(v3, v3_2.setScalar(radius), m3)
      obb.applyMatrix4(dummy.matrix)

      if (obb.intersectsOBB(player.userData.obb)) {
        setPosition(i, -FAR * 2)
        playerDead = playerComponent.damage() <= 0
      }

      if (bullets) {
        const positions = bullets.getPositions()
        const awake = bullets.getAwake()

        for (const i of awake) {
          v3.set(positions[i], positions[i + 1], positions[i + 2])

          if (obb.containsPoint(v3)) {
            setPosition(i, -FAR * 2)
            bullets.removeAwake(i)
          }

          if (abs(v3.x) > FAR && abs(v3.y) > FAR && abs(v3.z) > FAR) {
            bullets.removeAwake(i)
          }
        }
      }
    })

    mesh.instanceMatrix.needsUpdate = true
  },
  
})

</script>
<a-entity debris />
