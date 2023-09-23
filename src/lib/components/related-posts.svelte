<script lang="ts">
  import { getRelatedPosts } from '$lib/post-handlers';
  import type { PostLink } from '$lib/types';

  export let parentPostKeywords: string | undefined;
  export let parentPostTitle: string;

  let relatedPosts: PostLink[] = [];
  getRelatedPosts(parentPostTitle, parentPostKeywords).then((posts) => {
    relatedPosts = posts;
  });
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
