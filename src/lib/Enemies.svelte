<script context='module' lang='ts'>
import { SHIP_MTL, SHIP_OBJ } from './constants'
import { register } from './util'

const numEnemies = 20

register('enemy', {

})
</script>

{#each Array(numEnemies) as _, i (i)}
  <a-obj-model enemy src="#{SHIP_OBJ}" mtl="#{SHIP_MTL}" />
{/each}
