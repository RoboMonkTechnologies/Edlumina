import {
  Bot,
  Brain,
  ChevronRight,
  Cpu,
  Microchip,
} from 'lucide-react'
import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { EventCard } from '../components/ui/EventCard'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { ProgramCard } from '../components/ui/ProgramCard'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Stat } from '../components/ui/Stat'
import { TestimonialCard } from '../components/ui/TestimonialCard'

const COLORS = [
  { name: 'Primary / Navy', token: '--color-navy', hex: '#071C3F', role: 'Brand foundation' },
  { name: 'Dark', token: '--color-dark', hex: '#041329', role: 'Deep backgrounds' },
  { name: 'Gold', token: '--color-gold', hex: '#E8A020', role: 'Action & achievement' },
  { name: 'Bright Gold', token: '--color-bright-gold', hex: '#F5B82E', role: 'Hover & emphasis' },
  { name: 'Teal', token: '--color-teal', hex: '#0E7C7B', role: 'Technology & innovation' },
  { name: 'Cream', token: '--color-cream', hex: '#F7F4EC', role: 'Editorial warmth' },
  { name: 'White', token: '--color-white', hex: '#FFFFFF', role: 'Surfaces & contrast' },
  { name: 'Muted', token: '--color-muted', hex: '#667085', role: 'Secondary text' },
]

function Swatch({ name, token, hex, role }) {
  return (
    <div className="ed-card ed-card--flat overflow-hidden">
      <div
        className="h-20 border-b border-border"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div className="flex flex-col gap-1 p-4">
        <span className="font-body text-sm font-semibold text-navy">{name}</span>
        <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
          {hex}
        </span>
        <span className="text-xs text-muted">{role}</span>
      </div>
    </div>
  )
}

function TokenGroup({ title, children }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  )
}

function DesignSystemSection({ id, label, title, accent, children, dark = false }) {
  return (
    <section
      id={id}
      className={`ed-section ${dark ? 'bg-dark text-white' : ''}`}
    >
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:mb-14">
          <SectionLabel variant={dark ? 'onDark' : 'teal'}>{label}</SectionLabel>
          <SectionHeading size="md" accent={accent} onDark={dark}>
            {title}
          </SectionHeading>
        </div>
        {children}
      </Container>
    </section>
  )
}

export function DesignSystem() {
  return (
    <div className="min-h-svh">
      {/* Header */}
      <header className="border-b border-border bg-navy">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div className="flex items-center gap-5">
            <img
              src="/assets/edlumina-logo.png"
              alt="Edlumina Excellence Centre"
              className="h-14 w-14 object-contain md:h-16 md:w-16"
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase">
                Design System v1.0
              </span>
              <h1 className="font-display text-3xl tracking-[0.02em] text-white uppercase md:text-4xl">
                Edlumina Excellence Centre
              </h1>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Hyderabad&apos;s School of Future Skills — brand tokens, components, and
            patterns for a premium engineering academy experience.
          </p>
        </Container>
      </header>

      {/* Colors */}
      <DesignSystemSection id="colors" label="Foundation" title="Color" accent="Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((color) => (
            <Swatch key={color.token} {...color} />
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-navy p-6 text-white">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase">
              Navy Dominant
            </p>
            <p className="mt-2 text-sm text-white/80">
              Primary surfaces, navigation, and institutional weight.
            </p>
          </div>
          <div className="border border-border bg-gold p-6 text-dark">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
              Gold Action
            </p>
            <p className="mt-2 text-sm">
              CTAs, achievements, and energy accents.
            </p>
          </div>
          <div className="border border-border bg-white p-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
              Teal Innovation
            </p>
            <p className="mt-2 text-sm text-muted">
              Labels, technical metadata, and innovation signals.
            </p>
          </div>
        </div>
      </DesignSystemSection>

      {/* Typography */}
      <DesignSystemSection
        id="typography"
        label="Typography"
        title="Type"
        accent="Scale"
        dark
      >
        <div className="ed-grid-pattern--dark flex flex-col gap-10 rounded-sm border border-white/10 p-6 md:p-10">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
              Display — Bebas Neue
            </span>
            <p className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-[0.02em] text-white uppercase">
              Future Skills Engineering
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase">
                Body — Montserrat
              </span>
              <p className="text-base leading-[1.6] text-white/85">
                Edlumina Excellence Centre delivers career-focused technology
                education across robotics, artificial intelligence, embedded
                systems, and advanced engineering disciplines.
              </p>
              <p className="text-sm leading-[1.6] text-white/60">
                Secondary body text for supporting details and descriptions.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
                Technical — JetBrains Mono
              </span>
              <div className="flex flex-col gap-2 font-mono text-[0.75rem] tracking-[0.14em] text-white/70 uppercase">
                <span>01 — Robotics</span>
                <span>02 — Artificial Intelligence</span>
                <span>STAGE 03 / EMBEDDED SYSTEMS</span>
                <span>HYDERABAD · 2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
            <SectionHeading size="2xl" onDark>
              Display 2XL
            </SectionHeading>
            <SectionHeading size="xl" onDark>
              Display XL
            </SectionHeading>
            <SectionHeading size="lg" onDark>
              Display LG
            </SectionHeading>
            <SectionHeading size="md" onDark>
              Display MD
            </SectionHeading>
            <SectionHeading size="sm" onDark>
              Display SM
            </SectionHeading>
          </div>
        </div>
      </DesignSystemSection>

      {/* Spacing & Layout */}
      <DesignSystemSection id="layout" label="Layout" title="Spacing &" accent="Containers">
        <div className="grid gap-8 lg:grid-cols-2">
          <TokenGroup title="Container Widths">
            <div className="flex flex-col gap-3">
              <div className="border border-dashed border-border bg-white p-4">
                <div className="mx-auto max-w-[80rem] bg-navy/5 py-3 text-center font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                  Max — 80rem (1280px)
                </div>
              </div>
              <div className="border border-dashed border-border bg-white p-4">
                <div className="mx-auto max-w-[72rem] bg-navy/5 py-3 text-center font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                  Content — 72rem
                </div>
              </div>
              <div className="border border-dashed border-border bg-white p-4">
                <div className="mx-auto max-w-[48rem] bg-navy/5 py-3 text-center font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                  Narrow — 48rem
                </div>
              </div>
            </div>
          </TokenGroup>

          <TokenGroup title="Section Rhythm">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 border border-border bg-gold/10" />
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
                    Mobile
                  </p>
                  <p className="text-sm text-muted">4rem (64px) section padding</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-24 w-16 shrink-0 border border-border bg-gold/10" />
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
                    Tablet
                  </p>
                  <p className="text-sm text-muted">6rem (96px) section padding</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-32 w-16 shrink-0 border border-border bg-gold/10" />
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
                    Desktop
                  </p>
                  <p className="text-sm text-muted">8rem (128px) section padding</p>
                </div>
              </div>
            </div>
          </TokenGroup>
        </div>

        <div className="ed-grid-pattern mt-10 border border-border bg-white p-8">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
            Technical Grid Pattern
          </p>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Subtle 32px grid at 4% opacity — used on hero and feature sections for
            engineering aesthetic without visual noise.
          </p>
        </div>
      </DesignSystemSection>

      {/* Buttons */}
      <DesignSystemSection id="buttons" label="Actions" title="Button" accent="System">
        <div className="grid gap-10 lg:grid-cols-2">
          <TokenGroup title="Primary — Gold">
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton size="sm">Enrol Now</PrimaryButton>
              <PrimaryButton size="md">Explore Programs</PrimaryButton>
              <PrimaryButton size="lg">
                Book a Campus Visit
                <ChevronRight size={16} />
              </PrimaryButton>
            </div>
            <PrimaryButton disabled>Disabled State</PrimaryButton>
          </TokenGroup>

          <TokenGroup title="Secondary — Navy Outline">
            <div className="flex flex-wrap items-center gap-4">
              <SecondaryButton size="sm">Learn More</SecondaryButton>
              <SecondaryButton size="md">View Curriculum</SecondaryButton>
              <SecondaryButton size="lg">Download Brochure</SecondaryButton>
            </div>
          </TokenGroup>
        </div>

        <div className="mt-10 bg-navy p-8">
          <TokenGroup title="On Dark Background">
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton>Primary Action</PrimaryButton>
              <SecondaryButton variant="onDark">Secondary</SecondaryButton>
              <SecondaryButton variant="ghost">Ghost Link</SecondaryButton>
            </div>
          </TokenGroup>
        </div>
      </DesignSystemSection>

      {/* Labels & Headings */}
      <DesignSystemSection id="headings" label="Editorial" title="Labels &" accent="Headings">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <SectionLabel>Programs</SectionLabel>
            <SectionLabel variant="gold">Excellence Centre</SectionLabel>
            <SectionLabel variant="muted">Supporting Label</SectionLabel>
            <div className="bg-navy p-6">
              <SectionLabel variant="onDark">On Dark Surface</SectionLabel>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-border pt-10">
            <SectionLabel showRules={false}>Without Rules</SectionLabel>
            <SectionHeading size="lg" accent="Future Skills">
              Hyderabad&apos;s School of
            </SectionHeading>
            <p className="max-w-2xl text-base text-muted">
              Pair section labels with display headings for editorial hierarchy.
              Gold accent words draw attention to key brand phrases.
            </p>
          </div>
        </div>
      </DesignSystemSection>

      {/* Badges & Stats */}
      <DesignSystemSection id="badges" label="Metadata" title="Badges &" accent="Stats" dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <TokenGroup title="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge variant="teal">Robotics</Badge>
              <Badge variant="gold" icon={Cpu}>
                VLSI
              </Badge>
              <Badge variant="navy">STEM</Badge>
              <Badge variant="outline">IoT</Badge>
            </div>
          </TokenGroup>

          <TokenGroup title="Statistics">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <Stat value="10" label="Program tracks" onDark />
              <Stat value="3–12" label="School grades" onDark />
              <Stat value="4" label="Audiences" onDark />
            </div>
          </TokenGroup>
        </div>
      </DesignSystemSection>

      {/* Cards */}
      <DesignSystemSection id="cards" label="Components" title="Card" accent="Patterns">
        <TokenGroup title="Program Cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              stage="01 — Robotics"
              title="Robotics"
              description="Design, build, and program autonomous systems with industry-grade hardware and simulation tools."
              icon={Bot}
              tags={['Arduino', 'ROS', 'Sensors']}
              href="#programs"
            />
            <ProgramCard
              stage="02 — AI"
              title="Artificial Intelligence"
              description="Machine learning, computer vision, and neural networks for real-world engineering applications."
              icon={Brain}
              tags={['Python', 'TensorFlow', 'NLP']}
              href="#programs"
            />
            <ProgramCard
              stage="03 — Embedded"
              title="Embedded Systems"
              description="Firmware development, RTOS, and hardware-software integration for connected devices."
              icon={Microchip}
              tags={['C/C++', 'RTOS', 'ARM']}
              href="#programs"
            />
          </div>
        </TokenGroup>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <TokenGroup title="Testimonial Card">
            <TestimonialCard
              quote="Edlumina transformed my approach to engineering. The hands-on robotics program gave me the portfolio and confidence to land my dream role."
              author="Priya Sharma"
              role="Embedded Systems Engineer"
              program="Robotics & Embedded Systems"
            />
          </TokenGroup>

          <TokenGroup title="Event Cards">
            <div className="flex flex-col gap-6">
              <EventCard
                date="22"
                month="Aug"
                title="Robotics Bootcamp"
                description="Intensive 3-day workshop covering autonomous navigation and sensor fusion."
                location="Edlumina Campus, Hyderabad"
                category="Workshop"
                href="#programs"
              />
              <EventCard
                date="05"
                month="Sep"
                title="AI Career Summit"
                description="Industry leaders share insights on AI careers and emerging opportunities."
                location="Virtual + Campus"
                category="Summit"
                href="#programs"
              />
            </div>
          </TokenGroup>
        </div>
      </DesignSystemSection>

      {/* Borders, Shadows, Radii */}
      <DesignSystemSection
        id="tokens"
        label="Tokens"
        title="Borders,"
        accent="Shadows & Radii"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <SectionLabel showRules={false}>Border Radii</SectionLabel>
            <div className="flex gap-4">
              <div className="flex size-16 items-center justify-center border-2 border-navy bg-white text-center font-mono text-[0.625rem] text-muted">
                0
              </div>
              <div className="flex size-16 items-center justify-center rounded-sm border-2 border-navy bg-white font-mono text-[0.625rem] text-muted">
                2px
              </div>
              <div className="flex size-16 items-center justify-center rounded-md border-2 border-navy bg-white font-mono text-[0.625rem] text-muted">
                4px
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel showRules={false}>Shadows</SectionLabel>
            <div className="flex flex-col gap-3">
              <div className="border border-border bg-white p-4 shadow-xs font-mono text-[0.6875rem] text-muted">
                shadow-xs
              </div>
              <div className="border border-border bg-white p-4 shadow-sm font-mono text-[0.6875rem] text-muted">
                shadow-sm
              </div>
              <div className="border border-border bg-white p-4 shadow-md font-mono text-[0.6875rem] text-muted">
                shadow-md
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel showRules={false}>Gold Rule</SectionLabel>
            <div className="flex items-center gap-4">
              <hr className="ed-gold-rule flex-1" />
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal uppercase">
                Excellence
              </span>
              <hr className="ed-gold-rule flex-1" />
            </div>
            <p className="text-xs text-muted">
              Logo-inspired framing element for subtitles and dividers.
            </p>
          </div>
        </div>
      </DesignSystemSection>

      {/* Footer */}
      <footer className="border-t border-border bg-navy py-8">
        <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/50 uppercase">
            Edlumina Design System · v1.0
          </p>
          <p className="text-sm text-white/60">
            Responsive from 320px to large desktop
          </p>
        </Container>
      </footer>
    </div>
  )
}
