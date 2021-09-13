<script>
import { ENTER } from './constants'
</script>
<div>
  <h1>THE GALACTIC ASTEROID CLEANUP 1 WAY TICKET LAST RESORT TOP SECRET MISSION</h1>
  <p>
    It's that time of the year again.
  </p>
  <p>
    The annual journey of interstellar killer asteroids from an unknown origin has begun its way toward Earth,
    and it's only you, Dave Spacehero, who can clean up this mess.
  </p>
  <p>
    Godspeed, and you better come home in one piece. As long as you blow up all the asteroids.
  </p>
  <button id={ENTER} type='button'>Enter VR</button>
</div>

<style>
  :global(#app) {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;
  }

  :global(#app), button {
    font-family: monospace;
    color: #fff;
    text-align: center;
  }
  div {
    z-index: 1;
    max-width: 80%;
    margin: auto;
  }
  h1 {
    font-size: 3rem;
    margin: 0;
  }
  p {
    margin: 1rem;
    font-size: 1.3rem;
  }
  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border: 1px solid #fff;
    background: transparent;
    backdrop-filter: blur(5px);
    font-size: 2rem;
  }
</style>
