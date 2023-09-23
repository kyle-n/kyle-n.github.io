<script lang="ts">
  import type { PostLink } from '$lib/types';

  export let parentPostKeywords: string[] = [];

  let relatedPosts: PostLink[] = [];
</script>

{#if relatedPosts.length > 0}
  <div class="related-posts">
    <h2>Related Posts</h2>
    <ul>
      {#each relatedPosts as post}
        <li>
          <a href="/blog/{post.postPath}">{post.metadata.title}</a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
