<script lang='ts'>

import { ASSETS, SHIP_MTL, SHIP_OBJ } from './constants'

const assets = [
  [SHIP_OBJ, 'ship.obj'],
  [SHIP_MTL, 'ship.mtl']
]

</script>

<a-assets>
  {#each assets as [id, file] (id)}
    <a-asset-item {id} src='{ASSETS}{file}' />
  {/each}
</a-assets>
