<script lang="ts">
  import CanonicalUrl from '$lib/components/canonical-url.svelte';
  import DefaultLeadImage from '$lib/components/default-lead-image.svelte';
  import KeywordLinks from '$lib/components/keyword-links.svelte';
  import LeadImage from '$lib/components/lead-image.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostDate from '$lib/components/post-date.svelte';
  import PublishDate from '$lib/components/publish-date.svelte';
  import RelatedPosts from '$lib/components/related-posts.svelte';
  import type { ResolvedBlogPost } from '$lib/types';
  export let data: ResolvedBlogPost;
</script>

<PageTitle title={data.metadata.title} />
<PageDescription description={data.metadata.description} />
<CanonicalUrl path={`/blog/${data.slug}`} />
<PublishDate date={data.metadata.date} />

<article>
  <div id="title-and-date">
    <h2 id="post-title">{data.metadata.title}</h2>
    <PostDate date={data.metadata.date} />
    <KeywordLinks keywords={data.metadata.keywords} />
  </div>
  {#if data.metadata.image}
    <div id="lead-image-container">
      <LeadImage filename={data.metadata.image} alt={data.metadata.title} />
    </div>
    {#if data.metadata.caption}
      <p class="caption">{data.metadata.caption}</p>
    {/if}
  {:else}
    <DefaultLeadImage />
  {/if}
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
<RelatedPosts
  parentPostKeywords={data.metadata.keywords}
  parentPostTitle={data.metadata.title}
  parentPostRelatedLinks={data.metadata.relatedLinks}
/>

<style lang="scss">
  #title-and-date {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 0.5rem;
    }
  }

  #lead-image-container {
    margin-bottom: 0;
  }

  .caption {
    color: #666;
  }
</style>
