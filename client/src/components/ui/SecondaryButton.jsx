import { cn } from '../../lib/cn'

const sizes = {
  sm: 'ed-btn--sm',
  md: 'ed-btn--md',
  lg: 'ed-btn--lg',
}

const variants = {
  default: 'ed-btn--secondary',
  onDark: 'ed-btn--secondary-on-dark',
  ghost: 'ed-btn--ghost',
}

export function SecondaryButton({
  children,
  size = 'md',
  variant = 'default',
  className,
  type = 'button',
  disabled,
  href,
  ...props
}) {
  const classes = cn('ed-btn', variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}
