<script lang="ts">
  import PublishDate from './publish-date.svelte';

  const now = new Date();
</script>

<PublishDate date={now} />