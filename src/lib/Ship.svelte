<script lang='ts'>

import { getMesh, register, addOBB, updateOBB } from './util'
import { EVENT_MODEL_LOADED, SHIP_OBJ, SHIP_MTL } from './constants'

export let enemy = false
export let player = false

let health = 10

register('ship', {
	events: {
		[EVENT_MODEL_LOADED] () {
			this.mesh = getMesh(this, 0) as THREE.Mesh
			addOBB(this.mesh)
		}
	},

	tick () {
		if (this.mesh !== undefined) {
      updateOBB(this.mesh)
    }
	},

	damage (amount = 1): number {
		health -= amount

    console.log(health)

    if (health === 0) {
      this.mesh.visible = false
    }

		return health
	},
})

</script>
<a-obj-model
  ship
  {enemy}
  {player}
  src='#{SHIP_OBJ}'
  mtl='#{SHIP_MTL}'
/>