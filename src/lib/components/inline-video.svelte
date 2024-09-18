<script lang="ts">
  import { base } from '$app/paths';

  export let filename: string;

  $: src = `${base}/video/${filename}`;
</script>

<div>
  <video controls>
    <source type="video/mp4" {src} />
  </video>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }
  video {
    width: 250px;
    max-width: 100%;
  }
</style>
