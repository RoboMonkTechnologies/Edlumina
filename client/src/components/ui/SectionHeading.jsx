import { cn } from '../../lib/cn'

const sizes = {
  '2xl': 'ed-heading--2xl',
  xl: 'ed-heading--xl',
  lg: 'ed-heading--lg',
  md: 'ed-heading--md',
  sm: 'ed-heading--sm',
}

export function SectionHeading({
  children,
  as: Tag = 'h2',
  size = 'lg',
  accent,
  onDark = false,
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'ed-heading',
        sizes[size],
        onDark && 'ed-heading--on-dark',
        className,
      )}
      {...props}
    >
      {accent ? (
        <>
          {children}
          <span className="ed-heading__accent"> {accent}</span>
        </>
      ) : (
        children
      )}
    </Tag>
  )
}
