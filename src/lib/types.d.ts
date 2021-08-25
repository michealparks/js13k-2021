import * as THREE from 'three'
import type { OBB } from 'three/examples/jsm/math/OBB'
declare global {
  const THREE: typeof THREE & { OBB }
}
