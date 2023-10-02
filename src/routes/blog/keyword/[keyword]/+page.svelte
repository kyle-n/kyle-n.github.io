<script lang="ts">
  import { BLOG_IMAGE_FILENAME, BLOG_TITLE } from '$lib/blog-metadata';
  import LeadImage from '$lib/components/lead-image.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import type { ResolvedKeywordPosts } from '$lib/types';

  export let data: ResolvedKeywordPosts;
  const title = `#${data.keyword}`;
</script>

<PageTitle {title} />
<LeadImage filename={BLOG_IMAGE_FILENAME} alt={BLOG_TITLE} hideImage={true} />

<h2>{title}</h2>
<PostList posts={data.posts} />
