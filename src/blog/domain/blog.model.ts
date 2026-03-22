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
    full: { url: string; width: number; height: number }
    mediumLarge: { url: string; width: number; height: number }
  }
}

export interface BlogPage {
  title: string
  subtitle: string
  backgroundImage?: string
  content: string
}
