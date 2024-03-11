<script lang="ts">
  import { base } from '$app/paths';
  import { getRelatedPosts } from '$lib/post-handlers';
  import type { PostLink } from '$lib/types';

  export let parentPostKeywords: string | undefined;
  export let parentPostTitle: string;
  export let parentPostRelatedLinks: Record<string, string> | undefined;

  let gettingRelatedPosts: Promise<PostLink[]>;
  $: {
    gettingRelatedPosts = getRelatedPosts(parentPostTitle, parentPostKeywords);
  }
</script>

{#await gettingRelatedPosts then relatedPosts}
  {#if relatedPosts.length > 0}
    <div class="related-posts">
      <h2>See also</h2>
      <ul>
        {#each Object.entries(parentPostRelatedLinks ?? {}) as [name, href]}
          <li>
            <a {href} target="_blank">{name}</a>
          </li>
        {/each}
        {#each relatedPosts as post}
          <li>
            <a href={base + '/blog/' + post.postPath}>{post.metadata.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
{/await}
