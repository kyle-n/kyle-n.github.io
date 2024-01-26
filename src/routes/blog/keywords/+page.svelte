<script lang="ts">
  import type { ResolvedKeywordList } from '$lib/types';
  import { base } from '$app/paths';
  import PageTitle from '$lib/components/page-title.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import DefaultLeadImage from '$lib/components/default-lead-image.svelte';
  import CanonicalUrl from '$lib/components/canonical-url.svelte';
  import BuildTimePublishDate from '$lib/components/build-time-publish-date.svelte';

  export let data: ResolvedKeywordList;
</script>

<PageTitle title="Keywords" />
<PageDescription description="All post keywords" />
<CanonicalUrl path="/blog/keywords" />
<BuildTimePublishDate />
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
