import type { WPImage } from '@/shared/domain/wp.model'

export interface GalleryItem {
  large: WPImage
  full: WPImage
  alt: string
}

export interface GalleryPage {
  title: string
  subtitle: string
  backgroundImage?: string
  images: GalleryItem[]
}
