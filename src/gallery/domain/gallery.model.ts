export interface GalleryImage {
  url: string
  width: number
  height: number
}

export interface GalleryItem {
  large: GalleryImage
  full: GalleryImage
  alt: string
}

export interface GalleryPage {
  title: string
  subtitle: string
  backgroundImage?: string
  images: GalleryItem[]
}
