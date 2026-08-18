const LOGO_SRCSET = [
  '/assets/logo-96.webp 96w',
  '/assets/logo-192.webp 192w',
  '/assets/logo-360.webp 360w',
  '/assets/logo-512.webp 512w',
].join(', ')

export function BrandLogo({
  width,
  height = width,
  className,
  fetchPriority = 'auto',
  loading = 'eager',
}) {
  const src = width <= 96 ? '/assets/logo-192.webp' : '/assets/logo-360.webp'

  return (
    <img
      src={src}
      srcSet={LOGO_SRCSET}
      sizes={`${width}px`}
      width={width}
      height={height}
      alt=""
      decoding="async"
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
    />
  )
}
