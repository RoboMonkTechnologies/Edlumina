import { cn } from '../../lib/cn'

const variants = {
  gold: 'ed-badge--gold',
  teal: 'ed-badge--teal',
  navy: 'ed-badge--navy',
  outline: 'ed-badge--outline',
}

export function Badge({
  children,
  variant = 'teal',
  icon: Icon,
  className,
  ...props
}) {
  return (
    <span className={cn('ed-badge', variants[variant], className)} {...props}>
      {Icon && <Icon size={12} strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  )
}
