import { z } from 'zod'
import { fetchWPPage } from '@/shared/infrastructure/wp.client'
import type { ProcessPage } from '../domain/process.model'

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const processStepSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
})

const processResponseSchema = z.object({
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  acf: z.object({ subtitle: z.string() }).catchall(processStepSchema),
  featured_images: z.object({ full: imageSchema }).optional(),
})

export async function getProcessPage(): Promise<ProcessPage | null> {
  const data = await fetchWPPage('proceso', processResponseSchema)
  if (!data) return null

  const steps = Array.from({ length: 5 }, (_, i) => {
    const step = data.acf[`process_${i + 1}`]
    return {
      title: step.title,
      description: step.description,
      imageUrl: step.image,
    }
  })

  return {
    title: data.title.rendered,
    subtitle: data.acf.subtitle,
    backgroundImage: data.featured_images?.full.url,
    content: data.content.rendered,
    steps,
  }
}
