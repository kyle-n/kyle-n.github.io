<script lang="ts">
  import { base } from '$app/paths';
  import type { PostLink } from '$lib/types';
  import PostDate from './post-date.svelte';

  export let posts: PostLink[];
</script>

{#each posts as post}
  <div class="post-preview">
    <a href={base + '/blog/' + post.postPath}>
      <h3>{post.metadata.title}</h3>
      <PostDate date={post.metadata.date} />
    </a>
  </div>
{/each}
