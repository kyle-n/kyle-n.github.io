<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { BlogPostData } from '$lib/types';
  export let data: BlogPostData;
</script>

<article>
  <h2>{data.title}</h2>
  <PostDate date={data.date} />
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
