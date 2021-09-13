<script lang='ts'>

import { SHIP_MTL, SHIP_OBJ } from './constants'

let assets = [
  [SHIP_OBJ, './ship.obj'],
  [SHIP_MTL, './ship.mtl']
]

</script>

<a-assets>
  {#each assets as [id, file] (id)}
    <a-asset-item {id} src={file} />
  {/each}
</a-assets>
