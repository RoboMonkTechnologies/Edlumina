import { cn } from '../../lib/cn'
import { handleEnquiryClick } from '../../lib/enquiry'

export function ProgramDossier({
  code,
  category,
  name,
  duration,
  format,
  fee,
  featured = false,
  index,
  interest,
  className,
}) {
  return (
    <article
      className={cn(
        'ed-dossier',
        featured && 'ed-dossier--featured',
        className,
      )}
    >
      <header className="ed-dossier__head">
        <span className="ed-dossier__code">{code}</span>
        <span className="ed-dossier__category">{category}</span>
      </header>

      <p className="ed-dossier__index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </p>

      <h3 className="ed-dossier__title">{name}</h3>

      <dl className="ed-dossier__meta">
        <div>
          <dt>Duration</dt>
          <dd>{duration}</dd>
        </div>
        <div className="ed-dossier__format">
          <dt>Format</dt>
          <dd>{format}</dd>
        </div>
        <div className="ed-dossier__fee">
          <dt>Fee</dt>
          <dd>{fee}</dd>
        </div>
      </dl>

      <a
        className="ed-dossier__cta"
        href="#contact"
        onClick={(event) => handleEnquiryClick(event, interest)}
      >
        Enquire about this program
        <span className="ed-dossier__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  )
}
