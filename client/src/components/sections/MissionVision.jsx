import { motion, useReducedMotion } from 'framer-motion'
import '../../styles/manifesto.css'

const CHARTER = [
  {
    id: 'mission',
    label: 'Mission',
    statement:
      'To make every child in India curious, capable, and confident about technology — by delivering hands-on Robotics, AI, and STEM education that connects their classroom to their career.',
  },
  {
    id: 'vision',
    label: 'Vision',
    statement:
      "To be India's most trusted school-to-career skills pipeline — where every student leaves with the skills, mindset, and confidence to shape India's technology future.",
  },
  {
    id: 'approach',
    label: 'Approach',
    statement:
      'Real learning happens when students make something, not when they watch someone else do it.',
  },
]

const VALUES = [
  {
    number: '01',
    title: 'Build over browse',
    copy: 'Real learning happens when students make something.',
  },
  {
    number: '02',
    title: 'Curiosity first',
    copy: 'Every question is welcome. Every mistake is a lesson.',
  },
  {
    number: '03',
    title: 'Inclusion always',
    copy: 'Future skills belong to every child, not just “tech kids”.',
  },
  {
    number: '04',
    title: 'Outcomes over activity',
    copy: 'We measure success by what students can build.',
  },
  {
    number: '05',
    title: 'Grow every day',
    copy: "Our students must grow ahead of India's industry.",
  },
  {
    number: '06',
    title: 'School to career',
    copy: 'Bridging what schools teach and what industry needs.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

export function MissionVision() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? undefined
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.28 } }

  return (
    <section
      id="manifesto"
      className="ed-page-section ed-section ed-manifesto"
      aria-labelledby="manifesto-heading"
    >
      <div className="ed-manifesto__shell">
        <motion.header
          className="ed-manifesto__header"
          {...reveal}
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <h2 id="manifesto-heading" className="ed-manifesto__title">
            Mission, Vision &amp; Values
          </h2>
        </motion.header>

        <motion.div
          className="ed-manifesto__charter"
          {...reveal}
          variants={stagger}
        >
          {CHARTER.map((item) => (
            <motion.article
              key={item.id}
              className="ed-manifesto__block"
              variants={fadeUp}
            >
              <p className="ed-manifesto__kicker">{item.label}</p>
              <p className="ed-manifesto__statement">{item.statement}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.ol
          className="ed-manifesto__principles"
          aria-label="Core values"
          {...reveal}
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {VALUES.map((value) => (
            <motion.li
              key={value.number}
              className="ed-principle"
              variants={fadeUp}
            >
              <span className="ed-principle__number">{value.number}</span>
              <h3 className="ed-principle__title">{value.title}</h3>
              <p className="ed-principle__copy">{value.copy}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
