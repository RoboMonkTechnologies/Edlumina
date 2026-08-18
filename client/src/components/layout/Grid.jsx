import { cn } from '../../lib/cn'

const spanMap = {
  1: 'ed-col-1',
  2: 'ed-col-2',
  3: 'ed-col-3',
  4: 'ed-col-4',
  5: 'ed-col-5',
  6: 'ed-col-6',
  7: 'ed-col-7',
  8: 'ed-col-8',
  9: 'ed-col-9',
  10: 'ed-col-10',
  11: 'ed-col-11',
  12: 'ed-col-full',
  full: 'ed-col-full',
}

const smSpanMap = {
  4: 'ed-col-sm-4',
  6: 'ed-col-sm-6',
  8: 'ed-col-sm-8',
  12: 'ed-col-sm-12',
}

const mdSpanMap = {
  3: 'ed-col-md-3',
  4: 'ed-col-md-4',
  5: 'ed-col-md-5',
  6: 'ed-col-md-6',
  7: 'ed-col-md-7',
  8: 'ed-col-md-8',
  9: 'ed-col-md-9',
}

const lgSpanMap = {
  3: 'ed-col-lg-3',
  4: 'ed-col-lg-4',
  5: 'ed-col-lg-5',
  6: 'ed-col-lg-6',
  7: 'ed-col-lg-7',
  8: 'ed-col-lg-8',
}

const offsetMap = {
  1: 'ed-offset-md-1',
  2: 'ed-offset-md-2',
}

const lgOffsetMap = {
  1: 'ed-offset-lg-1',
  2: 'ed-offset-lg-2',
}

const gapMap = {
  default: '',
  sm: 'ed-grid--gap-sm',
  lg: 'ed-grid--gap-lg',
}

export function Grid({
  children,
  as: Tag = 'div',
  span,
  sm,
  md,
  lg,
  offset,
  lgOffset,
  gap = 'default',
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'ed-grid',
        gapMap[gap],
        span && spanMap[span],
        sm && smSpanMap[sm],
        md && mdSpanMap[md],
        lg && lgSpanMap[lg],
        offset && offsetMap[offset],
        lgOffset && lgOffsetMap[lgOffset],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function GridItem({
  children,
  as: Tag = 'div',
  span = 'full',
  sm,
  md,
  lg,
  offset,
  lgOffset,
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        spanMap[span] ?? spanMap.full,
        sm && smSpanMap[sm],
        md && mdSpanMap[md],
        lg && lgSpanMap[lg],
        offset && offsetMap[offset],
        lgOffset && lgOffsetMap[lgOffset],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
