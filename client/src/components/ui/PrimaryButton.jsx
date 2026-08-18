import { cn } from '../../lib/cn'

const sizes = {
  sm: 'ed-btn--sm',
  md: 'ed-btn--md',
  lg: 'ed-btn--lg',
}

export function PrimaryButton({
  children,
  size = 'md',
  className,
  type = 'button',
  disabled,
  href,
  ...props
}) {
  const classes = cn('ed-btn', 'ed-btn--primary', sizes[size], className)

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
