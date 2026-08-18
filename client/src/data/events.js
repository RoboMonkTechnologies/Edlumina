/**
 * Free-event registration destinations.
 * Set VITE_WEBINAR_URL / VITE_WORKSHOP_URL when live booking links exist.
 * Until then, CTAs open the Contact enquiry with the matching interest.
 */
export const WEBINAR_URL = String(import.meta.env.VITE_WEBINAR_URL ?? '').trim()
export const WORKSHOP_URL = String(import.meta.env.VITE_WORKSHOP_URL ?? '').trim()

export function isRegistrationOpen(url) {
  return typeof url === 'string' && url.trim().length > 0
}

export function getEventCta(urlKey) {
  const url = urlKey === 'workshop' ? WORKSHOP_URL : WEBINAR_URL
  if (isRegistrationOpen(url)) {
    return {
      href: url.trim(),
      external: true,
      interest: '',
    }
  }

  return {
    href: '#contact',
    external: false,
    interest: urlKey === 'workshop' ? 'Free Sunday Workshop' : 'Free Saturday Webinar',
  }
}

export const FREE_EVENTS = [
  {
    id: 'saturday-webinar',
    code: 'EVT_01',
    channel: 'Online',
    title: 'Free Parent Awareness Webinar',
    cadence: 'Every Saturday',
    time: '11 AM',
    timeMeta: '11:00',
    day: 'SAT',
    place: 'Online',
    copy: 'NEP 2020, the skills gap, and real career outcomes.',
    badge: 'No selling.',
    cta: 'Join Saturday Webinar',
    enquireCta: 'Enquire for Saturday webinar',
    urlKey: 'webinar',
  },
  {
    id: 'sunday-workshop',
    code: 'EVT_02',
    channel: 'Campus',
    title: 'Free Sunday Workshop',
    cadence: 'Every Sunday',
    time: '10 AM & 3 PM',
    timeMeta: '10:00 · 15:00',
    day: 'SUN',
    place: 'At the Centre',
    copy: 'See the lab, touch the kits, meet a trainer.',
    badge: null,
    cta: 'Book Sunday Workshop',
    enquireCta: 'Enquire for Sunday workshop',
    urlKey: 'workshop',
  },
]
