<script lang="ts">
  export let id: string;

  const src = `https://www.youtube-nocookie.com/embed/${id}`;
</script>

<iframe
  width="560"
  height="315"
  {src}
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  loading="lazy"
/>
