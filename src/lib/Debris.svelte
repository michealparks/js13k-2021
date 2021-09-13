<script lang='ts'>
import { onMount } from 'svelte'
import { FAR, BULLETS, EVENT_PLAYER_SCORE, EVENT_SHIP_LOADED } from './constants'
import { getMesh, on, random, randPointInCircle, register, abs, emit, float32Array, needsUpdate, queryAttr, randFloat, setMesh, v3 } from './util'

let playerComponent
let player
let bullets
let score = 0

onMount(() => {
  bullets = queryAttr(BULLETS).components.bullets

  on('enter-vr', () => leakDebris(0))

  on(EVENT_SHIP_LOADED, (e: any) => {
    playerComponent = e.target.components.ship
    player = getMesh(playerComponent, 0)
  })
})


let poolSize = 600
let numDebris = 150
let baseRadius = 0.4

let sphere = new THREE.Sphere()
let box = new THREE.Box3()
let v = v3()
let dummy = new THREE.Object3D()
let positions = float32Array(poolSize * 3)
let velocities = float32Array(poolSize * 3)
let rotations = float32Array(poolSize * 3)
let angularVelocities = float32Array(poolSize * 3)
let radii = float32Array(poolSize)
let geometry = new THREE.IcosahedronGeometry(baseRadius)
let material = new THREE.MeshStandardMaterial({ color: '#FF926B' })
let mesh = new THREE.InstancedMesh(geometry, material, poolSize)

let currentFragmentIndex = numDebris
let playerDead = false
let i, j, stride

let setTransform = (i: number, r = 0, x = -FAR, y = -FAR, z = -FAR) => {
  let stride = i * 3

  radii[i] = r

  dummy.scale.setScalar(r)
  dummy.position.set(x, y, z)
  dummy.updateMatrix()

  positions[stride] = x
  positions[stride + 1] = y
  positions[stride + 2] = z
}

let setVelocity = (i: number, vx: number, vy: number, vz: number) => {
  let stride = i * 3
  velocities[stride + 0] = vx
  velocities[stride + 1] = vy
  velocities[stride + 2] = vz

  angularVelocities[stride + 0] = random(0.01)
  angularVelocities[stride + 1] = random(0.01)
  angularVelocities[stride + 2] = random(0.01)
}

let resetPosition = (debrisIndex: number): void => {
  if (debrisIndex >= numDebris) {
    setTransform(debrisIndex)
  } else {
    let [x, y] = randPointInCircle(2)
    setTransform(debrisIndex, baseRadius + random(1), x, y + 1, -FAR - 5)
  }
}

let explode = (entity, debrisIndex: number, x: number, y: number, z: number) => {
  let isFragment = debrisIndex >= numDebris

  if (isFragment) {
    score += 3
    emit(entity, EVENT_PLAYER_SCORE, score)
    setTransform(debrisIndex)
    return
  }

  score += 1
  emit(entity, EVENT_PLAYER_SCORE, score)
  resetPosition(debrisIndex)
  setVelocity(debrisIndex, 0, 0, 0.05 + random(0.1))

  j = 0
  while (j < 10) {
    setTransform(currentFragmentIndex, baseRadius / 1.5, x, y, z)
    setVelocity(currentFragmentIndex, randFloat(-0.02, 0.02), randFloat(-0.02, 0.02), randFloat(0.05, 0.1))

    currentFragmentIndex += 1

    if (currentFragmentIndex === poolSize - 1) {
      currentFragmentIndex = numDebris
    }
    j++
  }
}

let at = (arr: Float32Array, i: number): [x: number, y: number, z: number] =>
  [arr[i], arr[i + 1], arr[i + 2]]

let updateArr = (i: number, arr: Float32Array, updates: Float32Array) => {
  arr[i + 0] += updates[i + 0]
  arr[i + 1] += updates[i + 1]
  arr[i + 2] += updates[i + 2]
}

let calculateDamage = (debrisIndex: number) =>
  debrisIndex > numDebris ? 0.1 : 1

let leakDebris = (i) => {
  if (i < numDebris) {
    setVelocity(i, 0, 0, 0.05 + random(0.1))
    setTimeout(leakDebris, 300, i + 1)
  }
}

register('debris', {

  init () {
    setMesh(this, mesh)
    i = 0
    while (i < poolSize) {
      resetPosition(i)
      i++
    }
  },

  tick () {
    if (!player || !bullets) return

    box.setFromObject(player)

    i = 0
    while (i < poolSize) {
      stride = i * 3
      updateArr(stride, positions, velocities)
      updateArr(stride, rotations, angularVelocities)
      let r = radii[i]
      let [x, y, z] = at(positions, stride)

      if (z > FAR) {
        resetPosition(i)
        i++
        continue
      }

      dummy.scale.set(r, r, r)
      dummy.position.set(x, y, z)
      dummy.rotation.set(rotations[stride], rotations[stride + 1], rotations[stride + 2])
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      if (!playerDead) {
        sphere.set(dummy.position, baseRadius)

        if (box.intersectsSphere(sphere)) {
          explode(this, i, x, y, z)
          playerDead = playerComponent.damage(calculateDamage(i)) <= 0
        }

        let bulletPositions = bullets.positions()

        for (let awakeIndex of bullets.awake()) {
          let [bx, by, bz] = at(bulletPositions, awakeIndex * 3)
          v.set(bx, by, bz)

          if (sphere.containsPoint(v)) {
            explode(this, i, bx, by, bz)
            bullets.sleep(awakeIndex)
          }

          let max = FAR / 6
          if (abs(bx) > max || abs(by) > max || abs(bz) > max) {
            bullets.sleep(awakeIndex)
          }
        }
      }

      i++
    }

    needsUpdate(mesh.instanceMatrix)
  }
})

</script>
<a-entity debris />
