<script>
  import {
    BLOG_AUTHOR_BLUESKY,
    BLOG_AUTHOR_EMAIL,
    BLOG_AUTHOR_GITHUB,
    BLOG_AUTHOR_LINKEDIN,
    BLOG_AUTHOR_MASTODON,
    BLOG_AUTHOR_TWITTER,
    BLOG_IMAGE_FILENAME,
    BLOG_TITLE
  } from '$lib/blog-metadata';
  import LeadImage from '$lib/components/lead-image.svelte';
  import PageTitle from '$lib/components/page-title.svelte';

  const accounts = [
    { name: 'Email', href: `mailto:${BLOG_AUTHOR_EMAIL}` },
    { name: 'GitHub', href: `https://github.com/${BLOG_AUTHOR_GITHUB}` },
    {
      name: 'LinkedIn',
      href: `https://linkedin.com/in/${BLOG_AUTHOR_LINKEDIN}`
    },
    { name: 'Mastodon', href: `https://hachyderm.io/${BLOG_AUTHOR_MASTODON}` },
    {
      name: 'Bluesky',
      href: `https://bsky.app/profile/${BLOG_AUTHOR_BLUESKY}`
    },
    { name: 'Twitter', href: `https://twitter.com/${BLOG_AUTHOR_TWITTER}` }
  ];
</script>

<PageTitle title="Contact" />
<LeadImage filename={BLOG_IMAGE_FILENAME} alt={BLOG_TITLE} hideImage={true} />

<h2>Contact</h2>
<main>
  <ul>
    {#each accounts as account}
      <li>
        <a href={account.href} target="_blank" rel="noopener noreferrer">
          {account.name}
        </a>
      </li>
    {/each}
  </ul>
</main>
