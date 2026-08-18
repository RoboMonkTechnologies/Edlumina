import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = {
  threshold: 0.28,
  rootMargin: '0px 0px -10% 0px',
}

export function useInView(options = DEFAULT_OPTIONS) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const threshold = options.threshold ?? DEFAULT_OPTIONS.threshold
  const rootMargin = options.rootMargin ?? DEFAULT_OPTIONS.rootMargin

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { threshold, rootMargin })

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isInView]
}
