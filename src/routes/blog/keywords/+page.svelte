<script lang="ts">
  import type { ResolvedKeywordList } from '$lib/types';
  import { base } from '$app/paths';
  import PageTitle from '$lib/components/page-title.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import LeadImage from '$lib/components/lead-image.svelte';
  import { BLOG_IMAGE_FILENAME, BLOG_TITLE } from '$lib/blog-metadata';

  export let data: ResolvedKeywordList;
</script>

<PageTitle title="Keywords" />
<PageDescription description="All post keywords" />
<LeadImage filename={BLOG_IMAGE_FILENAME} alt={BLOG_TITLE} hideImage={true} />

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
