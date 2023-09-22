<script>
  import Header from '$lib/components/header.svelte';

  const copyrightYear = new Date().getFullYear();
</script>

<Header />

<slot />

<footer>
  <p>© {copyrightYear} Kyle Nazario</p>
</footer>
