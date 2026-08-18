import { useEffect } from 'react'
import {
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  buildJsonLd,
} from '../../data/seo'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement(attributes.tag || 'meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'tag') return
    element.setAttribute(key, value)
  })
}

export function Seo() {
  const jsonLd = JSON.stringify(buildJsonLd())
  const image = absoluteUrl(OG_IMAGE_PATH)

  useEffect(() => {
    document.title = SITE_TITLE
    upsertMeta('meta[name="description"]', { name: 'description', content: SITE_DESCRIPTION })
    upsertMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: `${SITE_URL}/` })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: `${SITE_URL}/` })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  }, [image])

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
  )
}
