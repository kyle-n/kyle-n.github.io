<script lang="ts">
  import type { BlogLandingPageLoadData } from '$lib/types';

  export let data: BlogLandingPageLoadData;
</script>

{#each data.posts as post}
  <a href="/blog/{post.postPath}">
    {post.metadata.title}
  </a>
{/each}
