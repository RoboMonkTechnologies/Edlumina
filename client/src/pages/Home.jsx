import { Contact } from '../components/sections/Contact'
import { DeferredSection } from '../components/layout/DeferredSection'
import { PageLayout } from '../components/layout/PageLayout'
import { About } from '../components/sections/About'
import { Hero } from '../components/sections/Hero'
import { Pipeline } from '../components/sections/Pipeline'
import { Programs } from '../components/sections/Programs'

const loadWhyNow = () =>
  import('../components/sections/WhyNow').then((module) => ({ default: module.WhyNow }))
const loadEvents = () =>
  import('../components/sections/Events').then((module) => ({ default: module.Events }))
const loadMissionVision = () =>
  import('../components/sections/MissionVision').then((module) => ({
    default: module.MissionVision,
  }))
const loadTestimonials = () =>
  import('../components/sections/Testimonials').then((module) => ({
    default: module.Testimonials,
  }))
const loadGallery = () =>
  import('../components/sections/Gallery').then((module) => ({ default: module.Gallery }))

export function Home() {
  return (
    <PageLayout>
      <Hero />
      <Pipeline />
      <About />
      <Programs />
      <DeferredSection id="why-now" loader={loadWhyNow} minHeight="42rem" label="Why now" />
      <DeferredSection id="events" loader={loadEvents} minHeight="40rem" label="Events" />
      <DeferredSection
        id="manifesto"
        loader={loadMissionVision}
        minHeight="44rem"
        label="Mission and values"
        dark
      />
      <DeferredSection
        id="testimonials"
        loader={loadTestimonials}
        minHeight="36rem"
        label="From the people building this with us."
      />
      <DeferredSection
        id="gallery"
        loader={loadGallery}
        minHeight="48rem"
        label="Gallery"
        dark
      />
      <Contact />
    </PageLayout>
  )
}
