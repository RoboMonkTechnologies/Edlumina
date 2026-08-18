import '../../styles/testimonials.css'
import { SectionHeading, SectionLabel } from '../ui'

const TESTIMONIALS = [
  {
    id: 'sirisha',
    index: 'Q_01',
    quote:
      'Our collaboration with Robomonk Technologies, our technology partner, gives us the curriculum, the kits, and the certified trainers to make hands-on tech education happen at scale.',
    name: 'Gudipati Naga Sirisha',
    role: 'Founder & MD, Edlumina',
    featured: true,
  },
  {
    id: 'vikas',
    index: 'Q_02',
    quote:
      "Edlumina Excellence Centre is where the pipeline becomes real in Hyderabad — from the child who first holds a circuit board, to the engineer who designs India's next chip.",
    name: 'Vikas Rapuru',
    role: 'Managing Director, Robomonk Technologies',
  },
  {
    id: 'srinivas',
    index: 'Q_03',
    quote:
      'This collaboration brings exactly the skills our students and their children need — Robotics, AI, Coding and STEM in a real, hands-on environment.',
    name: 'G. Srinivas',
    role: 'Chairman, Fortune School of Business',
  },
]

function QuotePanel({ item, featured = false }) {
  return (
    <blockquote className={featured ? 'ed-quote ed-quote--featured' : 'ed-quote'}>
      <p className="ed-quote__mark" aria-hidden="true">
        “
      </p>
      <p className="ed-quote__index">{item.index}</p>
      <p className="ed-quote__text">{item.quote}</p>
      <footer className="ed-quote__footer">
        <cite>
          <strong>{item.name}</strong>
          <span>{item.role}</span>
        </cite>
      </footer>
    </blockquote>
  )
}

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS

  return (
    <section
      id="testimonials"
      className="ed-page-section ed-section ed-testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="ed-container">
        <header className="ed-testimonials__header">
          <SectionLabel>Voices</SectionLabel>
          <SectionHeading id="testimonials-heading" size="lg">
            From the people building this with us.
          </SectionHeading>
        </header>

        <div className="ed-testimonials__layout">
          <QuotePanel item={featured} featured />
          <div className="ed-testimonials__pair">
            {rest.map((item) => (
              <QuotePanel key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
