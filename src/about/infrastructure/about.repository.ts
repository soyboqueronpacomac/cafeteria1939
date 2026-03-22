import { z } from 'zod'
import { fetchWPPage } from '@/shared/infrastructure/wp.client'
import type { AboutPage } from '../domain/about.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const featuredImageSchema = z.object({
  medium_large: imageSchema,
  full: imageSchema,
})

const aboutResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: featuredImageSchema.optional(),
})

export async function getAboutPage(): Promise<AboutPage | null> {
  const data = await fetchWPPage('nosotros', aboutResponseSchema)
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
