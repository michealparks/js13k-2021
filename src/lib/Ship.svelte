<script lang='ts'>

import { emit, getMesh, register, random, v3 } from './util'
import { SHIP_OBJ, SHIP_MTL, EVENT_MODEL_LOADED, EVENT_PLAYER_DAMAGE, EVENT_SHIP_LOADED } from './constants'

export let position: THREE.Vector3

let mesh: THREE.Mesh
let forward = v3(0, 0, -1)
let target = v3()
let dir = v3()
let health = 10
let dead = false

register('ship', {
	events: {
		[EVENT_MODEL_LOADED] () {
			mesh = getMesh(this, 0) as THREE.Mesh
			emit(this, EVENT_SHIP_LOADED)
		}
	},

	damage (amount = 1): number {
		health -= amount

    if (health <= 0) {
      dead = true
			target.set(-random(0.005), -random(0.005), -0.01)
    }

		emit(this, EVENT_PLAYER_DAMAGE, health)

		return health
	},

	tick () {
		if (!mesh) return

		if (dead) {
			mesh.position.add(target)
			mesh.rotation.z += 0.1
		} else {
			dir.copy(position).sub(mesh.position)
			mesh.quaternion.setFromUnitVectors(forward, dir)
			mesh.position.lerp(position, 0.05)
		}	
	}
})

</script>
<a-obj-model ship src='#{SHIP_OBJ}' mtl='#{SHIP_MTL}' />
