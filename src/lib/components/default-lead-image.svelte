<script lang="ts">
  import { BLOG_IMAGE_FILENAME, BLOG_TITLE } from '$lib/blog-metadata';
  import LeadImage from './lead-image.svelte';
</script>

<LeadImage filename={BLOG_IMAGE_FILENAME} alt={BLOG_TITLE} hideImage={true} />