import '../../styles/contact.css'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SectionHeading, SectionLabel } from '../ui'
import { CONTACT, DEFAULT_MAP_EMBED } from '../../data/contact'
import { CampusMap } from './CampusMap'
import { EnquiryForm } from './EnquiryForm'

const mapSrc = import.meta.env.VITE_MAP_EMBED_URL || DEFAULT_MAP_EMBED

export function Contact() {
  return (
    <section
      id="contact"
      className="ed-page-section ed-section ed-contact"
      aria-labelledby="contact-heading"
    >
      <div className="ed-container">
        <header className="ed-contact__header">
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading id="contact-heading" size="lg" accent="Demo">
            Book a free
          </SectionHeading>
          <p className="ed-contact__lede">
            Walk into the lab, or send an enquiry. We will place you in the
            right Saturday webinar, Sunday workshop, or certification track.
          </p>
        </header>

        <div className="ed-contact__layout">
          <div className="ed-contact__info">
            <div className="ed-contact__block">
              <p className="ed-contact__kicker">
                <MapPin size={14} aria-hidden="true" />
                Campus
              </p>
              <p className="ed-contact__centre">{CONTACT.centre}</p>
              <p className="ed-contact__campus">@ {CONTACT.campus}</p>
              <address className="ed-contact__address">
                {CONTACT.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="ed-contact__block">
              <p className="ed-contact__kicker">
                <Phone size={14} aria-hidden="true" />
                Call
              </p>
              <ul className="ed-contact__list">
                {CONTACT.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                    <a
                      className="ed-contact__wa"
                      href={`https://wa.me/${phone.wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${phone.display}`}
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      WhatsApp
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ed-contact__row">
              <div className="ed-contact__block">
                <p className="ed-contact__kicker">
                  <Mail size={14} aria-hidden="true" />
                  Email
                </p>
                {CONTACT.emails.map((address) => (
                  <a key={address} className="ed-contact__email" href={`mailto:${address}`}>
                    {address}
                  </a>
                ))}
              </div>
              <div className="ed-contact__block">
                <p className="ed-contact__kicker">Hours</p>
                <ul className="ed-contact__hours">
                  {CONTACT.hours.map((slot) => (
                    <li key={slot.days}>
                      <span>{slot.days}</span>
                      <span>{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <CampusMap
              src={mapSrc}
              title="Fortune School of Business, Vivek Nagar, Kukatpally, Hyderabad"
            />
          </div>

          <div className="ed-contact__form-wrap">
            <p className="ed-contact__form-kicker">Enquiry dossier</p>
            <h3 className="ed-contact__form-title">Tell us who you are</h3>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
