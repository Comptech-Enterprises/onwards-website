export interface Solution {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  tag: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  img: string;
}

export const solutions: Solution[] = [
  {
    slug: "managed-office",
    title: "Managed Office",
    tagline: "Your office, our operations — fully customised enterprise workspaces managed end-to-end by Onward.",
    desc: "Customised workspace for Enterprise, MNCs & Unicorns with dedicated access & branding.",
    tag: "ENTERPRISE",
    features: ["Dedicated Entrance", "Custom Layout & IT", "24/7 Access", "Branded Signage", "Server Room", "Cafeteria"],
    benefits: [
      { title: "Zero Capex Setup", desc: "Move into a fully furnished, branded office without the capital expenditure of a traditional lease." },
      { title: "Operational Freedom", desc: "Focus on your business while Onward handles facilities, housekeeping, security, and IT infrastructure." },
      { title: "Scalable Floors", desc: "Expand or contract your footprint with flexible terms — no lock-in periods or hidden costs." },
      { title: "Enterprise-Grade Security", desc: "Biometric access, CCTV surveillance, dedicated server rooms, and 24/7 on-site security." },
    ],
    img: "/images/solutions/managed-office.webp",
  },
  {
    slug: "private-suites",
    title: "Private Suites",
    tagline: "Fully-managed private office suites for high-velocity teams of 10 to 100+ members.",
    desc: "Fully-managed private cabins for high-velocity teams of 10 to 100+ members.",
    tag: "TEAMS",
    features: ["Ergonomic Seating", "Soundproof Cabins", "Meeting Credits", "Dedicated Reception", "Mail Handling", "Pantry Access"],
    benefits: [
      { title: "Privacy & Focus", desc: "Enclosed suites with soundproofing ensure your team can collaborate without distractions." },
      { title: "Move-In Ready", desc: "Fully furnished with ergonomic furniture, high-speed internet, and enterprise-grade IT." },
      { title: "Flexible Terms", desc: "Lock in suites from 6 months — scale up as your team grows across our network." },
      { title: "Community Access", desc: "Your team gets access to shared lounges, events, and networking across all Onward centres." },
    ],
    img: "/images/solutions/private-suites.webp",
  },
  {
    slug: "private-cabins",
    title: "Private Cabins",
    tagline: "Fully-equipped executive cabins crafted specifically for partners, directors, and CXOs.",
    desc: "Fully-equipped executive space crafted specifically for partners and directors.",
    tag: "EXECUTIVE",
    features: ["Executive Furniture", "Private Lounge", "Concierge Service", "Valet Parking", "Premium Pantry", "Video Conferencing"],
    benefits: [
      { title: "Executive Standard", desc: "Premium furnishings, private lounge access, and concierge services for senior leadership." },
      { title: "Client-Ready", desc: "Impress clients with a prestigious address and boardroom-standard meeting facilities." },
      { title: "Complete Privacy", desc: "Fully enclosed cabins with soundproofing and independent climate control." },
      { title: "Flexible Commitment", desc: "Short-term availability for visiting executives or long-term seats for resident leadership." },
    ],
    img: "/images/solutions/private-cabins.webp",
  },
  {
    slug: "virtual-office",
    title: "Virtual Office",
    tagline: "A prestigious CBD business address with mail handling, GST registration & zero overhead costs.",
    desc: "Prestigious CBD business address with mail handling & zero overhead costs.",
    tag: "REMOTE",
    features: ["GST Registration", "Mail Forwarding", "Day Pass Access", "Business Address", "Call Handling", "Meeting Room Credits"],
    benefits: [
      { title: "Professional Presence", desc: "A prime business address in Delhi NCR's top commercial districts without the cost of physical space." },
      { title: "GST & Compliance Ready", desc: "Use your virtual office address for GST registration, company incorporation, and official filings." },
      { title: "Mail & Call Handling", desc: "Professional reception handles your mail, packages, and calls — forwarded as you need." },
      { title: "On-Demand Access", desc: "Day passes and meeting room credits let you use physical space when you need it." },
    ],
    img: "/images/solutions/virtual-office.webp",
  },
  {
    slug: "on-demand",
    title: "On-Demand",
    tagline: "Boardrooms, meeting suites & flexible day passes on the go across NCR.",
    desc: "Boardrooms, meeting suites & flexible day passes on the go across NCR.",
    tag: "FLEXIBLE",
    features: ["Instant Booking", "4K Video Conference", "Unlimited Beverage", "Whiteboard & AV", "High-Speed WiFi", "Receptionist Support"],
    benefits: [
      { title: "Pay Per Use", desc: "Book boardrooms, meeting suites, or day passes by the hour — no subscription required." },
      { title: "Pan-NCR Network", desc: "Access 80+ centres across Delhi, Noida, and Gurugram from a single account." },
      { title: "Instant Availability", desc: "Real-time booking with immediate confirmation — walk in and start working." },
      { title: "Enterprise-Ready AV", desc: "4K video conferencing, wireless presentation, and premium audio in every meeting room." },
    ],
    img: "/images/solutions/on-demand.webp",
  },
  {
    slug: "custom-built",
    title: "Custom Built",
    tagline: "End-to-end bespoke interior architecture tailored to your company identity and culture.",
    desc: "End-to-end bespoke interior architecture tailored to your company identity.",
    tag: "BESPOKE",
    features: ["Architect-Led Design", "Brand Aesthetics", "Turnkey Build", "Project Management", "MEP Engineering", "Compliance Clearance"],
    benefits: [
      { title: "Design to Handover", desc: "From concept to keys — our in-house architecture team delivers your vision on time and on budget." },
      { title: "Brand Expression", desc: "Every element reflects your company identity — from materials and colours to signage and lighting." },
      { title: "Full-Stack Build", desc: "Civil, MEP, furniture, IT, and AV — a single vendor for your entire workspace buildout." },
      { title: "Ongoing Management", desc: "Post-handover, Onward can manage your custom space with the same operational rigour as our centres." },
    ],
    img: "/images/solutions/custom-built.webp",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
