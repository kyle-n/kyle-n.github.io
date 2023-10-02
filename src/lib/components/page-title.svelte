<script lang="ts">
  export let title: string;
</script>

<svelte:head>
  <title>{title} | Kyle Nazario</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
</svelte:head>
