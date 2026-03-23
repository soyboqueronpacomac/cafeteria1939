import { z } from 'zod'
import { fetchWPPage, fetchWPCollection, fetchWPSingle } from '@/shared/infrastructure/wp.client'
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
  const data = await fetchWPPage('blog', blogPageSchema)
  if (!data) return null

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
    content: data.content.rendered,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await fetchWPCollection('posts', postResponseSchema, '_embed')
  return data.map(mapPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchWPSingle('posts', postResponseSchema, `slug=${slug}&_embed`)
  if (!data) return null
  return mapPost(data)
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const data = await fetchWPCollection('categories', z.object({ slug: z.string() }), '_fields=slug')
  return data.map(c => c.slug)
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const data = await fetchWPSingle('categories', categorySchema, `slug=${slug}`)
  return data
}

export async function getPostsByCategory(categoryId: number): Promise<BlogPost[]> {
  const data = await fetchWPCollection('posts', postResponseSchema, `categories=${categoryId}&_embed`)
  return data.map(mapPost)
}
