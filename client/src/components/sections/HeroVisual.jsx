import { BrandLogo } from '../ui/BrandLogo'

const TECH_LABELS = [
  { id: 'robotics', label: 'ROBOTICS', className: 'ed-hero-visual__label--robotics' },
  { id: 'ai', label: 'AI', className: 'ed-hero-visual__label--ai' },
  { id: 'embedded', label: 'EMBEDDED', className: 'ed-hero-visual__label--embedded' },
  { id: 'stem', label: 'STEM', className: 'ed-hero-visual__label--stem' },
  { id: 'vlsi', label: 'VLSI', className: 'ed-hero-visual__label--vlsi' },
]

export function HeroVisual({ offset = { x: 0, y: 0 } }) {
  return (
    <div className="ed-hero-visual" aria-hidden="true">
      <div
        className="ed-hero-visual__parallax"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
      <div className="ed-hero-visual__stage">
        <span className="ed-hero-visual__number ed-hero-visual__number--primary">01</span>
        <span className="ed-hero-visual__number ed-hero-visual__number--secondary">LAB</span>

        <div className="ed-hero-visual__geo ed-hero-visual__geo--rect-a" />
        <div className="ed-hero-visual__geo ed-hero-visual__geo--rect-b" />
        <div className="ed-hero-visual__geo ed-hero-visual__geo--line-diag" />

        <span className="ed-hero-visual__crosshair ed-hero-visual__crosshair--tl">+</span>
        <span className="ed-hero-visual__crosshair ed-hero-visual__crosshair--tr">+</span>
        <span className="ed-hero-visual__crosshair ed-hero-visual__crosshair--bl">+</span>
        <span className="ed-hero-visual__crosshair ed-hero-visual__crosshair--br">+</span>

        <div className="ed-hero-visual__frame">
          <span className="ed-hero-visual__frame-corner ed-hero-visual__frame-corner--tl" />
          <span className="ed-hero-visual__frame-corner ed-hero-visual__frame-corner--tr" />
          <span className="ed-hero-visual__frame-corner ed-hero-visual__frame-corner--bl" />
          <span className="ed-hero-visual__frame-corner ed-hero-visual__frame-corner--br" />
        </div>

        <span className="ed-hero-visual__axis ed-hero-visual__axis--h" />
        <span className="ed-hero-visual__axis ed-hero-visual__axis--v" />

        <svg
          className="ed-hero-visual__circuit"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="ed-hero-visual__circuit-line" d="M40 80 L120 80 L120 160 L200 160" />
          <path
            className="ed-hero-visual__circuit-line"
            d="M360 120 L280 120 L280 200 L200 200"
            style={{ animationDelay: '800ms' }}
          />
          <path
            className="ed-hero-visual__circuit-line"
            d="M60 320 L60 240 L140 240 L140 200"
            style={{ animationDelay: '1000ms' }}
          />
          <path
            className="ed-hero-visual__circuit-line"
            d="M340 300 L340 220 L260 220 L200 220"
            style={{ animationDelay: '1200ms' }}
          />
          <path
            className="ed-hero-visual__circuit-line"
            d="M40 200 L90 200 L90 280"
            style={{ animationDelay: '900ms' }}
          />

          <rect className="ed-hero-visual__circuit-chip" x="114" y="74" width="12" height="12" />
          <rect
            className="ed-hero-visual__circuit-chip"
            x="274"
            y="114"
            width="12"
            height="12"
            style={{ animationDelay: '1.5s' }}
          />
          <rect
            className="ed-hero-visual__circuit-chip"
            x="134"
            y="234"
            width="12"
            height="12"
            style={{ animationDelay: '1.7s' }}
          />

          <circle className="ed-hero-visual__circuit-node" cx="200" cy="160" r="3" />
          <circle
            className="ed-hero-visual__circuit-node"
            cx="200"
            cy="200"
            r="3"
            style={{ animationDelay: '1.6s' }}
          />
          <circle
            className="ed-hero-visual__circuit-node"
            cx="140"
            cy="200"
            r="2.5"
            style={{ animationDelay: '1.7s' }}
          />
          <circle
            className="ed-hero-visual__circuit-node"
            cx="260"
            cy="220"
            r="2.5"
            style={{ animationDelay: '1.8s' }}
          />
        </svg>

        <div className="ed-hero-visual__logo-wrap">
          <div className="ed-hero-visual__logo-badge">
            <span className="ed-hero-visual__logo-badge-dot" />
            CORE
          </div>
          <BrandLogo
            width={180}
            className="ed-hero-visual__logo"
            fetchPriority="low"
          />
          <div className="ed-hero-visual__logo-footer">HANDS-ON LAB</div>
        </div>

        {TECH_LABELS.map((item) => (
          <div key={item.id} className={`ed-hero-visual__label ${item.className}`}>
            <span className="ed-hero-visual__label-dot" />
            <span className="ed-hero-visual__label-text">{item.label}</span>
          </div>
        ))}

        <div className="ed-hero-visual__readout">
          <div className="ed-hero-visual__readout-line">
            <span className="ed-hero-visual__readout-key">SYS</span>
            <span className="ed-hero-visual__readout-val">EDLUMINA</span>
          </div>
          <div className="ed-hero-visual__readout-line">
            <span className="ed-hero-visual__readout-key">MODE</span>
            <span className="ed-hero-visual__readout-val">BUILD</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
