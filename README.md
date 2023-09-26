# kylenazario.com

This is the source code for my personal blog, [kylenazario.com](https://www.kylenazario.com). It's a good website. You should check it out. 

## Usage notes

### Inline images

Svelte requires internal URLs be prefixed with `base`, so rather than deal with that in every blog post Markdown file, I've created a shared component, `<InlineImage />`. Use this instead of Markdown image syntax. 

```svelte
This is some text. 

<InlineImage filename="image.png" alt="Alt text here" />

<script lang="ts">
  import InlineImage from '$lib/components/inline-image.svelte'
</script>
```

### RSS

I've found plenty of examples online for how to serve an RSS feed in SvelteKit, but none that work with a statically rendered site. I'm going to figure out how to do that during the build step. For now, the RSS link doesn't work.
