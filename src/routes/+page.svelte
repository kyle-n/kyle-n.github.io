<script>
  import PageTitle from '$lib/components/page-title.svelte';
</script>

<PageTitle title="Home" />

<main>
  <section id="welcome-header">
    <div>
      <h1>Kyle Nazario</h1>
      <h2>Software Engineer</h2>
    </div>
    <img src="/img/me.jpeg" alt="Kyle Nazario" />
  </section>
  <section>
    <p>
      Helping teams ship great software. Frontend consultant for <a
        href="https://www.bitovi.com"
        target="_blank">Bitovi</a
      >
      by day, making
      <a href="https://www.nazariosoftware.com" target="_blank"
        >cool side projects</a
      > by night.
    </p>
  </section>
</main>

<style lang="scss">
  #welcome-header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 2em;

    h1 {
      margin-bottom: 0.3em;
    }
    h2 {
      margin-top: 0;
      font-size: 1.5em;
    }
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 0;
    margin-left: 2em;
  }
</style>
