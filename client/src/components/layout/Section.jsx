import { cn } from '../../lib/cn'
import { Container } from './Container'

const tones = {
  cream: 'bg-cream text-navy',
  white: 'bg-white text-navy',
  navy: 'bg-navy text-white',
  dark: 'bg-dark text-white',
}

export function Section({
  id,
  children,
  tone = 'cream',
  container = true,
  containerWidth = 'default',
  className,
  innerClassName,
  showGrid = false,
  ...props
}) {
  const content = container ? (
    <Container width={containerWidth} className={innerClassName}>
      {children}
    </Container>
  ) : (
    children
  )

  return (
    <section
      id={id}
      className={cn(
        'ed-page-section ed-section',
        tones[tone],
        showGrid && 'ed-page-section--show-grid',
        className,
      )}
      {...props}
    >
      {content}
    </section>
  )
}
