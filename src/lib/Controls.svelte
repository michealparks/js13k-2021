<script lang='ts'>
import { onMount } from 'svelte'
import Ship from './Ship.svelte'
import { Events, CONTROLS_LIST } from './constants'
import { register, emit, on } from './util'

const boxSize = 0.1

let LEFT = 'left'
let CONTROLS = 'controls'
let position = new THREE.Vector3()
let health = 1 * boxSize
let text = 'Health'
let score = 0

register(CONTROLS, {
	update () {
		const { hand } = this.data
		const offset = 90

		for (const ctr of CONTROLS_LIST) {
			this.el.setAttribute(`${ctr}-${CONTROLS}`, {
				hand,
				model: false,
				orientationOffset: {
					x: 0,
					y: 0,
					z: 0
					// z: hand === LEFT ? offset : -offset
				}
			})
		}
	}
})

register('ship-controls', {
	events: {
		triggerdown () {
			emit(this, Events.FIRE)
		},
		triggerup () {
			emit(this, Events.FIRE_END)
		}
	},

	tick () {
		position.copy(this.el.getAttribute('position'))
	}
})

onMount(() => {
	on('player-damage', ({ detail }) => {
		health = (detail / 10) * boxSize

		if (health === 0) text = 'Game over'
	})

	on('player-score', ({ detail }) => {
		score = detail
	})
})

</script>
<a-entity controls='hand:{LEFT}' ship-controls />
<a-entity controls='hand:right'>
	<a-box color='tomato' depth={boxSize} height={boxSize} width={health * 2}></a-box>
	<a-box wireframe='true' depth={boxSize} height={boxSize} width={boxSize * 2}></a-box>
	<a-entity position='0 -.14 0' text='value:{text};align:center;' />
	<a-entity position='0 -.3 0' text='value:Score {score};align:center;' />
</a-entity>
<Ship player {position} />
