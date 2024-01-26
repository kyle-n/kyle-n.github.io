<script lang="ts">
  import BuildTimePublishDate from '$lib/components/build-time-publish-date.svelte';
  import CanonicalUrl from '$lib/components/canonical-url.svelte';
  import DefaultLeadImage from '$lib/components/default-lead-image.svelte';
  import PageDescription from '$lib/components/page-description.svelte';
  import PageTitle from '$lib/components/page-title.svelte';
  import PostList from '$lib/components/post-list.svelte';
  import type { ResolvedKeywordPosts } from '$lib/types';

  export let data: ResolvedKeywordPosts;
  const title = `#${data.keyword}`;
  const description = `Posts tagged ${title}`;
</script>

<PageTitle {title} />
<PageDescription {description} />
<CanonicalUrl path={`/blog/keyword/${data.keyword}`} />
<BuildTimePublishDate />
<DefaultLeadImage />

<h2>{title}</h2>
<PostList posts={data.posts} />
