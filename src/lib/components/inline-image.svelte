<script lang="ts">
  import { base } from '$app/paths';

  export let filename: string;
  export let alt: string;

  const src = base + '/img/' + filename;
</script>

<div>
  <img {src} {alt} />
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }
</style>
