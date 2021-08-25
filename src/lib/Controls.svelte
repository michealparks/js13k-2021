<script lang='ts'>

import Bullets from './Bullets.svelte'
import { EVENT_FIRE, EVENT_FIRE_END, SHIP_MTL, SHIP_OBJ, CONTROLS, EVENT_MODEL_LOADED } from './constants'
import { getMesh, register, emit, addOBB, updateOBB } from './util'

register('controls', {
	events: {
		triggerdown (e) {
			emit(this, EVENT_FIRE, e)
		},
		triggerup () {
			emit(this, EVENT_FIRE_END)
		}
	},

	update () {
		const { hand } = this.data
		const { el } = this
		const offset = 90

		for (const attr of CONTROLS) {
			el.setAttribute(attr, {
				hand,
				model: false,
				orientationOffset: {
					x: 0,
					y: 0,
					z: hand === 'left' ? offset : -offset
				}
			})
		}
	}
})

register('ship', {
	events: {
		[EVENT_MODEL_LOADED] () {
			this.mesh = getMesh(this).children[0] as THREE.Mesh
			addOBB(this.mesh)
		}
	},

	tick () {
		if (this.mesh) updateOBB(this.mesh)
	}
})

</script>
<a-entity controls><a-obj-model ship src='#{SHIP_OBJ}' mtl='#{SHIP_MTL}' /></a-entity>
<a-entity hand-controls='hand:right;' />
<Bullets />
