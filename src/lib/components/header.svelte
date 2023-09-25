<script lang="ts">
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ];
</script>

<header>
  <h1>Kyle Nazario</h1>
  <nav>
    {#each navLinks as navLink}
      <a href={navLink.href}>{navLink.name}</a>
    {/each}
  </nav>
</header>

<style>
  nav {
    display: flex;
    justify-content: space-around;
  }

  /* Fixes jump on hover */
  nav a {
    border-bottom: 2px solid transparent;
  }
  nav a:hover {
    border-bottom: 2px solid #d9d8dc;
  }
</style>
