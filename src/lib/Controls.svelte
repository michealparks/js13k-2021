<script lang='ts'>
import { onMount } from 'svelte'
import Ship from './Ship.svelte'
import { CONTROLS_LIST, EVENT_FIRE, EVENT_FIRE_END, EVENT_PLAYER_DAMAGE, EVENT_PLAYER_SCORE, EVENT_SHIP_LOADED } from './constants'
import { register, emit, on, getMesh, v3 } from './util'

let boxSize = 0.1

let CONTROLS = 'controls'
let mesh: THREE.Mesh
let position = v3()
let health = 1 * boxSize
let text = 'Health'
let score = 'Score 0'

register(CONTROLS, {
	update () {
		for (let ctr of CONTROLS_LIST) {
			this.el.setAttribute(`${ctr}-${CONTROLS}`, {
				hand: this.data.hand,
				model: false
			})
		}
	}
})

register('ship-controls', {
	events: {
		triggerdown () {
			emit(this, EVENT_FIRE, mesh)
		},
		triggerup () {
			emit(this, EVENT_FIRE_END)
		}
	},

	tick () {
		position.copy(this.el.getAttribute('position'))
	}
})

onMount(() => {
	on(EVENT_SHIP_LOADED, (e: any) => {
    mesh = getMesh(e.target.components.ship, 0)
  })

	on(EVENT_PLAYER_DAMAGE, ({ detail }) => {
		health = (detail / 10) * boxSize

		if (health <= 0) text = 'Game over'
	})

	on(EVENT_PLAYER_SCORE, ({ detail }) => {
		score = `Score ${detail}`
	})
})

let makeText = (value: string) => `value:${value};align:center`

</script>
<a-entity controls='hand:left' ship-controls />
<a-entity controls='hand:right'>
	<a-box color='tomato' depth={boxSize} height={boxSize} width={health * 2} />
	<a-box wireframe='true' depth={boxSize} height={boxSize} width={boxSize * 2} />
	<a-entity position='0 -.2 0' text={makeText(text)} />
	<a-entity position='0 -.3 0' text={makeText(score)} />
</a-entity>
<Ship {position} />
