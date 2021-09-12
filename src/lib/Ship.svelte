<script lang='ts'>

import { emit, getMesh, register, random } from './util'
import { Events, SHIP_OBJ, SHIP_MTL } from './constants'

export let position: THREE.Vector3
export let enemy = false
export let player = false

let mesh: THREE.Mesh
let health = 10
let dead = false
let target = new THREE.Vector3()

register('ship', {
	events: {
		[Events.MODEL_LOADED] () {
			mesh = getMesh(this, 0) as THREE.Mesh
		}
	},

	damage (amount = 1): number {
		health -= amount

    if (health <= 0) {
      dead = true
			target.copy(mesh.position)
			target.z = -0.01
			target.x = -random(0.005)
			target.y = -random(0.005)
    }

		emit(this, 'player-damage', health)

		return health
	},

	tick () {
		if (!mesh) return
		
		if (dead) {
			mesh.position.add(target)
			mesh.rotation.z += 0.1
		} else {
			mesh.position.lerp(position, 0.1)
		}	
	}
})

</script>
<a-obj-model
  ship
  {enemy}
  {player}
  src='#{SHIP_OBJ}'
  mtl='#{SHIP_MTL}'
/>
