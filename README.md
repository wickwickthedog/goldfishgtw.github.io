# Harvey's Portfolio

A modern, dark-themed personal portfolio built with **React + TypeScript + Tailwind CSS**, deployed free on **Netlify**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Dev server & bundler |
| Tailwind CSS v3 | Styling |
| Netlify | Hosting (free) |
| GitHub Desktop | Git GUI (no terminal needed for deploys) |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- [GitHub Desktop](https://desktop.github.com/) installed
- A free [Netlify](https://netlify.com) account
- A free [GitHub](https://github.com) account

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Visit http://localhost:5173 — hot reload is on, changes appear instantly.

### 4. Customise your content
**All your personal info lives in one file:**
```
src/data/content.ts
```
Edit your name, bio, projects, experience, blog posts, and "Now" page items there. You never need to touch the component files unless you want to change layout/design.

### 5. Add your resume
Drop your PDF into the `public/` folder and name it `resume.pdf`.

---

## 📦 Deploy to Netlify (free)

### One-time setup:
1. Push this repo to GitHub via GitHub Desktop
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Connect your GitHub account and select this repo
4. Netlify auto-detects the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy** — your site is live in ~30 seconds!

### After that, every deploy is:
1. Edit your code in VS Code
2. Open GitHub Desktop → write a commit message → **Commit to main**
3. Click **Push origin**
4. Netlify auto-deploys within ~30 seconds ✅

---

## 📁 File Structure

```
harvey-portfolio/
├── public/
│   └── resume.pdf          ← Drop your PDF here
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx       ← Also exports SectionLabel helper
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Blog.tsx
│   │   ├── Now.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── content.ts      ← ✏️ EDIT THIS to update all content
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── netlify.toml
├── .gitignore
└── package.json
```

---

## 🎨 Design Tokens (Tailwind)

All colours are in `tailwind.config.js`:

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#080C10` | Page background |
| `surface` | `#0E1318` | Cards, sections |
| `border` | `#1C2530` | Borders |
| `accent` | `#4AFFA0` | Green highlights, CTAs |
| `accent2` | `#4AC8FF` | Blue highlights |
| `text` | `#E2EAF0` | Body text |
| `subtle` | `#7A90A4` | Secondary text |

Fonts: **Syne** (display/headings) · **DM Sans** (body) · **JetBrains Mono** (code/labels)

---

## 💡 TypeScript Tips (since you're learning!)

- All content types are defined in `src/data/content.ts` — look at `Project`, `Experience`, `Skill`, `BlogPost`
- Components use typed props, e.g. `({ label }: { label: string })`
- `useState<FormState>` in Contact.tsx shows how to type state with a union type
- `React.FormEvent` in Contact.tsx shows how to type event handlers

---

## 🔧 Netlify Forms (optional)

To enable the contact form without a backend:
1. Add `data-netlify="true"` and `name="contact"` to the `<form>` tag in `Contact.tsx`
2. Remove the simulated delay and call `fetch()` to Netlify's form endpoint
3. Netlify handles everything — free up to 100 submissions/month

See the commented-out code in `Contact.tsx` for guidance.
