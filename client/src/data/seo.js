import { CONTACT } from './contact'
import { PROGRAM_AUDIENCES } from './programs'

export const SITE_TITLE =
  'Edlumina Excellence Centre — Robotics, AI & Future Skills | Kukatpally, Hyderabad'

export const SITE_DESCRIPTION =
  'Hands-on Robotics, AI, Embedded Systems, Coding and STEM at Edlumina Excellence Centre in Kukatpally, Hyderabad — for school students, college learners, and professionals. Book a free demo.'

export const SITE_NAME = 'Edlumina Excellence Centre'

export const SITE_URL = String(
  import.meta.env.VITE_SITE_URL || 'https://edluminaexcellencecenter.com',
).replace(/\/$/, '')

export const SITE_LOCALE = 'en_IN'
export const THEME_COLOR = '#071C3F'
export const OG_IMAGE_PATH = '/assets/edlumina-logo.png'
export const INSTAGRAM_URL = 'https://www.instagram.com/EdluminaCentre/'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${suffix}`
}

function parseInrFee(fee) {
  if (!fee || /priced per term/i.test(fee)) return null

  const lakh = fee.match(/₹\s*([\d.]+)\s*L\s*[–-]\s*₹?\s*([\d.]+)\s*L/i)
  if (lakh) {
    return {
      minPrice: String(Math.round(Number(lakh[1]) * 100000)),
      maxPrice: String(Math.round(Number(lakh[2]) * 100000)),
    }
  }

  const range = fee.match(/₹\s*([\d,]+)\s*[–-]\s*₹\s*([\d,]+)/)
  if (range) {
    return {
      minPrice: range[1].replace(/,/g, ''),
      maxPrice: range[2].replace(/,/g, ''),
    }
  }

  const single = fee.match(/₹\s*([\d,]+)\s*$/)
  if (single) {
    return { price: single[1].replace(/,/g, '') }
  }

  return null
}

function offerFromFee(fee) {
  const parsed = parseInrFee(fee)
  if (!parsed) return undefined

  if (parsed.price) {
    return {
      '@type': 'Offer',
      price: parsed.price,
      priceCurrency: 'INR',
    }
  }

  return {
    '@type': 'Offer',
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: parsed.minPrice,
      maxPrice: parsed.maxPrice,
      priceCurrency: 'INR',
    },
  }
}

const ORG_ID = `${SITE_URL}/#organisation`

function courseNodes() {
  const courses = []

  for (const audience of PROGRAM_AUDIENCES) {
    for (const program of audience.programs) {
      if (program.id === 'lab-setup') continue

      const node = {
        '@type': 'Course',
        '@id': `${SITE_URL}/#course-${program.id}`,
        name: program.name,
        description: `${program.name} at ${SITE_NAME}, Kukatpally, Hyderabad. ${audience.summary} ${program.format}. Duration: ${program.duration}.`,
        provider: { '@id': ORG_ID },
        url: `${SITE_URL}/#programs`,
        inLanguage: 'en',
        educationalLevel: audience.label,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: /hybrid/i.test(program.format) ? 'Blended' : 'Onsite',
          location: { '@id': ORG_ID },
        },
      }

      const offers = offerFromFee(program.fee)
      if (offers) node.offers = offers

      courses.push(node)
    }
  }

  return courses
}

function labService() {
  const program = PROGRAM_AUDIENCES.flatMap((item) => item.programs).find(
    (item) => item.id === 'lab-setup',
  )
  if (!program) return null

  const node = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-lab-setup`,
    name: program.name,
    serviceType: 'Robotics, AI and Embedded Systems laboratory setup',
    description: `Turnkey lab infrastructure for Robotics, AI and Embedded Systems, with ongoing AMC, delivered by ${SITE_NAME}.`,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    url: `${SITE_URL}/#programs`,
  }

  const offers = offerFromFee(program.fee)
  if (offers) node.offers = offers
  return node
}

export function buildJsonLd() {
  const courses = courseNodes()
  const service = labService()

  const organisation = {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: 'Edlumina',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl(OG_IMAGE_PATH),
    image: absoluteUrl(OG_IMAGE_PATH),
    email: CONTACT.emails,
    telephone: CONTACT.phones.map((phone) => phone.tel),
    sameAs: [INSTAGRAM_URL],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Fortune School of Business, Metro Pillar No. 830, Kothari Solitaire, NH65, Vivek Nagar',
      addressLocality: 'Kukatpally',
      addressRegion: 'Telangana',
      postalCode: '500072',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '16:30',
        closes: '19:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    hasCourse: courses.map((course) => ({ '@id': course['@id'] })),
    knowsAbout: [
      'Robotics education',
      'STEM education',
      'Artificial intelligence',
      'Embedded systems',
      'VLSI training',
      'Machine learning',
    ],
  }

  if (service) {
    organisation.makesOffer = { '@id': service['@id'] }
  }

  const graph = [
    organisation,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
      inLanguage: 'en-IN',
    },
    ...courses,
  ]

  if (service) graph.push(service)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
