<script lang="ts">
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import type { ResolvedBlogPostList } from '$lib/types';

  export let data: ResolvedBlogPostList;
</script>

<PageTitle title="Blog" />

<h2>Blog</h2>
<PostList posts={data.posts} />
