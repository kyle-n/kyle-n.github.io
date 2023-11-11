<script lang="ts">
  import type { ResolvedKeywordList } from '$lib/types';
  import { base } from '$app/paths';
  import PageTitle from '$lib/components/page-title.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import DefaultLeadImage from '$lib/components/default-lead-image.svelte';

  export let data: ResolvedKeywordList;
</script>

<PageTitle title="Keywords" />
<PageDescription description="All post keywords" />
<DefaultLeadImage />

<div>
  <h2>Keywords</h2>
  <ul>
    {#each data.keywords as keyword}
      <li>
        <a href={`${base}/blog/keyword/${keyword}`}>#{keyword}</a>
      </li>
    {/each}
  </ul>
</div>
