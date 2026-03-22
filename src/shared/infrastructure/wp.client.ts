import { z } from 'zod'
import { env } from '@/config/envs'

export async function fetchWPPage<T>(slug: string, schema: z.ZodType<T>): Promise<T | null> {
  const { API_URL } = env
  const url = `${API_URL}/pages?slug=${slug}&_embed&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch page with slug: ${slug}. Status: ${res.status}`)

    const json = await res.json()
    if (!json || json.length === 0) return null

    return schema.parse(json[0])
  } catch (error) {
    console.error(`Error fetching WP page [${slug}]:`, error)
    throw error
  }
}
