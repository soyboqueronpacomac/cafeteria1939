import { z } from 'zod'
import { env } from '@/config/envs'
import type { BlogPost, BlogPage, BlogCategory } from '../domain/blog.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const featuredImageSchema = z.object({
  medium_large: imageSchema,
  full: imageSchema,
})

const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  slug: z.string(),
})

const postResponseSchema = z.object({
  id: z.number(),
  slug: z.string(),
  date: z.string(),
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  excerpt: z.object({ rendered: z.string() }),
  featured_images: featuredImageSchema.optional(),
  category_details: z.array(categorySchema).optional(),
})

const postsResponseSchema = z.array(postResponseSchema)

const blogPageSchema = z.object({
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: z.object({ full: imageSchema }).optional(),
})

function mapPost(raw: z.infer<typeof postResponseSchema>): BlogPost {
  return {
    id: raw.id,
    slug: raw.slug,
    date: raw.date,
    title: raw.title.rendered,
    content: raw.content.rendered,
    excerpt: raw.excerpt.rendered,
    categories: raw.category_details ?? [],
    featuredImage: raw.featured_images ? {
      full: raw.featured_images.full,
      mediumLarge: raw.featured_images.medium_large,
    } : undefined,
  }
}

export async function getBlogPage(): Promise<BlogPage | null> {
  const { API_URL } = env
  const url = `${API_URL}/pages?slug=blog&_embed&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch blog page. Status: ${res.status}`)
    const json = await res.json()
    if (!json || json.length === 0) return null

    const data = blogPageSchema.parse(json[0])
    return {
      title: data.title.rendered,
      subtitle: data.acf.subtitle,
      backgroundImage: data.featured_images?.full.url,
      content: data.content.rendered,
    }
  } catch (error) {
    console.error('Error fetching blog page:', error)
    throw error
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { API_URL } = env
  const url = `${API_URL}/posts?_embed&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch posts. Status: ${res.status}`)
    const json = await res.json()
    if (!json || json.length === 0) return []

    return postsResponseSchema.parse(json).map(mapPost)
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { API_URL } = env
  const url = `${API_URL}/posts?slug=${slug}&_embed&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch post: ${slug}. Status: ${res.status}`)
    const json = await res.json()
    if (!json || json.length === 0) return null

    return mapPost(postResponseSchema.parse(json[0]))
  } catch (error) {
    console.error(`Error fetching post [${slug}]:`, error)
    throw error
  }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const { API_URL } = env
  const res = await fetch(`${API_URL}/categories?_fields=slug`)
  const json = await res.json()
  return z.array(z.object({ slug: z.string() })).parse(json).map(c => c.slug)
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory> {
  const { API_URL } = env
  const res = await fetch(`${API_URL}/categories?slug=${slug}`)
  const json = await res.json()
  return categorySchema.parse(json[0])
}

export async function getPostsByCategory(categoryId: number): Promise<BlogPost[]> {
  const { API_URL } = env
  const url = `${API_URL}/posts?categories=${categoryId}&_embed&t=${Date.now()}`
  const res = await fetch(url, { cache: 'no-store' })
  const json = await res.json()
  if (!json || json.length === 0) return []
  return postsResponseSchema.parse(json).map(mapPost)
}
