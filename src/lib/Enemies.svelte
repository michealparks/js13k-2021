<script context='module' lang='ts'>
import { SHIP_MTL, SHIP_OBJ } from './constants'
import { register } from './util'

const enemies = []

register('enemy', {

})
</script>

{#each enemies as _, i (i)}
  <a-obj-model enemy src="#{SHIP_OBJ}" mtl="#{SHIP_MTL}" />
{/each}
