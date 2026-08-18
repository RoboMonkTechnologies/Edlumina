import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { useInView } from '../../hooks/useInView'

const DEFER_OPTIONS = { threshold: 0, rootMargin: '800px 0px' }

function hashMatches(id) {
  return typeof window !== 'undefined' && window.location.hash === `#${id}`
}


export function DeferredSection({
  id,
  loader,
  minHeight = '36rem',
  label,
  dark = false,
}) {
  const [ref, inView] = useInView(DEFER_OPTIONS)
  const [fromHash, setFromHash] = useState(() => hashMatches(id))
  const LazyView = useMemo(() => lazy(loader), [loader])
  const show = inView || fromHash

  useEffect(() => {
    const sync = () => {
      if (hashMatches(id)) setFromHash(true)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [id])

  return (
    <div ref={ref}>
      {show ? (
        <Suspense
          fallback={
            <section
              id={id}
              className={dark ? 'ed-defer ed-defer--dark' : 'ed-defer'}
              style={{ minHeight }}
              aria-label={label}
            />
          }
        >
          <LazyView />
        </Suspense>
      ) : (
        <section
          id={id}
          className={dark ? 'ed-defer ed-defer--dark' : 'ed-defer'}
          style={{ minHeight }}
          aria-label={label}
        />
      )}
    </div>
  )
}
