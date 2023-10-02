<script lang="ts">
  import { base } from '$app/paths';
  import KeywordLinks from '$lib/components/keyword-links.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostDate from '$lib/components/post-date.svelte';
  import RelatedPosts from '$lib/components/related-posts.svelte';
  import type { ResolvedBlogPost } from '$lib/types';
  export let data: ResolvedBlogPost;
</script>

<PageTitle title={data.metadata.title} />

<article>
  <div id="title-and-date">
    <h2 id="post-title">{data.metadata.title}</h2>
    <PostDate date={data.metadata.date} />
    <KeywordLinks keywords={data.metadata.keywords} />
  </div>
  {#if data.metadata.image}
    <img src={base + '/img/' + data.metadata.image} alt={data.metadata.title} />
    {#if data.metadata.caption}
      <p class="caption">{data.metadata.caption}</p>
    {/if}
  {/if}
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
<RelatedPosts
  parentPostKeywords={data.metadata.keywords}
  parentPostTitle={data.metadata.title}
  parentPostHnLink={data.metadata.hn}
/>

<style lang="scss">
  #title-and-date {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 0.5rem;
    }
  }

  img {
    margin-bottom: 0;
  }

  .caption {
    color: #666;
  }
</style>
