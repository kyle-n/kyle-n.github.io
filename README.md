# kylenazario.com

This is the source code for my personal blog, [kylenazario.com](https://www.kylenazario.com). It's a good website. You should check it out.

## Usage notes

### Inline images

Svelte does some (very useful) preprocessing with remark and rehype, so inline image URLs need only the filename. All images should be stored in `/static/img`.

```markdown
![Alt text here](my-pic.webp)
```

## Cloudflare Workers

Requires Node.js 22.12+ (or 24+) and npm. Install dependencies with `npm ci`.

- `npm run dev` starts the Vite development server.
- `npm run check` checks Svelte and TypeScript.
- `npm run preview:worker` builds and previews in the local Workers runtime.
- `npm run deploy` builds and deploys to the existing `kn-site` Worker.

For local deployment, authenticate with `npx wrangler login` first. The Worker
name, target account, and runtime settings are in `wrangler.jsonc`. No custom domain is bound yet;
the deployment uses https://kn-site.kylebnazario.workers.dev. Canonical URLs,
feed links, and sitemap URLs continue to use https://kylenazario.com.

For Cloudflare Workers Builds, connect this repository to the existing Worker,
use `npm run build` as the build command, and `npx wrangler deploy` as the deploy
command. Use `npx wrangler versions upload` for non-production branch previews.

GitHub Actions checks, builds, and deploys the `kn-site` Worker after every push
to `main`. Add a repository Actions secret named `CLOUDFLARE_API_TOKEN` containing
a Cloudflare API token scoped to this account with Workers Scripts edit access.
The workflow can also be started manually from the repository's Actions tab.

Pages are prerendered at build time, including blog posts, pagination, keyword
pages, `/rss.xml`, and `/sitemap.xml`. The full-content feed generation continues
to run in Node during the build; the deployed feed is a static XML asset. Rebuild
and deploy after adding or updating posts.

Permanent redirects live in the root `_redirects` file, with both trailing-slash
variants of each legacy URL. The Cloudflare adapter
copies it into the deployment assets alongside its generated headers and redirects.
The root `_headers` file preserves the XML content type and feed/sitemap cache policy.
Keep individual static assets below Cloudflare’s 25 MiB limit; the inline video is
compressed to fit this limit.
Vercel configuration and Speed Insights have been removed.
