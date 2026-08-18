import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { PrimaryButton } from '../ui/PrimaryButton'
import { handleEnquiryClick } from '../../lib/enquiry'

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Programs', href: '#programs', id: 'programs' },
  { label: 'Why Now', href: '#why-now', id: 'why-now' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)
const SCROLL_THRESHOLD = 24

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const activeSection = useScrollSpy(SECTION_IDS)

  useBodyScrollLock(isMobileOpen)

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  const handleNavClick = useCallback(() => {
    closeMobileMenu()
  }, [closeMobileMenu])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setIsHeroVisible(false)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.15)
      },
      { rootMargin: `-${SCROLL_THRESHOLD}px 0px 0px 0px`, threshold: [0, 0.15, 0.5] },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMobileOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const panel = menuRef.current
      if (!panel) return

      const focusable = [
        menuButtonRef.current,
        ...panel.querySelectorAll('a[href], button:not([disabled])'),
      ].filter(Boolean)

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMobileOpen, closeMobileMenu])

  useEffect(() => {
    if (!isMobileOpen) return undefined

    const handleClickOutside = (event) => {
      if (
        menuRef.current?.contains(event.target) ||
        menuButtonRef.current?.contains(event.target)
      ) {
        return
      }
      closeMobileMenu()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen, closeMobileMenu])

  const navbarState = isScrolled ? 'scrolled' : 'top'
  const currentSection = isHeroVisible ? '' : activeSection

  return (
    <header>
      <div
        className={cn(
          'ed-navbar',
          navbarState === 'scrolled' ? 'ed-navbar--scrolled' : 'ed-navbar--top',
        )}
      >
        <div className="ed-navbar__inner">
          <a
            href="#hero"
            className="ed-navbar__brand"
            aria-label="Edlumina Excellence Centre — Home"
            onClick={handleNavClick}
          >
            <img
              src="/assets/edlumina-lockup.png"
              alt=""
              className="ed-navbar__logo"
              width={220}
              height={56}
              decoding="async"
              fetchPriority="high"
            />
          </a>

          <nav className="ed-navbar__nav" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'ed-navbar__link',
                  currentSection === item.id && 'ed-navbar__link--active',
                )}
                aria-current={currentSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ed-navbar__actions">
            <PrimaryButton
              href="#contact"
              size="sm"
              className="ed-navbar__cta"
              onClick={(event) => {
                handleEnquiryClick(event, '')
                handleNavClick()
              }}
            >
              <span className="ed-navbar__cta-full">Book Free Demo</span>
              <span className="ed-navbar__cta-short">Demo</span>
            </PrimaryButton>

            <button
              ref={menuButtonRef}
              type="button"
              className="ed-navbar__menu-btn"
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileOpen((open) => !open)}
            >
              {isMobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={menuRef}
        className={cn('ed-navbar__mobile', isMobileOpen && 'ed-navbar__mobile--open')}
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
      >
        <nav className="ed-navbar__mobile-inner" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'ed-navbar__mobile-link',
                  currentSection === item.id && 'ed-navbar__mobile-link--active',
                )}
                aria-current={currentSection === item.id ? 'page' : undefined}
                tabIndex={isMobileOpen ? 0 : -1}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            ))}

            <div className="ed-navbar__mobile-cta">
              <PrimaryButton
                href="#contact"
                size="md"
                className="ed-navbar__cta--mobile"
                onClick={(event) => {
                  handleEnquiryClick(event, '')
                  handleNavClick()
                }}
                tabIndex={isMobileOpen ? 0 : -1}
              >
                Book Free Demo
              </PrimaryButton>
            </div>
        </nav>
      </div>
    </header>
  )
}
