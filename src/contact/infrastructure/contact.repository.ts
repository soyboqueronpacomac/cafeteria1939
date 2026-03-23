import { z } from 'zod'
import { fetchWPPage } from '@/shared/infrastructure/wp.client'
import type { ContactPage } from '../domain/contact.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const contactResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: z.object({ full: imageSchema }).optional(),
})

export async function getContactPage(): Promise<ContactPage | null> {
  const data = await fetchWPPage('contacto', contactResponseSchema)
  if (!data) return null

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
  }
}
