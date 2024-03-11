<script lang="ts">
  import { base } from '$app/paths';
  import { BLOG_URL } from '$lib/blog-metadata';

  export let filename: string;
  export let alt: string | undefined = undefined;
  export let hideImage: boolean = false;

  let content: string;
  let src: string;
  $: {
    src = `${base}/img/${filename}`;
    content = `${BLOG_URL}/img/${filename}`;
  }
</script>

<svelte:head>
  <meta property="og:image" {content} />
  <meta property="twitter:image" {content} />
</svelte:head>

{#if !hideImage}
  <img {src} {alt} />
{/if}

<style lang="scss">
  img {
    margin-bottom: 0;
  }
</style>
