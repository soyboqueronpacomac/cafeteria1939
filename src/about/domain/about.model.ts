import type { WPImage } from '@/shared/domain/wp.model'

export interface AboutPage {
  title: string
  subtitle: string
  backgroundImage?: string
  content: string
  image?: WPImage
}
