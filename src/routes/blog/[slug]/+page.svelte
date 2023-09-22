<script lang="ts">
  import type { BlogPostData } from '$lib/types';
  import dayjs from 'dayjs';
  export let data: BlogPostData;
  const formattedPostDate = dayjs(data.date).format('MMMM D, YYYY');
</script>

<article>
  <h2>{data.title}</h2>
  <p>{formattedPostDate}</p>
  <div>
    <svelte:component this={data.content} />
  </div>
</article>
