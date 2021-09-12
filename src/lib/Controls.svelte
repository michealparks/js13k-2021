<script lang='ts'>

import Bullets from './Bullets.svelte'
import Ship from './Ship.svelte'
import { EVENT_FIRE, EVENT_FIRE_END, CONTROLS_LIST } from './constants'
import { register, emit } from './util'

let LEFT = 'left'
let CONTROLS = 'controls'

register(CONTROLS, {
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

		for (const ctr of CONTROLS_LIST) {
			el.setAttribute(`${ctr}-${CONTROLS}`, {
				hand,
				model: false,
				orientationOffset: {
					x: 0,
					y: 0,
					z: hand === LEFT ? offset : -offset
				}
			})
		}
	}
})

</script>
<a-entity controls='hand:{LEFT}'><Ship player /></a-entity>
<!-- <a-entity controls='hand:right'><Ship player /></a-entity> -->
<Bullets />
