<script context='module' lang='ts'>

import { FAR, WHITE } from './constants'
import { register, randPointInCircle, createPoints, random, setMesh, needsUpdate } from './util'

const COUNT = 1000
const vertices = new Float32Array(COUNT * 3)

let i = 0, j = 0
while (i < COUNT * 3) {
	const [x, y] = randPointInCircle(40)
	vertices[i + 0] = x
	vertices[i + 1] = y
	vertices[i + 2] = random(FAR * 2) - FAR
	i += 3
}

const [points, positionAttr] = createPoints(COUNT, 1, 'circle1', WHITE, vertices)

register('stars', {
	init () {
		setMesh(this, points)
	},

	tick () {
		i = 0
		while (i < COUNT) {
			j = positionAttr.getZ(i) + (i / 1000)
			if (j > FAR) j = -j
			positionAttr.setZ(i, j)
			i += 1
		}

		needsUpdate(positionAttr)
	}
})

</script>
<a-entity stars />
