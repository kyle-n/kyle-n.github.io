<script lang="ts">
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];
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
