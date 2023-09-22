<script lang="ts">
  import dayjs from 'dayjs';
  export let date: string | Date;
  const dateWithTimezoneOffset = new Date(date);
  dateWithTimezoneOffset.setHours(dateWithTimezoneOffset.getHours() + 6)
  const formattedPostDate = dayjs(dateWithTimezoneOffset).format('MMMM D, YYYY');
</script>

<div>{formattedPostDate}</div>

<style>
  div {
    color: #666;
  }
</style>