import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
  rootMargin: '-40% 0px -45% 0px',
  threshold: 0,
}

export function useScrollSpy(sectionIds, options = DEFAULT_OPTIONS) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const idsKey = sectionIds.join('|')
  const rootMargin = options.rootMargin ?? DEFAULT_OPTIONS.rootMargin
  const threshold = options.threshold ?? DEFAULT_OPTIONS.threshold

  useEffect(() => {
    const ids = idsKey.split('|').filter(Boolean)
    if (!ids.length) return undefined

    let observer

    const attach = () => {
      observer?.disconnect()
      const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
      if (!elements.length) return

      observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      }, { rootMargin, threshold })

      elements.forEach((element) => observer.observe(element))
    }

    attach()

    const root = document.getElementById('main-content')
    const mutation = new MutationObserver(attach)
    if (root) {
      mutation.observe(root, { childList: true, subtree: true })
    }

    return () => {
      observer?.disconnect()
      mutation.disconnect()
    }
  }, [idsKey, rootMargin, threshold])

  return activeId
}
