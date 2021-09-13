uniform sampler2D texture;
varying vec2 v_UV;
varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0) * texture2D(texture, v_UV);
}