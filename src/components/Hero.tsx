import { useEffect, useState } from 'react'
import { personal } from '../data/content'

const roles = [
  'Software Engineer',
  'Backend Developer',
  'Integration Specialist',
  'API Integration Engineer'
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((roleIdx + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,255,160,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,255,160,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24">
        {/* Status badge */}
        {personal.available && (
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent">Available for hire</span>
          </div>
        )}

        {/* Name */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-text leading-none mb-4 opacity-0-init animate-fade-up">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">
            {personal.name}
          </span>
          .
        </h1>

        {/* Typewriter role */}
        <div className="font-mono text-xl sm:text-2xl text-subtle mb-6 h-8 opacity-0-init animate-fade-up delay-200">
          <span className="text-accent2">&gt; </span>
          {displayed}
          <span className="animate-blink text-accent">_</span>
        </div>

        {/* Tagline */}
        <p className="font-body text-lg sm:text-xl text-subtle max-w-xl mb-10 leading-relaxed opacity-0-init animate-fade-up delay-300">
          {personal.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 opacity-0-init animate-fade-up delay-400">
          {/* <a
            href="#projects"
            className="font-mono text-sm bg-accent text-bg font-semibold px-6 py-3 rounded hover:bg-accent/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/20"
          >
            View my work →
          </a> */}
          {/* <a
            href="#contact"
            className="font-mono text-sm border border-border text-subtle px-6 py-3 rounded hover:border-accent hover:text-accent transition-all hover:-translate-y-0.5"
          >
            Get in touch
          </a> */}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm border border-border text-subtle px-6 py-3 rounded hover:border-muted hover:text-text transition-all hover:-translate-y-0.5"
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0-init animate-fade-in delay-700">
          <span className="font-mono text-xs text-muted">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  )
}
