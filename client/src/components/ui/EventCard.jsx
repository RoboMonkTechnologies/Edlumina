import { Calendar, MapPin } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Badge } from './Badge'

export function EventCard({
  date,
  month,
  title,
  description,
  location,
  category,
  href,
  className,
  ...props
}) {
  const content = (
    <>
      <div className="flex gap-0">
        <div
          className="flex min-w-[4.5rem] flex-col items-center justify-center border-r border-border bg-navy px-3 py-5 text-center"
          aria-label={`${date} ${month}`}
        >
          <span className="font-display text-3xl leading-none text-bright-gold">
            {date}
          </span>
          <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.14em] text-white/70 uppercase">
            {month}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          {category && (
            <Badge variant="gold" icon={Calendar}>
              {category}
            </Badge>
          )}

          <h3 className="font-display text-2xl leading-[0.95] tracking-[0.02em] text-navy uppercase">
            {title}
          </h3>

          {description && (
            <p className="text-sm leading-[1.6] text-muted">{description}</p>
          )}

          {location && (
            <div className="mt-auto flex items-center gap-2 pt-2">
              <MapPin size={14} className="shrink-0 text-teal" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                {location}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )

  const cardClasses = cn(
    'ed-card ed-card--flat overflow-hidden',
    href && 'block transition-shadow duration-[250ms] hover:shadow-md',
    className,
  )

  if (href) {
    return (
      <a href={href} className={cardClasses} {...props}>
        {content}
      </a>
    )
  }

  return (
    <article className={cardClasses} {...props}>
      {content}
    </article>
  )
}
