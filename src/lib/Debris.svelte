<script lang='ts'>
import { onMount } from 'svelte'
import { FAR, BULLETS, Events } from './constants'
import { getMesh, on, random, randPointInCircle, register, each, abs, emit, float32Array, needsUpdate, queryAttr, randFloat, setMesh } from './util'

let playerComponent
let player = null
let bullets = null
let score = 0

onMount(() => {
  bullets = queryAttr(BULLETS).components.bullets

  on('enter-vr', () => {
    leakDebris(0)
  })

  on(Events.MODEL_LOADED, (e) => {
    playerComponent = e.target.components.ship
    player = getMesh(playerComponent, 0)
  })
})

const poolSize = 600
const numDebris = 150
const baseRadius = 0.4

const sphere = new THREE.Sphere()
const box = new THREE.Box3()

const dummy = new THREE.Object3D()
const v3 = new THREE.Vector3()
const positions = float32Array(poolSize * 3)
const velocities = float32Array(poolSize * 3)
const rotations = float32Array(poolSize * 3)
const angularVelocities = float32Array(poolSize * 3)
const radii = float32Array(poolSize)
const geometry = new THREE.IcosahedronGeometry(baseRadius)
const material = new THREE.MeshStandardMaterial({ color: '#FF926B' })
const mesh = new THREE.InstancedMesh(geometry, material, poolSize)

let currentFragmentIndex = numDebris
let playerDead = false

const setTransform = (i: number, r = 0, x = -FAR, y = -FAR, z = -FAR) => {
  const stride = i * 3

  radii[i] = r

  dummy.scale.setScalar(r)
  dummy.position.set(x, y, z)
  dummy.updateMatrix()

  positions[stride] = x
  positions[stride + 1] = y
  positions[stride + 2] = z
}

const setVelocity = (i: number, vx: number, vy: number, vz: number) => {
  const stride = i * 3
  velocities[stride + 0] = vx
  velocities[stride + 1] = vy
  velocities[stride + 2] = vz

  angularVelocities[stride + 0] = random(0.01)
  angularVelocities[stride + 1] = random(0.01)
  angularVelocities[stride + 2] = random(0.01)
}

const resetPosition = (index: number): void => {
  const [x, y] = randPointInCircle(2)
  setTransform(index, baseRadius + random(1), x, y + 1, -FAR - 5)
}

const explode = (entity, debrisIndex: number, x: number, y: number, z: number) => {
  const isFragment = debrisIndex >= numDebris

  if (isFragment) {
    score += 3
    emit(entity, 'player-score', score)
    setTransform(debrisIndex)
    return
  }

  score += 1
  emit(entity, 'player-score', score)
  resetPosition(debrisIndex)
  setVelocity(debrisIndex, 0, 0, 0.05 + random(0.1))

  each(10, () => {
    setTransform(currentFragmentIndex, baseRadius / 1.5, x, y, z)
    setVelocity(currentFragmentIndex, randFloat(-0.02, 0.02), randFloat(-0.02, 0.02), randFloat(0.05, 0.1))

    currentFragmentIndex += 1

    if (currentFragmentIndex === poolSize - 1) {
      currentFragmentIndex = numDebris
    }
  })
}

const at = (arr: Float32Array, i: number): [x: number, y: number, z: number] => {
  return [arr[i], arr[i + 1], arr[i + 2]]
}

const updateArr = (i: number, arr: Float32Array, updates: Float32Array) => {
  arr[i + 0] += updates[i + 0]
  arr[i + 1] += updates[i + 1]
  arr[i + 2] += updates[i + 2]
}

const calculateDamage = (debrisIndex: number) => {
  return debrisIndex > numDebris ? 0.1 : 1
}

const leakDebris = (i) => {
  if (i >= numDebris) return
  setVelocity(i, 0, 0, 0.05 + random(0.1))
  setTimeout(leakDebris, 300, i + 1)
}

register('debris', {

  init () {
    setMesh(this, mesh)
    each(poolSize, i => resetPosition(i))
  },

  tick () {
    if (!player || !bullets) return

    box.setFromObject(player)

    each(poolSize, (debrisIndex) => {
      const stride = debrisIndex * 3
      updateArr(stride, positions, velocities)
      updateArr(stride, rotations, angularVelocities)

      const r = radii[debrisIndex]
      const [x, y, z] = at(positions, stride)

      if (z > FAR) {
        resetPosition(debrisIndex)
      }

      dummy.scale.setScalar(r)
      dummy.position.set(x, y, z)

      dummy.rotation.x = rotations[stride]
      dummy.rotation.y = rotations[stride + 1]
      dummy.rotation.z = rotations[stride + 2]
      dummy.updateMatrix()
      mesh.setMatrixAt(debrisIndex, dummy.matrix)

      if (playerDead) {
        return
      }

      sphere.set(dummy.position, baseRadius)

      if (box.intersectsSphere(sphere)) {
        explode(this, debrisIndex, x, y, z)
        playerDead = playerComponent.damage(calculateDamage(debrisIndex)) <= 0
      }

      const bulletPositions = bullets.getPositions()

      for (const awakeIndex of bullets.getAwake()) {
        v3.set(...at(bulletPositions, awakeIndex * 3))

        if (sphere.containsPoint(v3)) {
          explode(this, debrisIndex, x, y, z)
          bullets.removeAwake(awakeIndex)
        }

        if (abs(v3.x) > FAR && abs(v3.y) > FAR && abs(v3.z) > FAR) {
          bullets.removeAwake(awakeIndex)
        }
      }
    })

    needsUpdate(mesh.instanceMatrix)
  }
})

</script>
<a-entity debris />
