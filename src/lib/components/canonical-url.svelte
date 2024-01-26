<script lang="ts">
  import { BLOG_URL } from '$lib/blog-metadata';

  export let path: string;

  let href = `${BLOG_URL}${path}`;
</script>

<svelte:head>
  <link rel="canonical" {href} />
  <meta property="og:url" content={href} />
</svelte:head>