import '../../styles/events.css'
import { PrimaryButton, SectionHeading, SectionLabel } from '../ui'
import { FREE_EVENTS, getEventCta } from '../../data/events'
import { handleEnquiryClick } from '../../lib/enquiry'
import { cn } from '../../lib/cn'

function EventInvite({ event }) {
  const cta = getEventCta(event.urlKey)
  const isCampus = event.urlKey === 'workshop'

  return (
    <article
      className={cn(
        'ed-invite',
        isCampus ? 'ed-invite--campus' : 'ed-invite--online',
      )}
    >
      <div className="ed-invite__calendar" aria-hidden="true">
        <span className="ed-invite__day">{event.day}</span>
        <span className="ed-invite__clock">{event.timeMeta}</span>
      </div>

      <div className="ed-invite__body">
        <header className="ed-invite__meta">
          <span>{event.code}</span>
          <span>{event.channel}</span>
        </header>

        <h3 className="ed-invite__title">{event.title}</h3>

        <p className="ed-invite__when">
          {event.cadence}
          <span aria-hidden="true"> · </span>
          {event.time}
          <span aria-hidden="true"> · </span>
          {event.place}
        </p>

        <p className="ed-invite__copy">{event.copy}</p>

        {event.badge && <p className="ed-invite__badge">{event.badge}</p>}

        <div className="ed-invite__action">
          {cta.external ? (
            <PrimaryButton
              href={cta.href}
              size="lg"
              className="ed-invite__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.cta}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              href="#contact"
              size="lg"
              className="ed-invite__cta"
              onClick={(event) => handleEnquiryClick(event, cta.interest)}
            >
              {event.enquireCta}
            </PrimaryButton>
          )}
        </div>
      </div>
    </article>
  )
}

export function Events() {
  return (
    <section
      id="events"
      className="ed-page-section ed-section ed-events"
      aria-labelledby="events-heading"
    >
      <div className="ed-container">
        <header className="ed-events__header">
          <SectionLabel>Free Events</SectionLabel>
          <SectionHeading
            id="events-heading"
            size="lg"
            accent="This Weekend"
            className="ed-events__title"
          >
            Come in.
          </SectionHeading>
          <p className="ed-events__lede">
            Two open doors into the Edlumina ecosystem — a Saturday briefing for
            parents, and a Sunday workshop on the lab floor. Both are free.
          </p>
        </header>

        <div className="ed-events__grid">
          {FREE_EVENTS.map((event) => (
            <EventInvite key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
