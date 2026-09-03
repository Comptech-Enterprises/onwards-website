# Onward Workspaces

Official website for [Onward Workspaces](https://onwardworkspaces.com/) — premium coworking spaces across Delhi NCR.

Built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 15** — App Router, TypeScript
- **Tailwind CSS v4** — Utility-first styling (`@import "tailwindcss"`)
- **Framer Motion** — Animations (parallax, text reveal, counters, magnetic buttons, marquee)
- **Geist** — Font family (via `next/font/google`)

## Features

- Single-page responsive design — white + orange (#d4622b) brand theme
- Parallax hero with animated word cycling
- Bento grid solutions layout
- Auto-sliding mobile carousels (solutions, locations, testimonials)
- Animated scroll counters and infinite logo marquee
- Magnetic CTA buttons
- Location switcher with animated transitions
- Contact form
- Custom Onward brand favicon and header/footer logo

## Pages & Sections

1. **Hero** — Parallax, animated heading, stats strip
2. **Solutions** — Bento grid (desktop) / auto-slider (mobile)
3. **Why Onward** — Numbered feature list, sticky sidebar
4. **Locations** — City switcher with card grid / auto-slider
5. **Gallery** — Placeholder image strip
6. **Testimonials** — Quote cards / auto-slider
7. **Logo Marquee** — Partner brands
8. **Contact** — Form with phone/email/address
9. **Footer** — Links grid

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx        # Full home page (single file — all sections)
    layout.tsx      # Root layout with metadata and Geist fonts
    globals.css     # CSS variables + Tailwind v4 config
    icon.png        # Favicon (32x32)
    apple-icon.png  # Apple touch icon (180x180)
public/
  onward-logo.png   # Brand logo used in header and footer
```

## License

Proprietary — Comptech Enterprises
