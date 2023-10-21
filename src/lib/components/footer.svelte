<script>
  import RssLink from './rss-link.svelte';

  const copyrightYear = new Date().getFullYear();
</script>

<hr />
<footer>
  <p data-testid="copyright">© {copyrightYear} Kyle Nazario</p>
  <RssLink />
</footer>

<style>
  footer {
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 2rem 0;
  }
</style>
