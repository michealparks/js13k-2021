<script lang='ts'>

import Assets from './lib/Assets.svelte'
import Controls from './lib/Controls.svelte'
import EnterVr from './lib/EnterVR.svelte'
import Stars from './lib/Stars.svelte'
import Debris from './lib/Debris.svelte'
import { FAR } from './lib/constants'

const renderer = 'antialias:true;highRefreshRate:true;foveationLevel:3;alpha:false;'
const ui = 'enterVRButton:#enter;'
const fog = `type:linear;color:#000;far:${FAR};near:0`

</script>
<a-scene scene stats inspector renderer='{renderer}' vr-mode-ui='{ui}' fog='{fog}'>
  <Assets />
  <Controls />
  <Stars />
  <Debris />
</a-scene>
<EnterVr />
