import { cn } from '../../lib/cn'

const variants = {
  teal: '',
  gold: 'ed-label--gold',
  muted: 'ed-label--muted',
  onDark: 'ed-label--on-dark',
}

export function SectionLabel({
  children,
  variant = 'teal',
  showRules = true,
  className,
  ...props
}) {
  return (
    <span
      className={cn('ed-label', variants[variant], className)}
      {...props}
    >
      {showRules && <span className="ed-label__rule" aria-hidden="true" />}
      <span>{children}</span>
      {showRules && <span className="ed-label__rule" aria-hidden="true" />}
    </span>
  )
}
