<script context='module' lang='ts'>
	AFRAME.registerComponent('stars', {
		init () {
			this.count = 10_000
			this.vertices = new Float32Array(this.count * 3)

			let i = 0
			while (i < this.count * 3) {
				this.vertices[i + 0] = Math.random() * 10 - 5
				this.vertices[i + 1] = Math.random() * 10 - 5
				i += 3
			}

			const geometry = new THREE.BufferGeometry()
			const material = new THREE.PointsMaterial()
			
			this.positionAttr = new THREE.BufferAttribute(this.vertices, 3)
			geometry.setAttribute('position', this.positionAttr)

			this.el.setObject3D('mesh', new THREE.Points(geometry, material))
		},

		update () {
			let i = 0
			let z = 0

			while (i < this.count * 3) {
				z = this.positionAttr.getZ(i) + (i / 10)

				if (z > 50) z = -50

				this.positionAttr.setZ(i, z)

				i += 3
			}
			this.positionAttr.needsUpdate = true
		}
	})
</script>

<a-entity stars />