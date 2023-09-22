export async function load({ params }) {
  const slug: string = params.slug;
  const post = await import(`../${slug}.md`);
  const { title } = post.metadata;
  const date = new Date(slug.slice(0, 10));
  date.setHours(date.getHours() + 6)
  const content = post.default;
  return {
    title, date, content
  }
}