<script>
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import {
    BLOG_DESCRIPTION,
    BLOG_DOMAIN,
    BLOG_TITLE,
    BLOG_URL
  } from '$lib/blog-metadata';
  import PageTitle from '$lib/components/page-title.svelte';
</script>

<svelte:head>
  <!-- Facebook -->
  <meta property="og:url" content={BLOG_URL} />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:domain" content={BLOG_DOMAIN} />
  <meta property="twitter:url" content={BLOG_URL} />
</svelte:head>

<PageTitle title={BLOG_TITLE} />

<Header />

<slot />

<Footer />
