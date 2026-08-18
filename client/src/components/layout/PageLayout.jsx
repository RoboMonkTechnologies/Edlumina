import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Seo } from '../seo/Seo'

export function PageLayout({ children }) {
  return (
    <div className="ed-page">
      <Seo />
      <a className="ed-skip" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main className="ed-page__main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
