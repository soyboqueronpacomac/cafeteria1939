import type { WPImage } from '@/shared/domain/wp.model'

export interface BlogCategory {
  id?: number
  name: string
  slug: string
}

export interface BlogPost {
  id: number
  slug: string
  date: string
  title: string
  content: string
  excerpt: string
  categories: BlogCategory[]
  featuredImage?: {
    full: WPImage
    mediumLarge: WPImage
  }
}

export interface BlogPage {
  title: string
  subtitle: string
  backgroundImage?: string
  content: string
}
