import '../../styles/footer.css'
import { AtSign } from 'lucide-react'
import { CONTACT } from '../../data/contact'

const FOOTER_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Now', href: '#why-now' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL = {
  handle: '@EdluminaCentre',
  href: 'https://www.instagram.com/EdluminaCentre/',
}

export function Footer() {
  return (
    <footer className="ed-footer" aria-label="Site footer">
      <div className="ed-footer__inner">
        <div className="ed-footer__brand">
          <a className="ed-footer__logo-link" href="#hero" aria-label="Edlumina Excellence Centre — back to top">
            <img
              src="/assets/edlumina-lockup.png"
              alt="Edlumina Excellence Centre"
              className="ed-footer__logo"
              width={280}
              height={72}
              decoding="async"
              loading="lazy"
              fetchPriority="low"
            />
          </a>
          <p className="ed-footer__motto">Code · Create · Conquer</p>
          <p className="ed-footer__tagline">Hyderabad&apos;s School of Future Skills</p>
        </div>

        <nav className="ed-footer__col" aria-label="Footer">
          <p className="ed-footer__kicker">Navigate</p>
          <ul className="ed-footer__links">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ed-footer__col">
          <p className="ed-footer__kicker">Contact</p>
          <ul className="ed-footer__links">
            {CONTACT.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`}>{phone.display}</a>
              </li>
            ))}
            {CONTACT.emails.map((address) => (
              <li key={address}>
                <a href={`mailto:${address}`}>{address}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ed-footer__col">
          <p className="ed-footer__kicker">Social</p>
          <a
            className="ed-footer__social"
            href={SOCIAL.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edlumina Excellence Centre on Instagram"
          >
            <AtSign size={14} aria-hidden="true" />
            {SOCIAL.handle}
          </a>

          <p className="ed-footer__kicker ed-footer__kicker--later">Technology Partner</p>
          <p className="ed-footer__partner">Robomonk Technologies</p>
        </div>
      </div>

      <p className="ed-footer__closer" aria-hidden="true">
        Build what&apos;s <em>next</em>.
      </p>

      <div className="ed-footer__legal">
        <p>© 2026 Edlumina Excellence Centre. All rights reserved.</p>
        <p className="ed-footer__place">Kukatpally · Hyderabad</p>
      </div>
    </footer>
  )
}
