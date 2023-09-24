import { getAllPosts } from '$lib/post-handlers'

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  return new Response(
    await getRssXml(),
    { headers }
  )
}

async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts()
  return ''
}
