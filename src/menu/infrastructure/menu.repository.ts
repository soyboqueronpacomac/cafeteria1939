import { z } from 'zod'
import { fetchWPPage, fetchWPProducts } from '@/shared/infrastructure/wp.client'
import type { MenuPage, MenuItem } from '../domain/menu.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const featuredImageSchema = z.object({
  medium_large: imageSchema,
  full: imageSchema,
})

const menuResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: featuredImageSchema.optional(),
})

const menuItemSchema = menuResponseSchema.pick({
  title: true,
  featured_images: true,
}).extend({
  acf: z.object({
    description: z.string(),
    price: z.coerce.number(),
  }),
})

export async function getMenuProducts(categoryId: number): Promise<MenuItem[]> {
  const data = await fetchWPProducts(categoryId, menuItemSchema)

  return data.map((item) => ({
    title: item.title.rendered,
    description: item.acf.description,
    price: item.acf.price,
    image: item.featured_images ? {
      url: item.featured_images.medium_large.url,
      width: item.featured_images.medium_large.width,
      height: item.featured_images.medium_large.height,
    } : undefined,
  }))
}

export async function getMenuPage(): Promise<MenuPage | null> {
  const data = await fetchWPPage('menu', menuResponseSchema)
  if (!data) return null

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
    content: data.content.rendered,
    image: data.featured_images ? {
      url: data.featured_images.medium_large.url,
      width: data.featured_images.medium_large.width,
      height: data.featured_images.medium_large.height,
    } : undefined,
  }
}
