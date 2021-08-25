import { ASSETS, MESH, SCENE } from './constants'
import type { Entity } from 'aframe'

const textureLoader = new THREE.TextureLoader()

export const random = (n = 1) => Math.random() * n
export const abs = (n: number) => Math.abs(n)

export const randPointInCircle = (R: number) => {
  const a = random(2 * Math.PI)
  const r = R * Math.sqrt(random())
  const x = r * Math.cos(a)
  const y = r * Math.sin(a)
  return [x, y]
}

export const createPoints = (
  count,
  size,
  tex,
  color,
  vertices = new Float32Array(count * 3),
): [THREE.Points, THREE.BufferAttribute] => {
  const geometry = new THREE.BufferGeometry()
  const material = new THREE.PointsMaterial({
    size,
    color,
    map: textureLoader.load(`${ASSETS}${tex}.png`),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const positionAttr = new THREE.BufferAttribute(vertices, 3)
	geometry.setAttribute('position', positionAttr)

  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false
  return [points, positionAttr]
}

export const register = (name: string, opts: any) =>
  AFRAME.registerComponent(name, opts)

export const emit = (obj, ...args) =>
  obj.el.emit(...args)

export const queryAttr = (attr: string): Entity =>
  document.querySelector(`[${attr}]`)

export const on = (event: string, fn: any, root = SCENE): void =>
  queryAttr(root).addEventListener(event, fn)

export const ready = (fn: any) =>
  addEventListener('load', fn)

export const getMesh = (obj): THREE.Mesh =>
  obj.el ? obj.el.getObject3D(MESH) : obj.getObject3D(MESH)

export const setMesh = (obj, mesh: THREE.Object3D) =>
  obj.el.setObject3D(MESH, mesh)

export const setXYZ = (attr: THREE.BufferAttribute, i: number, x: number, y: number, z: number) =>
  attr.setXYZ(i, x, y, z)

export const needsUpdate = (prop) => {
  prop.needsUpdate = true
}

export const float32Array = (arg) =>
  new Float32Array(arg)

export const createOBB = () =>
  new THREE.OBB()

export const addOBB = (mesh: THREE.Mesh) => {
  mesh.geometry.computeBoundingBox()
  mesh.geometry.userData.obb = createOBB().fromBox3(
    mesh.geometry.boundingBox as THREE.Box3
  )
  const obb = createOBB()
  mesh.userData.obb = obb
  return obb
}

export const updateOBB = (mesh: THREE.Mesh) => {
  mesh.userData.obb.copy(mesh.geometry.userData.obb)
  mesh.userData.obb.applyMatrix4(mesh.matrixWorld)
}
