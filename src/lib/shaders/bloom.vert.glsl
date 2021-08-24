attribute color;

varying vec2 vUv;
varying vec4 vColor;

void main() {
	vUv = uv;
  vColor = color
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}