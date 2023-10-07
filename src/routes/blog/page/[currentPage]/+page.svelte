
<script lang="ts">
  import { BLOG_IMAGE_FILENAME, BLOG_TITLE } from '$lib/blog-metadata';
  import LeadImage from '$lib/components/lead-image.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import RssLink from '$lib/components/rss-link.svelte';
  import PaginationLinks from '$lib/components/pagination-links.svelte';
  import type { ResolvedPaginatedBlogPostList } from '$lib/types';

  export let data: ResolvedPaginatedBlogPostList;
</script>

<PageTitle title="Blog" />
<PageDescription description="All blog posts" />
<LeadImage filename={BLOG_IMAGE_FILENAME} alt={BLOG_TITLE} hideImage={true} />

<div id="blog-page-header">
  <h2>Blog</h2>
  <div>
    <RssLink />
  </div>
</div>

<PostList posts={data.posts} />

<section id="pagination">
<PaginationLinks currentPage={data.currentPage} totalPageCount={data.totalPageCount} />
</section>

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
</style>
