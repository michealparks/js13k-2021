<script lang='ts'>

import Assets from './lib/Assets.svelte'
import Controls from './lib/Controls.svelte'
import EnterVr from './lib/EnterVR.svelte'
import Stars from './lib/Stars.svelte'
import Debris from './lib/Debris.svelte'
import GameOver from './lib/GameOver.svelte'
import { FAR, ENTER } from './lib/constants'
import { song } from './lib/song'
import { initSong, generateSong, createWave } from './lib/soundbox'

initSong(song)

let audio: HTMLAudioElement

const id = setInterval(() => {
  if (generateSong() >= 1) {
    audio.src = URL.createObjectURL(new Blob([createWave()], { type: 'audio/wav' }))
    clearInterval(id)
  }
})

onclick = () => audio.play()

const renderer = 'antialias:true;highRefreshRate:true;foveationLevel:3;alpha:false;'
const fog = `type:linear;color:#000;far:${FAR};near:0`

</script>
<a-scene scene stats inspector {fog} {renderer} vr-mode-ui='enterVRButton:#{ENTER};'>
  <Assets />
  <Controls />
  <Stars />
  <Debris />
  <GameOver />
</a-scene>
<EnterVr />
<audio loop bind:this={audio} />
