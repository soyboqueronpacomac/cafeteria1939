import { z } from 'zod'
import { env } from '@/config/envs'

export async function fetchWPPage<T>(slug: string, schema: z.ZodType<T>): Promise<T | null> {
  const url = `${env.API_URL}/pages?slug=${slug}&_embed&t=${Date.now()}`

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

export async function fetchWPProducts<T>(categoryId: number, schema: z.ZodType<T>): Promise<T[]> {
  const url = `${env.API_URL}/products?product_categories=${categoryId}&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch products for category: ${categoryId}. Status: ${res.status}`)

    const json = await res.json()
    if (!json || json.length === 0) return []

    return z.array(schema).parse(json)
  } catch (error) {
    console.error(`Error fetching WP products [category: ${categoryId}]:`, error)
    throw error
  }
}

export async function fetchWPCollection<T>(endpoint: string, schema: z.ZodType<T>, params = ''): Promise<T[]> {
  const url = `${env.API_URL}/${endpoint}?${params}&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}. Status: ${res.status}`)

    const json = await res.json()
    if (!json || json.length === 0) return []

    return z.array(schema).parse(json)
  } catch (error) {
    console.error(`Error fetching WP collection [${endpoint}]:`, error)
    throw error
  }
}

export async function fetchWPSingle<T>(endpoint: string, schema: z.ZodType<T>, params = ''): Promise<T | null> {
  const url = `${env.API_URL}/${endpoint}?${params}&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}. Status: ${res.status}`)

    const json = await res.json()
    if (!json || json.length === 0) return null

    return schema.parse(json[0])
  } catch (error) {
    console.error(`Error fetching WP single [${endpoint}]:`, error)
    throw error
  }
}
