import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/pipeline.css'
import { SectionLabel, SectionHeading } from '../ui'
import { cn } from '../../lib/cn'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    id: 'circuit',
    number: '01',
    title: 'First Circuit',
    kicker: 'Grade 3',
    copy: 'Grade 3 students build their first working circuit and robot.',
  },
  {
    id: 'school',
    number: '02',
    title: 'School Years',
    kicker: 'Through Grade 12',
    copy: 'Weekend & after-school programs through Grade 12.',
  },
  {
    id: 'college',
    number: '03',
    title: 'College',
    kicker: 'Campus & industry',
    copy: 'Skill Builder programs bridge campus and industry.',
  },
  {
    id: 'career',
    number: '04',
    title: 'Career',
    kicker: 'Certifications',
    copy: 'Job-ready certifications in AI, VLSI, Embedded & Robotics.',
  },
]

function indexFromProgress(progress) {
  if (progress < 0.08) return -1
  if (progress < 0.28) return 0
  if (progress < 0.48) return 1
  if (progress < 0.68) return 2
  if (progress < 0.86) return 3
  return 4
}

export function Pipeline() {
  const sectionRef = useRef(null)
  const drawRef = useRef(null)
  const particleRef = useRef(null)
  const progressIndex = useRef(-1)
  const [active, setActive] = useState(-1)
  const [hover, setHover] = useState(null)

  const focus = hover ?? active

  useLayoutEffect(() => {
    const section = sectionRef.current
    const draw = drawRef.current
    if (!section || !draw) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = (progress) => {
      const next = indexFromProgress(progress)
      gsap.set(draw.parentElement, { '--pipeline-progress': progress })
      if (next !== progressIndex.current) {
        progressIndex.current = next
        setActive(next)
      }
    }

    if (reduced) {
      apply(1)
      return undefined
    }

    const ctx = gsap.context(() => {
      apply(0)
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 62%',
        scrub: 0.7,
        onUpdate: (self) => apply(self.progress),
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="ed-page-section ed-section ed-pipeline-section"
      aria-labelledby="pipeline-heading"
    >
      <div className="ed-pipeline-section__backdrop" aria-hidden="true">
        <div className="ed-pipeline-section__grid" />
      </div>

      <div className="ed-container">
        <header className="ed-pipeline__header">
          <SectionLabel variant="onDark">Pipeline</SectionLabel>
          <SectionHeading
            id="pipeline-heading"
            size="lg"
            onDark
            accent="Career"
            className="ed-pipeline__title"
          >
            School to
          </SectionHeading>
          <p className="ed-pipeline__lede">
            Edlumina is not a catalogue of disconnected courses. It is one
            continuous skills pipeline — from the first circuit board to the
            first job offer.
          </p>
        </header>

        <div className="ed-pipeline">
          <div className="ed-pipeline__board">
            <div className="ed-pipeline__spine" aria-hidden="true">
              <span className="ed-pipeline__spine-base" />
              <span className="ed-pipeline__spine-draw" ref={drawRef} />
              <span className="ed-pipeline__particle" ref={particleRef} />
            </div>

            <ol className="ed-pipeline__stages" aria-label="School to career stages">
              {STAGES.map((stage, index) => {
                const isFocus = focus === index
                const isReached = active >= index
                const placement = index % 2 === 0 ? 'above' : 'below'

                return (
                  <li key={stage.id} className={`ed-pipeline__stage ed-pipeline__stage--${placement}`}>
                    <button
                      type="button"
                      className={cn(
                        'ed-pipeline__stop',
                        isReached && 'ed-pipeline__stop--reached',
                        isFocus && 'ed-pipeline__stop--focus',
                      )}
                      aria-pressed={isFocus}
                      aria-describedby={`pipeline-copy-${stage.id}`}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(index)}
                      onBlur={() => setHover(null)}
                    >
                      <span className="ed-pipeline__engine" aria-hidden="true">
                        <span className="ed-pipeline__badge">{stage.number}</span>
                        <span className="ed-pipeline__riser" />
                        <span className="ed-pipeline__port">
                          <span className="ed-pipeline__port-core" />
                        </span>
                      </span>

                      <span className="ed-pipeline__copyblock">
                        <span className="ed-pipeline__kicker">{stage.kicker}</span>
                        <span className="ed-pipeline__stage-title">{stage.title}</span>
                        <span id={`pipeline-copy-${stage.id}`} className="ed-pipeline__stage-copy">
                          {stage.copy}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <button
              type="button"
              className={cn(
                'ed-pipeline__offer',
                active >= 4 && 'ed-pipeline__offer--reached',
                focus === 4 && 'ed-pipeline__offer--focus',
              )}
              aria-pressed={focus === 4}
              onMouseEnter={() => setHover(4)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(4)}
              onBlur={() => setHover(null)}
            >
              <span className="ed-pipeline__offer-mark" aria-hidden="true">
                <span className="ed-pipeline__offer-ring" />
                <span className="ed-pipeline__offer-core" />
              </span>
              <span className="ed-pipeline__offer-label">First Job Offer</span>
            </button>
          </div>
        </div>

        <blockquote className="ed-pipeline__quote">
          <p className="ed-pipeline__quote-mark" aria-hidden="true">
            “
          </p>
          <p className="ed-pipeline__quote-text">
            India&apos;s Semiconductor, Robotics and AI sectors will collectively
            create millions of engineering opportunities by 2030. These skills
            must be seeded in school, not just college — from the child who first
            holds a circuit board in Grade 3, to the engineer who designs
            India&apos;s next robot or chip.
          </p>
          <footer className="ed-pipeline__quote-footer">
            <cite className="ed-pipeline__cite">
              <strong>Vikas Rapuru</strong>
              <span>Managing Director, Robomonk Technologies</span>
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
