import { useEffect } from 'react'

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const { style } = document.body
    const previousOverflow = style.overflow
    const previousPadding = style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    style.overflow = 'hidden'
    if (scrollbar > 0) style.paddingRight = `${scrollbar}px`

    return () => {
      style.overflow = previousOverflow
      style.paddingRight = previousPadding
    }
  }, [locked])
}
