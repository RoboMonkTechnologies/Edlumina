import { cn } from '../../lib/cn'

export function Stat({
  value,
  label,
  onDark = false,
  className,
  ...props
}) {
  return (
    <div
      className={cn('ed-stat', onDark && 'ed-stat--on-dark', className)}
      {...props}
    >
      <span className="ed-stat__value" aria-hidden={label ? undefined : true}>
        {value}
      </span>
      {label && <span className="ed-stat__label">{label}</span>}
    </div>
  )
}
