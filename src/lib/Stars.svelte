<script context='module' lang='ts'>

import { FAR, SPRITE_CIRCLE, WHITE } from './constants'
import { register, randPointInCircle, createPoints, random, setMesh, needsUpdate, float32Array } from './util'

let SPRITE_SIZE = 0.3
let COUNT = 1000
let vertices = float32Array(COUNT * 3)

let i = 0, j = 0
while (i < COUNT * 3) {
	let [x, y] = randPointInCircle(40)
	vertices[i + 0] = x
	vertices[i + 1] = y
	vertices[i + 2] = random(FAR * 2) - FAR
	i += 3
}

let [points, positionAttr] = createPoints(COUNT, SPRITE_SIZE, SPRITE_CIRCLE, WHITE, vertices)

register('stars', {

	init () {
		setMesh(this, points)
	},

	tick () {
		i = 0
		while (i < COUNT) {
			j = positionAttr.getZ(i) + ((i % 200) / 1000)
			if (j > FAR) j = -j
			positionAttr.setZ(i, j)
			i += 1
		}

		needsUpdate(positionAttr)
	}

})

</script>
<a-entity stars />
