<script lang="ts">
  import { generateTitle } from '$lib/willis';

  let title = '';
  function updateTitle() {
    title = generateTitle()
  }
</script>

<div id="willis-title-box">{title}</div>

<button id="willis-button" on:click={updateTitle}>Generate title</button>

<style>
  #willis-title-box {
    margin: 1rem auto;
    min-height: 3rem;
    height: auto;
    border: 1px solid;
    border-radius: 0.25rem;
    font-size: 2.5rem;
    text-align: center;
  }
  #willis-button {
    display: block;
    margin: 1rem auto;
    height: 4rem;
    font-size: 2rem;
  }
</style>
