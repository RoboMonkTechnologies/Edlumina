import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/why-now.css'
import { SectionHeading, SectionLabel } from '../ui'

gsap.registerPlugin(ScrollTrigger)

const ANNOTATIONS = [
  { id: 'nep', label: 'NEP', note: 'Policy frame', className: 'ed-whynow__note--nep' },
  { id: 'skills', label: 'SKILL ED', note: 'Hands-on pathways', className: 'ed-whynow__note--skills' },
  { id: 'now', label: 'WHY NOW', note: 'Tools, not theory', className: 'ed-whynow__note--now' },
  { id: 'future', label: 'WHY FUTURE SKILLS', note: 'Curiosity → career', className: 'ed-whynow__note--future' },
]

const PILLARS = [
  {
    number: '01',
    kicker: 'Why Edlumina',
    title: 'Industry-built curriculum',
    copy: 'Developed in collaboration with Robomonk Technologies, Edlumina’s technology partner — bringing real engineering practice into the classroom.',
  },
  {
    number: '02',
    kicker: 'Why now',
    title: 'Certified trainers, real kits',
    copy: 'Every session is hands-on.',
  },
  {
    number: '03',
    kicker: 'Why future skills',
    title: 'Grade 3 to first job offer',
    copy: 'One continuous pipeline instead of disconnected courses.',
  },
]

export function WhyNow() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.ed-whynow__emblem', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%' },
      })

      gsap.from('.ed-whynow__note', {
        opacity: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 74%' },
      })

      gsap.from('.ed-whynow__copy > *', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ed-whynow__copy', start: 'top 80%' },
      })

      gsap.from('.ed-whynow__pillar', {
        opacity: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ed-whynow__pillars', start: 'top 84%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="why-now"
      ref={sectionRef}
      className="ed-page-section ed-section ed-whynow"
      aria-labelledby="whynow-heading"
    >
      <div className="ed-whynow__backdrop" aria-hidden="true">
        <div className="ed-whynow__grid" />
      </div>

      <div className="ed-container">
        <div className="ed-whynow__layout">
          <div className="ed-whynow__anchor" aria-hidden="true">
            <div className="ed-whynow__emblem">
              <span className="ed-whynow__emblem-corner ed-whynow__emblem-corner--tl" />
              <span className="ed-whynow__emblem-corner ed-whynow__emblem-corner--tr" />
              <span className="ed-whynow__emblem-corner ed-whynow__emblem-corner--bl" />
              <span className="ed-whynow__emblem-corner ed-whynow__emblem-corner--br" />
              <span className="ed-whynow__emblem-kicker">NEP</span>
              <span className="ed-whynow__year">2020</span>
              <span className="ed-whynow__year-rule" />
            </div>
            {ANNOTATIONS.map((note) => (
              <span key={note.id} className={`ed-whynow__note ${note.className}`}>
                <span className="ed-whynow__note-dot" />
                <span className="ed-whynow__note-label">{note.label}</span>
                <span className="ed-whynow__note-copy">{note.note}</span>
              </span>
            ))}
          </div>

          <div className="ed-whynow__copy">
            <SectionLabel variant="onDark">Why Now</SectionLabel>

            <SectionHeading
              id="whynow-heading"
              size="md"
              onDark
              className="ed-whynow__title"
            >
              NEP 2020 put future skills on India&apos;s education agenda.
              <span className="ed-heading__accent"> We make hands-on learning possible.</span>
            </SectionHeading>

            <blockquote className="ed-whynow__quote">
              <p>
                India&apos;s National Education Policy 2020 has given schools a
                mandate that most institutions do not yet have the tools to
                fulfil. We believe every child deserves access to hands-on
                technology education that connects their curiosity today to
                their career tomorrow.
              </p>
              <footer>
                <cite>
                  <strong>Gudipati Naga Sirisha</strong>
                  <span>Founder &amp; MD, Edlumina</span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <ol className="ed-whynow__pillars" aria-label="Why Edlumina">
          {PILLARS.map((pillar) => (
            <li key={pillar.number} className="ed-whynow__pillar">
              <p className="ed-whynow__pillar-index">
                <span>{pillar.number}</span>
                <span>{pillar.kicker}</span>
              </p>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
