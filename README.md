# Onward Workspaces — Commercial Workspace Portal (`demo-1` Branch)

Official website for [Onward Workspaces](https://onwardworkspaces.com/) — Delhi NCR's leading network of managed offices, private team suites, and agile coworking spaces.

Built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**, featuring an authentic, high-converting commercial workspace portal UX with embedded lead capture, interactive location explorers, and a 2-column split FAQ knowledge hub.

---

## 🚀 Key Highlights & Portal Features

- **Authentic Commercial Workspace UX**: Clean, trusted, and high-converting design layout with a crisp light palette (`bg-white` & `bg-slate-50`), sharp typography, and signature warm terracotta (`#d9531e`) action accents.
- **Top Utility & Contact Ribbon**: Instant direct phone line access (`+91 9910668152`), NCR hubs coverage overview (*Delhi • Gurgaon • Noida*), and *Complimentary 2-Day Trial Pass* announcement ribbon.
- **Full-Width Header & Mobile Navigation**: Fixed full-width header with brand identity, desktop menu links with animated micro-underlines, direct call button, and responsive mobile dropdown drawer.
- **Hero Section with Embedded Tour Booking Form**:
  - High-impact value proposition (*"Fully Managed Workspaces Designed for Focus & Team Growth"*).
  - Trust checkmarks (*15+ Prime Metro Hubs, 100% Dual DG Power & 1Gbps Fiber, Same-Day Move-In Ready, Zero Hidden Maintenance Overheads*).
  - Live metric counters (*15+ Hubs, 250+ Active Teams, 1M+ Sq. Ft. Managed*).
  - Integrated **"Book A Tour / Free Pass" Lead Capture Box** (Name, Work Email, Phone, Preferred Hub dropdown, Team Size selector).
- **Workspace Solutions Carousel**:
  - `01 Private Team Suites` (Sound-Insulated 42dB Glass, 4–50 seats)
  - `02 Custom Managed Floors` (Turnkey Branded Enterprise Headquarters, 50–500+ seats)
  - `03 Executive Director Cabins` (Leadership acoustic sanctuaries with Italian leather)
  - `04 Virtual Office & GST Registration` (100% MCA & ROC compliant commercial address)
  - Touch/mouse drag horizontal track with left/right navigation arrow controls.
- **NCR Strategic Hubs Explorer**:
  - City switcher (`Delhi`, `Gurgaon`, `Noida`) covering Okhla Phase II & III, Mohan Cooperative, Connaught Place, DLF Cyber City, Udyog Vihar, Golf Course Ext., Sector 62, Sector 16, and Sector 132.
  - Side-by-side layout: detailed location listings with metro distance and amenities on the left, paired with a sticky live visual preview and booking trigger on the right.
- **Comprehensive Amenities Grid**: 6-part matrix covering 1Gbps redundant multi-ISP fiber, unlimited barista coffee & teas, soundproof calling booths, 100% DG power backup, 24/7 biometric security, and daily housekeeping.
- **Client Endorsements & Real Brands**: Verified founder testimonials (*Dangal Games*, *Aramex*, *Thermax*) alongside an infinite client brand bar.
- **2-Column Split Knowledge Hub & FAQ**:
  - **Left Column**: Sticky overview with interactive topic filter pills (*All Topics*, *Trial Pass*, *Move-In & Leases*, *GST & Legal*, *Pricing & Amenities*) and direct concierge help box.
  - **Right Column**: Category-badged expandable accordions with terracotta active indicators and smooth Framer Motion height animations.
- **2-Day Free Trial & Walkthrough Reservation Modal**: Instant pop-up reservation dialog with slot selection and confirmation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
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
│       ├── globals.css       # Theme tokens, custom grid patterns & utilities
│       ├── layout.tsx        # Root layout, metadata & Geist font configuration
│       ├── page.tsx          # Commercial Workspace Portal (Hero form, Hubs, Spaces, FAQ Hub)
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
git checkout demo-1
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
- **Direct Leasing Helpline**: +91 9910668152
- **Official Email**: info@onwardworkspaces.com
- **Official Website**: [onwardworkspaces.com](https://onwardworkspaces.com/)

---

## 📄 License

Proprietary — Comptech Enterprises / Onward Coworkx Pvt. Ltd.

