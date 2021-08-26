<script lang='ts'>

import { getMesh, register, addOBB, updateOBB } from './util'
import { EVENT_MODEL_LOADED, SHIP_OBJ, SHIP_MTL, MESH } from './constants'

export let enemy = false
export let player = false

let health = 10

register('ship', {
	events: {
		[EVENT_MODEL_LOADED] () {
			this.mesh = getMesh(this).children[0] as THREE.Mesh
			addOBB(this.mesh)
		}
	},

	tick () {
		if (this.mesh) updateOBB(this.mesh)
	},

	damage (amount = 1) {
		health -= amount

    console.log(health)

    if (health === 0) {
      this.el.getObject3D(MESH).visible = false
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