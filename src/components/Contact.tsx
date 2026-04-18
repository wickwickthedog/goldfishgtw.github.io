import { useState } from 'react'
import { personal } from '../data/content'
import { SectionLabel } from './About'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    // Replace this with your preferred form service (Netlify Forms, Formspree, etc.)
    // Netlify Forms: add `data-netlify="true"` to the <form> tag and it works automatically.
    // For now, we simulate a 1s delay.
    await new Promise(res => setTimeout(res, 1000))
    setState('sent')
  }

  return (
    <section id="contact" className="py-28 max-w-5xl mx-auto px-6">
      <SectionLabel label="07 / Contact" />

      <div className="mt-10 grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-6 leading-tight">
            Let's build something <span className="text-accent">great</span>.
          </h2>
          <p className="font-body text-subtle leading-relaxed mb-8">
            I'm open to full-time roles, freelance projects, and interesting collabs.
            If you've got something in mind, drop me a message — I reply within a day.
          </p>
          <div className="space-y-3">
            <ContactLink icon="✉" label={personal.email} href={`mailto:${personal.email}`} />
            <ContactLink icon="⬡" label="GitHub" href={personal.github} />
            <ContactLink icon="⬡" label="LinkedIn" href={personal.linkedin} />
          </div>
        </div>

        {/* Form */}
        {state === 'sent' ? (
          <div className="flex flex-col items-center justify-center border border-accent/30 rounded-xl p-10 bg-surface text-center">
            <span className="text-4xl mb-4">🚀</span>
            <h3 className="font-display font-bold text-xl text-text mb-2">Message sent!</h3>
            <p className="font-body text-sm text-subtle">Thanks for reaching out — I'll get back to you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            // Netlify Forms support: uncomment to enable
            // data-netlify="true"
            // name="contact"
          >
            <FormField
              label="Name"
              type="text"
              value={form.name}
              placeholder="Your name"
              onChange={v => setForm({ ...form, name: v })}
            />
            <FormField
              label="Email"
              type="email"
              value={form.email}
              placeholder="your@email.com"
              onChange={v => setForm({ ...form, email: v })}
            />
            <div>
              <label className="font-mono text-xs text-muted block mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full font-mono text-sm bg-accent text-bg font-semibold py-3 rounded-lg hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-lg shadow-accent/10"
            >
              {state === 'sending' ? 'Sending...' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function FormField({
  label, type, value, placeholder, onChange,
}: {
  label: string; type: string; value: string; placeholder: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="font-mono text-xs text-muted block mb-2">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}

function ContactLink({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 group"
    >
      <span className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-sm text-subtle group-hover:border-accent group-hover:text-accent transition-all">
        {icon}
      </span>
      <span className="font-mono text-sm text-subtle group-hover:text-accent transition-colors">
        {label}
      </span>
      <span className="text-muted group-hover:text-accent transition-colors text-xs">↗</span>
    </a>
  )
}
