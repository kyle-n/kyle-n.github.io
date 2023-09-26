<script lang="ts">
  export let currentPage: number;
  export let totalPageCount: number;

  const pageNumbers: number[] = [];
  for (let i = 0; i < totalPageCount; i++) {
    pageNumbers.push(i + 1);
  }
</script>

<section>
  {#each pageNumbers as pageNumber}
    {#if pageNumber === currentPage}
      <div>{pageNumber}</div>
    {:else}
      <a href={`/blog?page=${pageNumber}`} class="jumpy-link">{pageNumber}</a>
    {/if}
  {/each}
</section>

<style lang="scss">
  section {
    display: flex;
    a,
    div {
      margin-right: 1.5rem;
    }
  }
</style>
