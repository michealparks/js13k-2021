<script context='module' lang='ts'>
import Ship from './Ship.svelte';
import { register } from './util'

const numEnemies = 20

register('enemy', {

})
</script>

{#each Array(numEnemies) as _, i (i)}
<Ship enemy />
{/each}
