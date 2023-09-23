<script lang="ts">
  import PostDate from '$lib/components/post-date.svelte';
  import type { ResolvedBlogPostList } from '$lib/types';

  export let data: ResolvedBlogPostList;
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
