<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  export let currentPage: number;
  export let totalPageCount: number;

  const pageNumbers: number[] = [];
  for (let i = 0; i < totalPageCount; i++) {
    pageNumbers.push(i + 1);
  }
</script>

{#if totalPageCount > 1}
  <section>
    {#each pageNumbers as pageNumber}
      {#if pageNumber === currentPage}
        <div>{pageNumber}</div>
      {:else}
        <a href={`${base}/blog/page/${pageNumber}`} class="jumpy-link"
          >{pageNumber}</a
        >
      {/if}
    {/each}
  </section>
{/if}

<style lang="scss">
  section {
    display: flex;
    a,
    div {
      margin-right: 1.5rem;
    }
  }
</style>
