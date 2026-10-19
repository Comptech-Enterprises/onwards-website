export interface Solution {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  tag: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  img: string;
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  heroBody?: string;
  contactBody?: string;
  faqs?: { q: string; a: string }[];
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
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/managed-office.webp",
    metaTitle: "Managed Office Space in Delhi | Onward Workspaces",
    metaDescription:
      "Discover managed office space in delhi with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Managed Office Space in Delhi NCR",
    heroBody:
      "Bring your team into a workspace planned around your operations. Explore managed office space in Delhi with configurable layouts, service support and a commercial proposal matched to your headcount and timeline.",
    contactBody:
      "Ready to explore managed office space in delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about managed office space in delhi ncr?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
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
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/private-suites.webp",
    metaTitle: "Private Suites in Delhi NCR | Onward Workspaces",
    metaDescription:
      "Discover Private Suites in Delhi NCR with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Private Suites in Delhi NCR",
    heroBody:
      "Bring your team into a workspace planned around your operations. Explore Private Suites in Delhi NCR with configurable layouts, service support and a commercial proposal matched to your headcount and timeline.",
    contactBody:
      "Ready to explore Private Suites in Delhi NCR? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about Private Suites in Delhi NCR?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
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
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/private-cabins.webp",
    metaTitle: "Private cabins in Delhi NCR | Onward Workspaces",
    metaDescription:
      "Discover Private cabins in Delhi NCR with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Private cabins in Delhi NCR",
    heroBody:
      "Bring your team into a workspace planned around your operations. Explore Private cabins in Delhi NCR with configurable layouts, service support and a commercial proposal matched to your headcount and timeline.",
    contactBody:
      "Ready to explore Private cabins in Delhi NCR? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about Private cabins in Delhi NCR?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
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
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/virtual-office.webp",
    metaTitle: "Virtual Office in Delhi NCR | Onward Workspaces",
    metaDescription:
      "Discover virtual office in Delhi NCR with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Virtual Office in Delhi NCR",
    heroBody:
      "Build a professional business presence in Delhi NCR without taking a full-time physical office. Ask which virtual office plans, address services and documentation options are available and suitable for your intended use.",
    contactBody:
      "Ready to explore virtual office in Delhi NCR? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about virtual office in Delhi NCR?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
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
      { title: "Pan-NCR Network", desc: "Access 80+ centres across Delhi, Noida, and Gurgaon from a single account." },
      { title: "Instant Availability", desc: "Real-time booking with immediate confirmation — walk in and start working." },
      { title: "Enterprise-Ready AV", desc: "4K video conferencing, wireless presentation, and premium audio in every meeting room." },
    ],
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/on-demand.webp",
    metaTitle: "Meeting Rooms | Day Passes | Onward Workspaces",
    metaDescription:
      "Discover meeting rooms & day passes with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Meeting Rooms",
    heroBody:
      "Meet clients, interview candidates or bring your team together in a professional meeting environment. Share your preferred location, date, group size and equipment needs to receive suitable meeting room options.",
    contactBody:
      "Ready to explore meeting rooms & day passes? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about meeting rooms & Day passes?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
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
    img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/solutions/custom-built.webp",
    metaTitle: "Custom Built in Delhi NCR | Onward Workspaces",
    metaDescription:
      "Discover Custom Built in Delhi NCR with Onward Workspaces. Explore suitable options, discuss your team requirements and request a tailored proposal.",
    h1: "Custom Built in Delhi NCR",
    heroBody:
      "Bring your team into a workspace planned around your operations. Explore Custom Built in Delhi NCR with configurable layouts, service support and a commercial proposal matched to your headcount and timeline.",
    contactBody:
      "Ready to explore Custom Built in Delhi NCR? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
    faqs: [
      { q: "How do I enquire about Custom Built in Delhi NCR?", a: "Share your requirements using the enquiry form and request a proposal from the Onward Workspaces team." },
      { q: "Can I compare locations before deciding?", a: "Yes. Ask for a shortlist based on city, team size, preferred budget and availability." },
      { q: "Are prices and terms the same everywhere?", a: "No. Fees, inclusions, deposits and contract conditions should be confirmed for each location or solution." },
      { q: "Can I arrange a visit or consultation?", a: "Request a site visit or consultation with the sales team to discuss the next steps." },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
