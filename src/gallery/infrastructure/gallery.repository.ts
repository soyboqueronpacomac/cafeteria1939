import { z } from 'zod'
import { env } from '@/config/envs'
import type { GalleryPage } from '../domain/gallery.model'

const imageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
})

const galleryItemSchema = z.object({
  large: imageSchema,
  full: imageSchema,
})

const galleryResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }),
  featured_images: z.object({
    full: imageSchema,
  }).optional(),
  gallery: z.array(galleryItemSchema),
})

export async function getGalleryPage(): Promise<GalleryPage | null> {
  const { API_URL } = env
  const url = `${API_URL}/pages?slug=galeria&_embed&t=${Date.now()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch gallery. Status: ${res.status}`)

    const json = await res.json()
    if (!json || json.length === 0) return null

    const data = galleryResponseSchema.parse(json[0])

    return {
      title: data.title.rendered,
      subtitle: data.acf.subtitle,
      backgroundImage: data.featured_images?.full.url,
      images: data.gallery.map(img => ({
        large: img.large,
        full: img.full,
        alt: `Imagen de Cafetería 1939`,
      })),
    }
  } catch (error) {
    console.error('Error fetching gallery page:', error)
    throw error
  }
}
