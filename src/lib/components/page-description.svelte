<script lang="ts">
  export let description: string;
</script>

<svelte:head>
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
</svelte:head>