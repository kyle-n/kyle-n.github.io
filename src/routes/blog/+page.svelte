<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { BlogLandingPageLoadData } from '$lib/types';

  export let data: BlogLandingPageLoadData;
</script>

<h2>Blog</h2>
{#each data.posts as post}
  <div class="post-preview">
    <a href="/blog/{post.postPath}">
      <h3>{post.metadata.title}</h3>
      <PostDate date={post.metadata.date} />
    </a>
  </div>
{/each}

<style>
  .post-preview {
    border: 1px solid black;
    padding: 1rem;
  }
</style>
