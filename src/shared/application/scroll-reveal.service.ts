interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

const ANIMATION_MAP: Record<string, { add: string; removeOpacity: boolean }> = {
  'js-scroll-fade-left': { add: 'animate-slide-in-left', removeOpacity: true },
  'js-scroll-fade-right': { add: 'animate-slide-in-right', removeOpacity: true },
  'js-scroll-fade-up': { add: 'animate-slide-in-up', removeOpacity: true },
  'js-scroll-tilt': { add: 'animate-vintage-tilt', removeOpacity: false },
}

export function setupScrollReveal(options: ScrollRevealOptions = {}): () => void {
  const { threshold = 0.1, rootMargin = '0px' } = options

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      for (const [trigger, config] of Object.entries(ANIMATION_MAP)) {
        if (!entry.target.classList.contains(trigger)) continue

        if (entry.isIntersecting) {
          if (config.removeOpacity) entry.target.classList.remove('opacity-0')
          entry.target.classList.add(config.add)
        } else {
          entry.target.classList.remove(config.add)
          if (config.removeOpacity) entry.target.classList.add('opacity-0')
        }
      }
    })
  }, { root: null, rootMargin, threshold })

  const selectors = Object.keys(ANIMATION_MAP).map(s => `.${s}`).join(', ')
  document.querySelectorAll(selectors).forEach(el => observer.observe(el))

  return () => observer.disconnect()
}
