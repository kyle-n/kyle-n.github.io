<script lang="ts">
  import PageDescription from '$lib/components/page-description.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import RssLink from '$lib/components/rss-link.svelte';
  import PaginationLinks from '$lib/components/pagination-links.svelte';
  import type { ResolvedPaginatedBlogPostList } from '$lib/types';
  import AllKeywordsLink from '$lib/components/all-keywords-link.svelte';
  import DefaultLeadImage from '$lib/components/default-lead-image.svelte';
  import CanonicalUrl from '$lib/components/canonical-url.svelte';

  export let data: ResolvedPaginatedBlogPostList;
</script>

<PageTitle title="Blog" />
<PageDescription description="All blog posts" />
<CanonicalUrl path={`/blog/page/${data.currentPage}`} />
<DefaultLeadImage />

<div id="blog-page-header">
  <h2>Blog</h2>
  <div id="link-container">
    <AllKeywordsLink />
    <RssLink />
  </div>
</div>

<PostList posts={data.posts} />

<div id="pagination">
  <PaginationLinks
    currentPage={data.currentPage}
    totalPageCount={data.totalPageCount}
  />
</div>

<style lang="scss">
  #blog-page-header {
    display: flex;
    justify-content: space-between;

    div {
      align-self: flex-end;
      margin-bottom: 15px;
    }
  }

  #pagination {
    margin-top: 1em;
  }

  :global(#link-container a) {
    margin-right: 1em;
  }
</style>
