import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Badge } from './Badge'

export function ProgramCard({
  stage,
  title,
  description,
  icon: Icon,
  tags = [],
  href,
  className,
  ...props
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4 p-5 pb-0 md:p-6 md:pb-0">
        <div className="flex flex-col gap-3">
          {stage && (
            <span className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-teal uppercase">
              {stage}
            </span>
          )}
          {Icon && (
            <div
              className="flex size-10 items-center justify-center border border-border bg-cream text-navy"
              aria-hidden="true"
            >
              <Icon size={20} strokeWidth={1.5} />
            </div>
          )}
        </div>
        {href && (
          <ArrowUpRight
            size={18}
            className="shrink-0 text-muted transition-colors duration-[250ms] group-hover:text-gold"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="font-display text-[1.75rem] leading-[0.95] tracking-[0.02em] text-navy uppercase">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-[1.6] text-muted">{description}</p>
        )}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div
        className="h-[2px] w-0 bg-gold transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
        aria-hidden="true"
      />
    </>
  )

  const cardClasses = cn(
    'ed-card ed-card--flat group flex flex-col overflow-hidden',
    href && 'cursor-pointer',
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
