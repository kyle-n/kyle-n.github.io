<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { BlogPostLoadData } from '$lib/types';
  export let data: BlogPostLoadData;
</script>

<article>
  <h2>{data.metadata.title}</h2>
  <PostDate date={data.metadata.date} />
  {#if data.metadata.image}
    <img src="/{data.metadata.image}" alt={data.metadata.title} />
  {/if}
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
