<script>
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import {
    BLOG_DESCRIPTION,
    BLOG_DOMAIN,
    BLOG_IMAGE,
    BLOG_TITLE,
    BLOG_URL
  } from '$lib/blog-metadata';
  import PageTitle from '$lib/components/page-title.svelte';
  import LeadImage from '$lib/components/lead-image.svelte';
</script>

<svelte:head>
  <!-- HTML meta tags -->
  <meta name="description" content={BLOG_DESCRIPTION} />

  <!-- Facebook -->
  <meta property="og:url" content={BLOG_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:description" content={BLOG_DESCRIPTION} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:domain" content={BLOG_DOMAIN} />
  <meta property="twitter:url" content={BLOG_URL} />
  <meta property="twitter:description" content={BLOG_DESCRIPTION} />
</svelte:head>

<PageTitle title={BLOG_TITLE} />

<Header />

<slot />

<Footer />
