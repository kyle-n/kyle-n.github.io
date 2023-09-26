<script lang="ts">
  import { base } from '$app/paths';

  export let keywords: string | undefined;

  let keywordList = new Set<string>();
  $: {
    if (keywords) {
      keywordList = new Set(keywords.split(',').map(keyword => keyword.trim()));
    }
  }
</script>

{#if keywords}
  <div class="keyword-links">
    {#each keywordList as keyword}
      <a href={base + '/blog/keyword/' + keyword} class="jumpy-link"
        >#{keyword}</a
      >
    {/each}
  </div>
{/if}

<style lang="scss">
  .keyword-links {
    display: flex;
    flex-wrap: wrap;
    a {
      display: block;
      margin-right: 1.5rem;
    }
  }
</style>
