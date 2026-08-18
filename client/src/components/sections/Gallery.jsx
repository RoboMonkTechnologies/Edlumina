import '../../styles/gallery.css'
import { GALLERY_ITEMS } from '../../data/gallery'
import { resolveGalleryImage } from '../../lib/galleryImages'
import { SectionHeading, SectionLabel } from '../ui'
import { cn } from '../../lib/cn'

function sizesForSpan(span) {
  if (span === 'wide') return '(min-width: 1024px) 66vw, 100vw'
  if (span === 'tall') return '(min-width: 1024px) 33vw, 100vw'
  if (span === 'land') return '(min-width: 1024px) 50vw, 100vw'
  return '(min-width: 1024px) 33vw, 100vw'
}

function GalleryFrame({ item }) {
  const image = resolveGalleryImage(item)
  const [lineA, lineB] = item.label.split(' / ')

  return (
    <figure className={cn('ed-gallery__frame', `ed-gallery__frame--${item.span}`)}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={item.alt}
          width={800}
          height={533}
          sizes={sizesForSpan(item.span)}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="ed-gallery__img"
        />
      ) : (
        <div className="ed-gallery__placeholder" aria-hidden="true">
          <span className="ed-gallery__shot">{item.id.replace(/-/g, '_').toUpperCase()}</span>
          <p className="ed-gallery__need">
            <span>{lineA}</span>
            {lineB && <span>{lineB}</span>}
          </p>
          <p className="ed-gallery__brief">{item.brief}</p>
        </div>
      )}
      <figcaption className="ed-gallery__caption">
        <span>{item.label}</span>
        <span className={image ? 'ed-gallery__status' : 'ed-gallery__status ed-gallery__status--need'}>
          {image ? 'Kukatpally' : 'Photography in progress'}
        </span>
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  return (
    <section
      id="gallery"
      className="ed-page-section ed-section ed-gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="ed-container">
        <header className="ed-gallery__header">
          <SectionLabel variant="onDark">Gallery</SectionLabel>
          <SectionHeading id="gallery-heading" size="lg" onDark accent="Lab">
            Inside the
          </SectionHeading>
          <p className="ed-gallery__lede">
            Campus, benches, kits, and community — the centre as students
            experience it.
          </p>
        </header>

        <div className="ed-gallery__grid">
          {GALLERY_ITEMS.map((item) => (
            <GalleryFrame key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
