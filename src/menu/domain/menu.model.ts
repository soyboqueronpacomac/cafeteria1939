import type { WPImage } from '@/shared/domain/wp.model'

export interface MenuPage {
  title: string
  subtitle: string
  backgroundImage?: string
  content: string
  image?: WPImage
}

export interface MenuItem {
  title: string
  description: string
  price: number
  image?: WPImage
}
