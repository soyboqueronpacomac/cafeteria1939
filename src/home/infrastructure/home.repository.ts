import { z } from 'zod'
import { fetchWPPage } from '@/shared/infrastructure/wp.client'
import type { HomePage } from '../domain/home.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const homeResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: z.object({ full: imageSchema }).optional(),
})

export async function getHomePage(): Promise<HomePage | null> {
  const data = await fetchWPPage('inicio', homeResponseSchema)
  if (!data) return null

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
    content: data.content.rendered,
  }
}
