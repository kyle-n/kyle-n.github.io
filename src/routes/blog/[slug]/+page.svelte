<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { ResolvedBlogPost } from '$lib/types';
  export let data: ResolvedBlogPost;
</script>

<article>
  <div id="title-and-date">
  <h2>{data.metadata.title}</h2>
  <PostDate date={data.metadata.date} />
  </div>
  {#if data.metadata.image}
    <img src="/img/{data.metadata.image}" alt={data.metadata.title} />
  {/if}
  <div>
    <svelte:component this={data.content} />
  </div>
</article>

<style lang="scss">
  #title-and-date {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 0;
    }
  }
</style>
