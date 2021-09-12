import { ASSETS, MESH, SCENE } from './constants'
import type { Entity, Component, THREE } from 'aframe'
import vertexShader from './shaders/vert.glsl'
import fragmentShader from './shaders/point.frag.glsl'

const textureLoader = new THREE.TextureLoader()

export const random = (n = 1): number =>
  Math.random() * n

export const abs = (n: number): number =>
  Math.abs(n)

export const randPointInCircle = (R: number) => {
  const a = random(2 * Math.PI)
  const r = R * Math.sqrt(random())
  const x = r * Math.cos(a)
  const y = r * Math.sin(a)
  return [x, y]
}

export const createPoints = (
  count: number,
  size: number,
  tex: string,
  color: string,
  vertices = new Float32Array(count * 3),
): [THREE.Points, THREE.BufferAttribute] => {
  const geometry = new THREE.BufferGeometry()
  // const material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     size: { value: 30 },
  //   },
  //   vertexShader,
  //   fragmentShader,
  //   transparent: true,
  // })

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

export const register = (name: string, opts: any): void => {
  AFRAME.registerComponent(name, opts)
}

export const emit = ({ el }: Component, e: string, arg?: unknown): void => {
  el.emit(e, arg)
}

export const queryAttr = (attr: string): Entity =>
  document.querySelector(`[${attr}]`)

export const on = (event: string, fn: any, root = SCENE): void =>
  queryAttr(root).addEventListener(event, fn)

export const ready = (fn: any) =>
  addEventListener('load', fn)

const _mesh = (obj) => obj.getObject3D(MESH)

export const getMesh = (obj, child?: number): THREE.Mesh =>
  child !== undefined ? _mesh(obj.el ?? obj).children[child] : _mesh(obj.el ?? obj)

export const setMesh = (obj: Component & { mesh: THREE.Object3D }, mesh: THREE.Object3D): void => {
  obj.el.setObject3D(MESH, mesh)
  obj.mesh = mesh
}

export const setXYZ = (attr: THREE.BufferAttribute, i: number, x: number, y: number, z: number): void => {
  attr.setXYZ(i, x, y, z)
}

export const needsUpdate = (prop: THREE.BufferAttribute): void => {
  prop.needsUpdate = true
}

export const float32Array = (arg: number): Float32Array =>
  new Float32Array(arg)

export const createOBB = (): OBB =>
  new THREE.OBB()

export const addOBB = (mesh: THREE.Mesh) => {
  const { geometry } = mesh

  geometry.computeBoundingBox()
  geometry.userData.obb = createOBB().fromBox3(
    geometry.boundingBox as THREE.Box3
  )

  const obb = createOBB()
  mesh.userData.obb = obb

  return obb
}

export const updateOBB = (mesh: THREE.Mesh) => {
  const { obb } = mesh.userData

  obb.copy(mesh.geometry.userData.obb)
  obb.applyMatrix4(mesh.matrixWorld)
}
