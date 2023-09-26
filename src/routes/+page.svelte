<script>
  import PageTitle from '$lib/components/page-title.svelte';
</script>

<PageTitle title="Home" />

<main>
  <section id="welcome-section">
    <div id="welcome-header">
      <img src="/img/me.jpeg" alt="Kyle Nazario" />
      <div>
        <h1>Kyle Nazario</h1>
        <h2>Software Engineer</h2>
      </div>
    </div>
    <div id="welcome-text">
      <p>
        Helping teams ship great frontends with <a
          href="https://www.bitovi.com"
          target="_blank">Bitovi</a
        >
        by day, making
        <a href="https://www.nazariosoftware.com" target="_blank"
          >cool side projects</a
        > by night.
      </p>
    </div>
  </section>
  <section>
    <ul>
      <li>
        Experienced building enterprise-scale frontends with Angular, React and
        Svelte
      </li>
      <li>Deep expertise with TypeScript and JavaScript</li>
      <li>
        Expert at reducing frontend complexity and improving test coverage
      </li>
      <li>
        Multiple published, commercially successful <a
          href="https://www.nazariosoftware.com"
          target="_blank"
        >
          web extensions</a
        >
      </li>
    </ul>
  </section>
</main>

<style lang="scss">
  $mobile: 768px;
  main {
    padding: 2em 0 1em 0;
  }
  #welcome-section {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    div {
      width: 50%;
    }

    @media screen and (max-width: $mobile) {
      flex-direction: column;
      text-align: center;
      margin-bottom: 0;
      div {
        width: 100%;
      }
    }
  }
  #welcome-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    div {
      width: 100%;
    }

    h1 {
      margin-top: 0.4em;
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
    margin-top: 0;
    margin-bottom: 0;
    padding: 20px;
    border: 4px solid;
  }

  #welcome-text {
    padding-top: 2em;
    padding-bottom: 2em;
    @media screen and (max-width: $mobile) {
      padding: 0;
    }
  }

  ul {
    margin-bottom: 0;
  }
</style>
