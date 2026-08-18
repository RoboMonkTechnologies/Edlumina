import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import '../../styles/hero.css'
import { ChevronRight } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../ui'
import { getEventCta } from '../../data/events'
import { handleEnquiryClick } from '../../lib/enquiry'

const QUICK_FACTS = [
  { id: 'k12', label: 'GRADE 3–12' },
  { id: 'college', label: 'COLLEGE' },
  { id: 'pro', label: 'PROFESSIONALS' },
]

function HeroCircuit() {
  return (
    <svg
      className="ed-hero__circuit"
      viewBox="0 0 520 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="ed-hero__circuit-line ed-hero__circuit-line--mute"
        d="M80 40 V180 H220 V300 H360 V420"
      />
      <path
        className="ed-hero__circuit-line"
        d="M180 90 H420 V210 H500"
      />
      <path
        className="ed-hero__circuit-line ed-hero__circuit-line--mute"
        d="M40 250 H160 V390 H280 V520 H440"
      />
      <path
        className="ed-hero__circuit-line"
        d="M260 160 V280 H400 V410 H480 V560"
      />
      <path
        className="ed-hero__circuit-line ed-hero__circuit-line--mute"
        d="M120 470 H300 V610 H500"
      />
      <path
        className="ed-hero__circuit-line"
        d="M60 340 V500 H200 V640"
      />
      <path
        className="ed-hero__circuit-line ed-hero__circuit-line--mute"
        d="M340 40 V120 H500"
      />
      <path
        className="ed-hero__circuit-line"
        d="M430 300 V380 H510"
      />

      {[
        [80, 40],
        [220, 180],
        [360, 300],
        [420, 90],
        [500, 210],
        [160, 250],
        [280, 390],
        [440, 520],
        [400, 280],
        [480, 410],
        [300, 470],
        [500, 610],
        [200, 500],
        [340, 120],
        [430, 300],
        [510, 380],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}-${index}`}
          className={
            index % 3 === 0
              ? 'ed-hero__circuit-node ed-hero__circuit-node--gold'
              : 'ed-hero__circuit-node'
          }
          cx={cx}
          cy={cy}
          r="3"
        />
      ))}
    </svg>
  )
}

export function Hero() {
  const rootRef = useRef(null)
  const webinar = getEventCta('webinar')

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = root.querySelectorAll('.ed-hero__headline-text')
    const rest = root.querySelectorAll(
      '.ed-hero__subheadline, .ed-hero__ctas, .ed-hero__facts, .ed-hero__meta',
    )

    if (reduced) {
      gsap.set([lines, rest], { opacity: 1, y: 0, yPercent: 0, clearProps: 'all' })
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 112, opacity: 0 })
      gsap.set(rest, { y: 18, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.16,
      }, 0)

      tl.to(root.querySelector('.ed-hero__subheadline'), {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }, 0.5)

      tl.to(root.querySelector('.ed-hero__ctas'), {
        y: 0,
        opacity: 1,
        duration: 0.58,
      }, 0.7)

      tl.to(root.querySelector('.ed-hero__facts'), {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, 0.86)

      tl.to(root.querySelector('.ed-hero__meta'), {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, 1.0)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="ed-hero ed-page-section"
      aria-labelledby="hero-heading"
    >
      <div className="ed-hero__backdrop" aria-hidden="true">
        <div className="ed-hero__grid" />
      </div>

      <div className="ed-hero__inner ed-container">
        <div className="ed-hero__layout">
          <div className="ed-hero__content">
            <h1 id="hero-heading" className="ed-hero__headline">
              <span className="ed-hero__headline-line">
                <span className="ed-hero__headline-text">
                  LEARN IT. BUILD IT.{' '}
                  <span className="ed-hero__headline-gold">OWN</span>
                </span>
              </span>
              <span className="ed-hero__headline-line">
                <span className="ed-hero__headline-text ed-hero__headline-gold">
                  THE FUTURE.
                </span>
              </span>
            </h1>

            <p className="ed-hero__subheadline">
              Hyderabad&apos;s School of Future Skills — hands-on Robotics, AI,
              Embedded Systems, Coding &amp; STEM programs that take students
              from their first circuit board to their first job offer.
            </p>

            <div className="ed-hero__ctas">
              <PrimaryButton
                href="#contact"
                size="lg"
                className="ed-hero__cta ed-hero__cta-primary"
                onClick={(event) => handleEnquiryClick(event, '')}
              >
                Book a Free Demo Class
                <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </PrimaryButton>
              {webinar.external ? (
                <SecondaryButton
                  href={webinar.href}
                  variant="onDark"
                  size="lg"
                  className="ed-hero__cta ed-hero__cta-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Saturday Webinar
                </SecondaryButton>
              ) : (
                <SecondaryButton
                  href="#contact"
                  variant="onDark"
                  size="lg"
                  className="ed-hero__cta ed-hero__cta-secondary"
                  onClick={(event) => handleEnquiryClick(event, webinar.interest)}
                >
                  Join the Saturday Webinar
                </SecondaryButton>
              )}
            </div>

            <ul className="ed-hero__facts" aria-label="Who we teach">
              {QUICK_FACTS.map((fact) => (
                <li key={fact.id} className="ed-hero__fact">
                  <span className="ed-hero__fact-dot" aria-hidden="true" />
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="ed-hero__aside" aria-hidden="true">
            <HeroCircuit />
          </div>
        </div>

        <div className="ed-hero__meta">
          <p className="ed-hero__location">
            <span className="ed-hero__location-kicker">Campus</span>
            <strong>Fortune School of Business</strong>
            <span>Vivek Nagar, Kukatpally</span>
          </p>
          <p className="ed-hero__tagline">Code · Create · Conquer</p>
        </div>
      </div>
    </section>
  )
}
