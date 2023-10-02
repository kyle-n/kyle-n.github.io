<script lang="ts">
  import { base } from '$app/paths';
  import { getRelatedPosts } from '$lib/post-handlers';
  import type { PostLink } from '$lib/types';

  export let parentPostKeywords: string | undefined;
  export let parentPostTitle: string;
  export let parentPostHnLink: string | undefined;

  let relatedPosts: PostLink[] = [];
  getRelatedPosts(parentPostTitle, parentPostKeywords).then(posts => {
    relatedPosts = posts;
  });
</script>

{#if relatedPosts.length > 0}
  <div class="related-posts">
    <h2>See also</h2>
    <ul>
      {#if parentPostHnLink}
        <li>
          <a href={parentPostHnLink} target="_blank">Hacker News discussion</a>
        </li>
      {/if}
      {#each relatedPosts as post}
        <li>
          <a href={base + '/blog/' + post.postPath}>{post.metadata.title}</a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
