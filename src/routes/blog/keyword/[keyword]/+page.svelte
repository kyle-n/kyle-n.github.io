<script lang="ts">
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import type { ResolvedKeywordPosts } from '$lib/types';

  export let data: ResolvedKeywordPosts;
</script>

<PageTitle title={data.keyword} />

<h2>{data.keyword}</h2>
<PostList posts={data.posts} />
