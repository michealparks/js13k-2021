import { MESH } from './constants'
import type { Entity, Component } from 'aframe'

let textureLoader = new THREE.TextureLoader()

export let randFloat = (min: number, max: number) =>
  random() * (max - min) + min

export let random = (n = 1): number =>
  Math.random() * n

export let abs = (n: number): number =>
  Math.abs(n)

export let randPointInCircle = (R: number) => {
  let a = random(2 * Math.PI)
  let r = R * Math.sqrt(random())
  let x = r * Math.cos(a)
  let y = r * Math.sin(a)
  return [x, y]
}

export let createPoints = (
  count: number,
  size: number,
  tex: string,
  color: string,
  vertices = new Float32Array(count * 3),
): [THREE.Points, THREE.BufferAttribute] => {
  let geometry = new THREE.BufferGeometry()
  let material = new THREE.PointsMaterial({
    size,
    color,
    map: textureLoader.load(`${tex}.png`),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  let positionAttr = new THREE.BufferAttribute(vertices, 3)
	geometry.setAttribute('position', positionAttr)

  let points = new THREE.Points(geometry, material)
  points.frustumCulled = false

  return [points, positionAttr]
}

export const register = (name: string, opts: any): void => {
  AFRAME.registerComponent(name, opts)
}

export const emit = ({ el }: Component, e: string, arg?: unknown): void =>
  el.emit(e, arg)

export const queryAttr = (attr: string): Entity =>
  document.querySelector(`[${attr}]`)

export const on = (event: string, fn: any, root = 'scene'): void =>
  queryAttr(root).addEventListener(event, fn)

const _mesh = (obj) => obj.getObject3D(MESH)

export const getMesh = (obj, child?: number): THREE.Mesh =>
  child !== undefined ? _mesh(obj.el ?? obj).children[child] : _mesh(obj.el ?? obj)

export const setMesh = (obj: Component & { mesh: THREE.Object3D }, mesh: THREE.Object3D): void =>
  obj.el.setObject3D(MESH, mesh)

export const setXYZ = (attr: THREE.BufferAttribute, i: number, x: number, y: number, z: number): void => {
  attr.setXYZ(i, x, y, z)
}

export const needsUpdate = (prop: THREE.BufferAttribute): void => {
  prop.needsUpdate = true
}

export const float32Array = (arg: number): Float32Array =>
  new Float32Array(arg)

export const v3 = (x?: number, y?: number, z?: number) =>
  new THREE.Vector3(x, y, z)
