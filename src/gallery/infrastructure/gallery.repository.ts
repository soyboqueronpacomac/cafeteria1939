import { z } from 'zod'
import { fetchWPPage } from '@/shared/infrastructure/wp.client'
import type { GalleryPage } from '../domain/gallery.model'

const imageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
})

const galleryResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: z.object({
    full: imageSchema,
  }).optional(),
  gallery: z.array(z.object({
    large: imageSchema,
    full: imageSchema,
  })),
})

export async function getGalleryPage(): Promise<GalleryPage | null> {
  const data = await fetchWPPage('galeria', galleryResponseSchema)
  if (!data) return null

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
    images: data.gallery.map(img => ({
      large: img.large,
      full: img.full,
      alt: 'Imagen de Cafetería 1939',
    })),
  }
}
