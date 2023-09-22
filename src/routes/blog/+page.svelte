<script lang="ts">
  export let data: any;
</script>

{#each data as post}
  <p>{post.title}</p>
{/each}