/**
 * Resolves gallery photographs from src/assets/gallery by basename.
 *
 * Images are resized at build time (WebP, 480 / 800 / 1200).
 * Missing files render as labelled placeholders — no 404 requests.
 */

const srcsetByPath = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: { w: '480;800;1200', format: 'webp', quality: '82', as: 'srcset' },
  import: 'default',
})

const srcByPath = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: { w: '800', format: 'webp', quality: '82' },
  import: 'default',
})

function basename(path) {
  return path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''
}

function keyFromGlobPath(path) {
  return basename(path.split('?')[0].toLowerCase())
}

const srcsetByName = Object.fromEntries(
  Object.entries(srcsetByPath).map(([path, srcSet]) => [keyFromGlobPath(path), srcSet]),
)

const srcByName = Object.fromEntries(
  Object.entries(srcByPath).map(([path, src]) => [keyFromGlobPath(path), src]),
)

export function resolveGalleryImage(item) {
  if (item.src) {
    return { src: item.src, srcSet: undefined }
  }

  const key = (item.file || item.id || '').toLowerCase()
  const src = srcByName[key]
  if (!src) return null

  return {
    src,
    srcSet: srcsetByName[key],
  }
}
