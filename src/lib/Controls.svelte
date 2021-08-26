<script lang='ts'>

import Bullets from './Bullets.svelte'
import Ship from './Ship.svelte'
import { EVENT_FIRE, EVENT_FIRE_END, CONTROLS } from './constants'
import { register, emit } from './util'

register('controls', {
	events: {
		triggerdown (e: Event) {
			emit(this, EVENT_FIRE, e)
		},
		triggerup (e: Event) {
			emit(this, EVENT_FIRE_END, e)
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

</script>
<a-entity controls='hand:left;'><Ship player /></a-entity>
<!-- <a-entity controls='hand:right'><Ship player /></a-entity> -->
<Bullets />
