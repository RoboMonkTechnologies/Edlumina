import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/programs.css'
import { PROGRAM_AUDIENCES } from '../../data/programs'
import { SectionHeading, SectionLabel } from '../ui'
import { ProgramDossier } from '../ui/ProgramDossier'
import { cn } from '../../lib/cn'

function ProgramsBackdrop() {
  return (
    <svg
      className="ed-programs__pattern"
      viewBox="0 0 1200 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M40 80 H220 V180 H360" />
      <path d="M840 90 H1020 V210 H1160" />
      <path d="M80 420 H200 V560 H340 V680" />
      <path d="M720 480 H880 V620 H1100" />
      <path d="M480 40 V140 H620 V240" />
      <circle cx="220" cy="80" r="3" />
      <circle cx="360" cy="180" r="3" />
      <circle cx="1020" cy="90" r="3" />
      <circle cx="1160" cy="210" r="3" />
      <circle cx="200" cy="420" r="3" />
      <circle cx="880" cy="480" r="3" />
      <circle cx="620" cy="140" r="3" />
      <text x="48" y="64">AI</text>
      <text x="1088" y="76">VLSI</text>
      <text x="86" y="404">EMBEDDED</text>
      <text x="726" y="466">ROBOTICS</text>
    </svg>
  )
}

export function Programs() {
  const baseId = useId()
  const stageRef = useRef(null)
  const outgoingRef = useRef(null)
  const [activeId, setActiveId] = useState(PROGRAM_AUDIENCES[0].id)

  const animateIn = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = stage.querySelectorAll('.ed-programs__summary, .ed-dossier')
    if (!items.length) return

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' })
      return
    }

    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.07,
        ease: 'power3.out',
        overwrite: true,
      },
    )
  }, [])

  const activate = useCallback((id) => {
    if (id === activeId) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stage = stageRef.current
    const items = stage?.querySelectorAll('.ed-programs__summary, .ed-dossier')

    outgoingRef.current?.kill()

    if (reduced || !items?.length) {
      setActiveId(id)
      return
    }

    outgoingRef.current = gsap.to(items, {
      opacity: 0,
      y: -14,
      duration: 0.22,
      stagger: 0.035,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => setActiveId(id),
    })
  }, [activeId])

  useLayoutEffect(() => {
    animateIn()
  }, [activeId, animateIn])

  const onTabKeyDown = (event) => {
    const ids = PROGRAM_AUDIENCES.map((item) => item.id)
    const current = ids.indexOf(activeId)
    let next = current

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = (current + 1) % ids.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (current - 1 + ids.length) % ids.length
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = ids.length - 1
    } else {
      return
    }

    event.preventDefault()
    activate(ids[next])
    const tab = document.getElementById(`${baseId}-tab-${ids[next]}`)
    tab?.focus()
  }

  return (
    <section
      id="programs"
      className="ed-page-section ed-section ed-programs"
      aria-labelledby="programs-heading"
    >
      <ProgramsBackdrop />

      <div className="ed-container">
        <header className="ed-programs__header">
          <div className="ed-programs__header-meta">
            <SectionLabel>Programs</SectionLabel>
            <p className="ed-programs__count">10+ Future-Skill Tracks</p>
          </div>
          <SectionHeading
            id="programs-heading"
            size="lg"
            accent="Services"
            className="ed-programs__title"
          >
            Programs &amp;
          </SectionHeading>
          <p className="ed-programs__lede">
            One centre. Four audiences. Every track is a dossier — duration,
            format and fee — not a shopping grid.
          </p>
        </header>

        <div
          className="ed-programs__tabs"
          role="tablist"
          aria-label="Program audiences"
          onKeyDown={onTabKeyDown}
        >
          {PROGRAM_AUDIENCES.map((audience) => {
            const selected = audience.id === activeId
            return (
              <button
                key={audience.id}
                id={`${baseId}-tab-${audience.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${audience.id}`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  'ed-programs__tab',
                  selected && 'ed-programs__tab--active',
                )}
                onClick={() => activate(audience.id)}
              >
                <span className="ed-programs__tab-label">{audience.label}</span>
                <span className="ed-programs__tab-kicker">{audience.kicker}</span>
              </button>
            )
          })}
        </div>

        <div className="ed-programs__stage" ref={stageRef}>
          {PROGRAM_AUDIENCES.map((audience) => {
            const selected = audience.id === activeId
            return (
              <div
                key={audience.id}
                id={`${baseId}-panel-${audience.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${audience.id}`}
                hidden={!selected}
                className="ed-programs__panel"
              >
                {selected && (
                  <>
                    <p className="ed-programs__summary">{audience.summary}</p>
                    <div
                      className={cn(
                        'ed-programs__grid',
                        audience.programs.length === 1 && 'ed-programs__grid--single',
                      )}
                    >
                      {audience.programs.map((program, index) => (
                        <ProgramDossier
                          key={program.id}
                          index={index + 1}
                          {...program}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <p className="ed-programs__partner">
          Curriculum, kits and certified trainers are delivered in technology
          collaboration with Robomonk Technologies — Edlumina&apos;s technology
          partner.
        </p>
      </div>
    </section>
  )
}
