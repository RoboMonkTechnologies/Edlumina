import '../../styles/about.css'
import { Grid, GridItem } from '../layout/Grid'
import { SectionHeading, SectionLabel, Stat } from '../ui'

const STATS = [
  { value: '03–12', label: 'Grades Covered' },
  { value: '10', label: 'Program Tracks' },
  { value: '4', label: 'Audiences' },
]

export function About() {
  return (
    <section
      id="about"
      className="ed-page-section ed-section ed-about"
      aria-labelledby="about-heading"
    >
      <div className="ed-container">
        <Grid className="ed-about__layout">
          <GridItem lg={7} className="ed-about__story">
            <SectionLabel>About</SectionLabel>

            <SectionHeading
              id="about-heading"
              size="lg"
              accent="Future Skills"
              className="ed-about__title"
            >
              Hyderabad&apos;s School of
            </SectionHeading>

            <p className="ed-about__lead">
              Edlumina Excellence Centre is Hyderabad&apos;s School of Future
              Skills, operating from Fortune School of Business in Kukatpally.
              We deliver hands-on Robotics, Artificial Intelligence, Embedded
              Systems, Coding and STEM education for school students (Grade
              3–12), college students, and job-seeking professionals.
            </p>

            <blockquote className="ed-about__pullquote">
              <p className="ed-about__pullquote-kicker">Principle 01</p>
              <p>
                Real learning happens when students make something, not when they
                watch someone else do it.
              </p>
            </blockquote>

            <p className="ed-about__body">
              Our curriculum, kits and certified trainers are developed in
              collaboration with{' '}
              <span className="ed-about__partner">Robomonk Technologies</span>,
              Edlumina&apos;s technology partner — bringing industry-grade tools
              into a classroom setting.
            </p>
          </GridItem>

          <GridItem lg={5} className="ed-about__media">
            <figure className="ed-about__frame">
              <span className="ed-about__frame-corner ed-about__frame-corner--tl" />
              <span className="ed-about__frame-corner ed-about__frame-corner--tr" />
              <span className="ed-about__frame-corner ed-about__frame-corner--bl" />
              <span className="ed-about__frame-corner ed-about__frame-corner--br" />

              <img
                className="ed-about__photo"
                src="/assets/about-launch.png"
                alt="Edlumina Excellence Centre launch at Fortune School of Business, Kukatpally, with partners from Robomonk Technologies and FSB."
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
              />

              <div className="ed-about__frame-meta">
                <span>FRM_01</span>
                <span>KUKATPALLY</span>
              </div>

              <figcaption className="ed-about__frame-caption">
                Campus · Fortune School of Business · Vivek Nagar
              </figcaption>
            </figure>
          </GridItem>
        </Grid>

        <div className="ed-about__stats" role="list" aria-label="Centre at a glance">
          {STATS.map((stat) => (
            <div key={stat.label} className="ed-about__stat" role="listitem">
              <Stat value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>

        <p className="ed-about__tagline">
          We don&apos;t teach about the future.
          <span> We build it — one student at a time.</span>
        </p>
      </div>
    </section>
  )
}
