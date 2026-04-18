import { useState, useEffect } from 'react'
import { personal } from '../data/content'

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  // { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  //{ href: '#blog',       label: 'Blog' },
  // { href: '#now',        label: 'Now' },
  // { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : ''
    }`}>
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-display font-bold text-lg text-text hover:text-accent transition-colors">
          <span className="text-accent">&gt;</span> {personal.name.toLowerCase()}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs text-subtle hover:text-accent px-3 py-2 rounded transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 font-mono text-xs border border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-bg transition-all"
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-subtle hover:text-text transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="font-mono text-lg">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 pb-6">
          <ul className="flex flex-col gap-3 pt-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-subtle hover:text-accent transition-colors block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-accent text-accent px-4 py-2 rounded inline-block hover:bg-accent hover:text-bg transition-all"
              >
                Resume ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
