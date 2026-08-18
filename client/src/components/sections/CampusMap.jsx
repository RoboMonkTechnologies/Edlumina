import { useState } from 'react'
import { MAP_PAGE_URL } from '../../data/contact'

export function CampusMap({ src, title }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="ed-contact__map">
      {loaded ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          width={600}
          height={256}
        />
      ) : (
        <div className="ed-map-facade">
          <p className="ed-map-facade__kicker">Campus map</p>
          <p className="ed-map-facade__copy">
            Fortune School of Business, Vivek Nagar, Kukatpally.
          </p>
          <div className="ed-map-facade__actions">
            <button type="button" className="ed-map-facade__load" onClick={() => setLoaded(true)}>
              Load Google Map
            </button>
            <a
              className="ed-map-facade__open"
              href={MAP_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
