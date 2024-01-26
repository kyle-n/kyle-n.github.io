<script lang="ts">
  import { getCorrectedPostDate } from '$lib/post-handlers';
  import dayjs from 'dayjs';

  export let date: Date | string;

  const dateWithTimezoneOffset = getCorrectedPostDate(date);
  const content = dayjs(dateWithTimezoneOffset).toISOString();
</script>

<svelte:head>
  <meta property="og:publish_date" name="publish_date" {content} />
</svelte:head>
