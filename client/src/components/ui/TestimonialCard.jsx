import { cn } from '../../lib/cn'

export function TestimonialCard({
  quote,
  author,
  role,
  program,
  className,
  ...props
}) {
  return (
    <blockquote
      className={cn('ed-card flex flex-col gap-6 p-6 md:p-8', className)}
      {...props}
    >
      <div className="flex gap-3" aria-hidden="true">
        <span className="font-display text-4xl leading-none text-gold">"</span>
      </div>

      <p className="text-base leading-[1.65] text-navy md:text-[1.0625rem]">
        {quote}
      </p>

      <footer className="mt-auto flex flex-col gap-1 border-t border-border pt-5">
        <cite className="font-body text-sm font-semibold not-italic text-navy">
          {author}
        </cite>
        {role && (
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
            {role}
          </span>
        )}
        {program && (
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
            {program}
          </span>
        )}
      </footer>
    </blockquote>
  )
}
