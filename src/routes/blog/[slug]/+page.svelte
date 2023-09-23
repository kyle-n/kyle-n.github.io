<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { ResolvedBlogPost } from '$lib/types';
  export let data: ResolvedBlogPost;
</script>

<article>
  <h2>{data.metadata.title}</h2>
  <PostDate date={data.metadata.date} />
  {#if data.metadata.image}
    <img src="/img/{data.metadata.image}" alt={data.metadata.title} />
  {/if}
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
