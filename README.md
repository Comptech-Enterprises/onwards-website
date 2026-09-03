# Onward Workspaces — 2025 Architectural Editorial Redesign

Official website for [Onward Workspaces](https://onwardworkspaces.com/) — Delhi NCR's premier managed offices and agile team coworking spaces.

Built from scratch with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**, featuring a 2025 luxury architectural editorial layout with interactive split dossiers, horizontal swipeable tracks, entry micro-animations, and verified brand identity.

---

## 🚀 Key Highlights & Architectural Features

- **2025 Luxury Architectural Editorial Layout**: Asymmetrical, monograph-inspired design system with warm alabaster (`#faf8f5`), white cards, and signature terracotta/burnt orange (`#d4622b`) branding.
- **Staggered Entry & Scroll Reveal Animations**: Smooth cubic-bezier entrance animations (`useInView`), header drop-in, text blur-to-sharp reveals, and dynamic animated stat counters (3+ Cities, 15+ Centres, 250+ Clients, 1M+ Sq. Ft.).
- **Interactive Split Workspace Dossier**:
  - `01 Managed Enterprise HQ` (Turnkey Built-to-Suit, 50–500+ seats)
  - `02 Private Team Suites` (Sound-Insulated, 4–40 seats)
  - `03 Executive Director Cabins` (Leadership acoustic suites)
  - `04 Virtual Office & GST Compliance` (Registered commercial address)
  - `05 4K Hybrid Boardrooms & Event Hubs` (Polycom AV by the hour)
  - `06 Build-To-Suit Campus` (Custom architecture & development)
- **Dynamic Architectural Inspector**: Live interactive specification view updating timelines, power SLAs, security access, and instant inquiry booking for each format.
- **NCR Strategic Hubs & Commute Slider**: City switcher (`Delhi`, `Gurgaon`, `Noida`) with walking distance metro proximity indicators and swipeable/draggable horizontal tracks.
- **Enterprise Specifications Bento Grid**: 6-part matrix covering 1Gbps redundant multi-ISP fiber, acoustic Zoom pods, artisanal barista roastery pantry, 24/7 AI biometrics, and 100% dual generator cutover.
- **Campus Gallery Walk**: Horizontal swipeable gallery with architectural vector placeholders.
- **Enterprise Endorsements**: Verified press and founder reviews (*Dangal Games*, *Aramex*, *Thermax*) alongside an infinite animated client marquee.
- **Interactive 2-Column Split FAQ Knowledge Hub**: Filterable question categories (*2-Day Free Trial*, *Virtual Office & GST*, *Managed Enterprise*, *Inclusions & Amenities*) paired with a sticky concierge advisory block.
- **Floating 2025 Concierge Action Dock**: Pinned bottom viewport dock with live status indicators and quick triggers for free 2-day trial passes and tour bookings.
- **2-Day Free Trial & Tour Booking Modal**: Interactive reservation dialog with slot selection and instant confirmation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom luxury theme tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Springs, InView triggers, AnimatePresence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Geist Sans & Mono](https://vercel.com/font)

---

## 📂 Project Structure

```
onwards-website/
├── public/
│   └── onward-logo.png       # Authentic Onward Workspaces brand logo
├── src/
│   └── app/
│       ├── globals.css       # Theme tokens, custom grid patterns & scrollbar utilities
│       ├── layout.tsx        # Root layout, metadata & Geist font configuration
│       ├── page.tsx          # 2025 Architectural layout (All interactive sections & modals)
│       ├── icon.png          # Favicon (32x32)
│       └── apple-icon.png    # Apple touch icon (180x180)
├── package.json              # Project scripts & dependencies
├── next.config.ts            # Next.js configuration
└── README.md                 # Project documentation
```

---

## 💻 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Comptech-Enterprises/onwards-website.git
cd onwards-website
git checkout demo
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 🏢 Brand & Corporate Information

- **Company**: Onward Coworkx Private Limited
- **Headquarters**: Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, 110020
- **Leasing Helpline**: +91 9910668152
- **Official Inquiries**: info@onwardworkspaces.com
- **Website**: [onwardworkspaces.com](https://onwardworkspaces.com/)

---

## 📄 License

Proprietary — Comptech Enterprises / Onward Coworkx Pvt. Ltd.
