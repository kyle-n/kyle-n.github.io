<script lang="ts">
  import { base } from '$app/paths';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ].map(link => ({
    ...link,
    href: base + link.href
  }));
</script>

<header>
  <h1>Kyle Nazario</h1>
  <nav>
    {#each navLinks as navLink}
      <a href={navLink.href} class="jumpy-link">{navLink.name}</a>
    {/each}
  </nav>
</header>

<style>
  nav {
    display: flex;
    justify-content: space-around;
  }
</style>
