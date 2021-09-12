<script>
import { ENTER, ENTER_CLASSIC } from './constants'
</script>
<button id={ENTER} type='button'>Enter VR</button>
<button id={ENTER_CLASSIC} type='button'>Play</button>
<style>
  :global(#app) {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;
  }

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border: 1px solid #fff;
    color: #fff;
    background: transparent;
    backdrop-filter: blur(5px);
    font-size: 2rem;
  }
</style>
