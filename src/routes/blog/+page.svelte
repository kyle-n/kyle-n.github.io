<script lang="ts">
  import PageTitle from '$lib/components/page-title.svelte';
  import PaginationLinks from '$lib/components/pagination-links.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import RssLink from '$lib/components/rss-link.svelte';
  import type { ResolvedBlogPostList } from '$lib/types';

  export let data: ResolvedBlogPostList;
</script>

<PageTitle title="Blog" />

<div id="blog-page-header">
  <h2>Blog</h2>
  <div>
    <RssLink />
  </div>
</div>
<PostList posts={data.posts} />

<div id="pagination">
  <PaginationLinks currentPage={data.currentPage} totalPageCount={data.totalPageCount} />
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
    margin-top: 2rem;
  }
</style>
