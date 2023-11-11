<script lang="ts">
  import { base } from '$app/paths';
  import { BLOG_TITLE } from '$lib/blog-metadata';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/page/1' },
    { name: 'Contact', href: '/contact' }
  ].map(link => ({
    ...link,
    href: base + link.href
  }));
</script>

<header>
  <h1>{BLOG_TITLE}</h1>
  <nav>
    {#each navLinks as { name, href }}
      <a {href} class="jumpy-link">{name}</a>
    {/each}
  </nav>
</header>

<style>
  nav {
    display: flex;
    justify-content: space-around;
  }
</style>
