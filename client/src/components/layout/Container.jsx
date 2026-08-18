import { cn } from '../../lib/cn'

const widths = {
  default: '',
  content: 'ed-container--content',
  narrow: 'ed-container--narrow',
}

export function Container({
  children,
  as: Tag = 'div',
  width = 'default',
  className,
  ...props
}) {
  return (
    <Tag className={cn('ed-container', widths[width], className)} {...props}>
      {children}
    </Tag>
  )
}
