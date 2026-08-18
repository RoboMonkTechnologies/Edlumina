import { useEffect, useState } from 'react'

const IDLE = { x: 0, y: 0 }

/**
 * Fine-pointer, reduced-motion-aware parallax offset.
 * Disabled on touch devices to keep the hero light.
 */
export function useSubtleParallax(strength = 10) {
  const [offset, setOffset] = useState(IDLE)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer: fine)')

    if (reduce.matches || !fine.matches) return undefined

    let frame = 0

    const onMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setOffset({
          x: (event.clientX / window.innerWidth - 0.5) * strength,
          y: (event.clientY / window.innerHeight - 0.5) * strength,
        })
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [strength])

  return offset
}
