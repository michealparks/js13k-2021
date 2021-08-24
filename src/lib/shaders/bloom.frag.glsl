
varying vec2 vUv;
uniform sampler2D albedo;

float w = 0.1,
      h = 0.1,
      dim = 0.75;

void add (vec4 bloom, vec2 filter) {
  bloom += (texture2D(albedo, filter) - dim);
}

void main () {
  vec4 col = vec4();
  vec4 pixel = vec4(texture2D(albedo, vUv));

  if (pixel.a < 1.0) {
    float glow = pixel.a * ((w + h) / 2.0);
    vec4 bloom = vec4();

    add(bloom, vec2(vUv.x, vUv.y));
		add(bloom, vec2(vUv.x - glow, vUv.y - glow));
		add(bloom, vec2(vUv.x + glow, vUv.y + glow));
		add(bloom, vec2(vUv.x + glow, vUv.y - glow));
		add(bloom, vec2(vUv.x - glow, vUv.y + glow));
		add(bloom, vec2(vUv.x + glow, vUv.y));
		add(bloom, vec2(vUv.x - glow, vUv.y));
		add(bloom, vec2(vUv.x, vUv.y + glow));
		add(bloom, vec2(vUv.x, vUv.y - glow));

    bloom = clamp(bloom / 9.0, 0.0, 1.0);
    col = pixel + bloom;
  } else {
    col = vec4(pixel.rgb, 1.0);
  }

  gl.FragColor = col;
}

varying vec4 vColor;
varying vec4 vertTexCoord;

uniform float brightPassThreshold;

void main() {
	vec3 luminanceVector = vec3(0.2125, 0.7154, 0.0721);
    vec4 c = vColor texture2D(texture, vertTexCoord.st) * vertColor;

    float luminance = dot(luminanceVector, c.xyz);
    luminance = max(0.0, luminance - brightPassThreshold);
    c.xyz *= sign(luminance);
    c.a = 1.0;

    gl_FragColor = c;
}