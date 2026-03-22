export interface WPImage {
  url: string
  width: number
  height: number
}

export interface WPFeaturedImages {
  thumbnail: WPImage
  medium: WPImage
  medium_large: WPImage
  large: WPImage
  full: WPImage
}

export interface WPBasePage {
  id: number
  slug: string
  date: string
  title: string
  content: string
  excerpt: string
  subtitle: string
  featuredImages?: WPFeaturedImages
}
