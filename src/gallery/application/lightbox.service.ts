import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export function createLightbox(gallerySelector: string): () => void {
  const lightbox = new PhotoSwipeLightbox({
    gallery: gallerySelector,
    children: 'a',
    pswpModule: () => import('photoswipe'),
  })
  lightbox.init()
  return () => lightbox.destroy()
}
