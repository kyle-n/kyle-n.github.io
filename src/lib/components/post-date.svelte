<script lang="ts">
  import { getCorrectedPostDate } from '$lib/post-handlers';
  import dayjs from 'dayjs';
  export let date: Date | string;
  const dateWithTimezoneOffset = getCorrectedPostDate(date);
  const formattedPostDate = dayjs(dateWithTimezoneOffset).format(
    'MMMM D, YYYY'
  );
</script>

<div class="formatted-post-date">{formattedPostDate}</div>

<style>
  div {
    color: #666;
  }
</style>
