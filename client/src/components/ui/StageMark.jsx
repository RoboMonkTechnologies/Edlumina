import { cn } from '../../lib/cn'

export const PIPELINE_MOTIF = ['Circuits', 'Build', 'Skills', 'Career']

export function StageMark({
  active = 'circuits',
  onDark = false,
  className,
}) {
  const current = active.toLowerCase()

  return (
    <p
      className={cn('ed-stage', onDark && 'ed-stage--on-dark', className)}
      aria-hidden="true"
    >
      {PIPELINE_MOTIF.map((stage, index) => {
        const id = stage.toLowerCase()
        const isActive = current === 'all' || id === current
        return (
          <span key={stage} className="ed-stage__item">
            {index > 0 && <span className="ed-stage__join" />}
            <span className={cn('ed-stage__word', isActive && 'is-active')}>
              {stage}
            </span>
          </span>
        )
      })}
    </p>
  )
}
