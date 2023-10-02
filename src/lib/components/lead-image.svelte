<script lang="ts">
  import { base } from '$app/paths';
  import { BLOG_URL } from '$lib/blog-metadata';

  export let filename: string;
  export let alt: string;

  const src = `${base}/img/${filename}`;
  const content = `${BLOG_URL}/img/${filename}`
</script>

<svelte:head>
  <meta property="og:image" {content} />
  <meta property="twitter:image" {content} />
</svelte:head>

<img {src} {alt} />
