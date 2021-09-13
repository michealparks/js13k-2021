<script lang='ts'>

import Assets from './lib/Assets.svelte'
import Controls from './lib/Controls.svelte'
import EnterVr from './lib/EnterVR.svelte'
import Stars from './lib/Stars.svelte'
import Debris from './lib/Debris.svelte'
import Bullets from './lib/Bullets.svelte'
import { FAR } from './lib/constants'
import { song } from './lib/song'
import { initSong, generateSong, createWave } from './lib/soundbox'
import { onMount } from 'svelte';

initSong(song)

let audio: HTMLAudioElement

let id = setInterval(() => {
  if (generateSong() >= 1) {
    audio.src = URL.createObjectURL(new Blob([createWave()], { type: 'audio/wav' }))
    clearInterval(id)
  }
})

onclick = () => audio.play()

let renderer = 'antialias:true;highRefreshRate:true;foveationLevel:3;alpha:false;'
let fog = `type:linear;color:#000;far:${FAR};near:0`

if (import.meta.env.DEV) {
  onMount(() => {
    const scene = document.querySelector('a-scene')
    scene.setAttribute('stats', true)
    scene.setAttribute('inspector', true)
  })
}

</script>
<a-scene
  id='a'
  scene
  {fog}
  {renderer}
  vr-mode-ui='enterVRButton:#c;'
>
  <Assets />
  <Controls />
  <Bullets />
  <Stars />
  <Debris />
</a-scene>
<EnterVr />
<audio loop bind:this={audio} />

<style>
  #a { position: absolute; }
</style>