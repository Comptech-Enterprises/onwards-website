export interface CentreCopy {
  h1: string;
  body: string;
  address: string;
  connectivity: string;
  capacity: string;
  features: string[];
}

export interface AreaDetail {
  slug: string;
  name: string;
  type: string;
  address: string;
  seats: string;
  centres?: number;
  transit: string;
  highlight: string;
  features: string[];
  img: string;
  heroBanner?: string;
  mapPopupImg?: string;
  gallery: string[];
  clients?: string[];
  centreCopy?: {
    managed?: CentreCopy;
    coworking?: CentreCopy;
  };
  contactBody?: string;
  faqs?: { q: string; a: string }[];
  h1?: string;
  cardCopy?: { managed?: { title: string; subline: string }; coworking?: { title: string; subline: string } };
  description: string;
  mapEmbed?: string;
}

export interface CityData {
  slug: string;
  name: string;
  basePath: string;
  heroImage: string;
  whyChooseImage?: string;
  h1?: string;
  centresHeading?: string;
  expect?: { heading: string; items: { title: string; desc: string }[] };
  faqs?: { q: string; a: string }[];
  contactTitle?: string;
  contactHighlight?: string;
  contactBody?: string;
  heroDescription: string;
  contactDescription: string;
  areas: AreaDetail[];
}

export const delhiCity: CityData = {
  slug: "delhi",
  name: "Delhi",
  basePath: "/locations/delhi",
  heroImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/top-section-hero-image-managed-office-space-in-delhi.webp",
  whyChooseImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/why-choose-onward-for-your-workspace-in-delhi.webp",
  h1: "Coworking space in Delhi",
  centresHeading: "Explore Office Spaces Across Delhi",
  expect: {
    heading: "What to Expect from Onward Workspaces",
    items: [
      {
        title: "Amenities, Services and Flexibility",
        desc: "Discuss furnished workspace configurations, connectivity, meeting facilities, common areas, service support and commercial flexibility. Amenities and access conditions differ by building and plan; request a confirmed inclusions list for your shortlist.",
      },
      {
        title: "Plan for Team Size and Growth",
        desc: "Tell us how many people need desks today, whether you need cabins or collaboration areas, and how headcount may change over the next 6–12 months. A fit-for-purpose proposal should account for current operations and realistic expansion.",
      },
      {
        title: "Understand the Full Cost",
        desc: "Compare base fees, taxes, security deposits, internet and utilities, meeting-room credits, parking, fit-out costs and exit conditions. Ask for a written itemised quote rather than relying on a headline per-seat price.",
      },
      {
        title: "Questions to Ask During a Site Visit",
        desc: "Is the proposed inventory available on the target date? What is included? Are there restrictions on access or branding? What is the lock-in and notice period? How are service issues handled?",
      },
    ],
  },
  faqs: [
    { q: "Where can I find coworking space in Delhi?", a: "Explore Onward Workspaces options in Delhi and ask the team to confirm current availability and the exact property address." },
    { q: "Can I rent private office space in Delhi?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
    { q: "How much does office space cost in Delhi?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
    { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
    { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
  ],
  contactTitle: "Book a Workspace Tour or Request Pricing",
  contactHighlight: "Request Pricing",
  contactBody:
    "Ready to explore Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
  heroDescription:
    "Your next office should work for the people using it, not just look good in photographs. Find a workspace that fits the way your team works in Delhi. Onward Workspaces helps businesses explore coworking space in Delhi, furnished private offices and managed office solutions without the complexity of starting an office from scratch. Compare neighbourhoods, shortlist the right setting and arrange a tour before making a decision.",
  contactDescription:
    "From Connaught Place's CBD energy to the industrial hum of Okhla, our 5 Delhi centres put your team on the metro line, near your clients, and inside a workspace built for how the city actually works.",
  areas: [
    {
      slug: "okhla-phase-2",
      centres: 2,
      name: "Okhla Phase 2",
      type: "Managed Space + Coworking",
      address: "Okhla Industrial Area Phase II, South Delhi",
      seats: "500+ Desks",
      transit: "3 min to Harkesh Nagar Okhla Metro",
      highlight: "Scalable Enterprise Campuses & Turnkey Layouts",
      features: ["Large Team Suites", "Loading Bay", "High-Power Backup", "Gaming Zone"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/centres-in-delhi/okhla-phasee-2.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/top-banner-onward-in-okhla-phase-2.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/okhla-phase-3-1.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/gallery/6.webp",
      ],
      clients: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-2/clients/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-2/clients/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-2/clients/3.webp",
      ],
      contactBody:
        "Ready to explore Okhla Phase 2, Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Okhla Phase 2?", a: "Explore Onward Workspaces options in Okhla Phase 2, Delhi and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Okhla Phase 2?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Okhla Phase 2?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        managed: {
          h1: "Custom-Built Space in Okhla Phase 2",
          body: "Explore Onward Workspaces' Custom-built space in Okhla Phase 2, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "E 40/7, Okhla Industrial Estate, Phase II, New Delhi, 110020",
          connectivity: "Close to Govindpuri Metro Station",
          capacity: "130+ Seats",
          features: ["Dedicated Entrance", "Custom Layout and IT", "Power Backup", "Branded Workspace"],
        },
        coworking: {
          h1: "Coworking Space in Okhla Phase 2",
          body: "Explore Onward Workspaces' coworking centre in Okhla Phase 2, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "E-44/3, Pocket D, Okhla Industrial Estate, Phase II, New Delhi, 110020",
          connectivity: "Close to Govindpuri Metro Station",
          capacity: "550+ Desks",
          features: ["Power Backup", "Meeting Rooms", "Parking Available", "Fully Furnished Workstations"],
        },
      },
      h1: "Office spaces in Okhla Phase 2",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "130+ Seats" },
        coworking: { title: "Coworking Centre", subline: "550+ Seats" },
      },
      description:
        "Looking for a coworking space in Okhla Phase 2 or a private office in Okhla Phase 2, Delhi? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8!2d77.2716!3d28.5312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567890!2sOkhla+Phase+2%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "okhla-phase-3",
      centres: 3,
      name: "Okhla Phase 3",
      type: "Managed Space + Coworking",
      address: "Okhla Industrial Area Phase III, South Delhi",
      seats: "900+ Desks",
      transit: "5 min to Govind Puri Metro Station",
      highlight: "Custom-Fitted Enterprise Floors & Collaborative Studios",
      features: ["Dedicated Server Room", "Cafeteria", "24/7 Security", "Ample Parking"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/centres-in-delhi/okhla-phase-3.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/top-banner-onward-in-okhla-phase-3.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/okhla-phase-3.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/6.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/7.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/8.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/gallery/9.webp",
      ],
      clients: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/6.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/7.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/9.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/okhla-phase-3/clients/10.webp",
      ],
      description:
        "Okhla Phase 3 is synonymous with innovation and technological advancement. This industrial zone is home to a multitude of IT companies, creative agencies, and research institutions. Onward's centre here offers shared office spaces designed to foster creativity and collaboration, with a focus on modern amenities and a conducive work environment.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.2!2d77.2750!3d28.5250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567891!2sOkhla+Phase+3%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "mohan-cooperative",
      centres: 1,
      name: "Mohan Cooperative",
      type: "Coworking",
      address: "Mohan Cooperative Industrial Estate, Mathura Road, New Delhi",
      seats: "600+ Desks",
      transit: "Direct Access from Mohan Estate Metro",
      highlight: "Grand Atrium Offices & Logistics-Connected Suites",
      features: ["National Highway Access", "Ample Parking", "Terrace Garden", "High-Speed WiFi"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/centres-in-delhi/mohan-cooperative.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/top-banner-onward-in-mohan-estate.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/mohan-cooperative.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/gallery/6.webp",
      ],
      description:
        "Escape the hustle and bustle without compromising on professionalism at Onward's Mohan Cooperative centre. This coworking space offers a serene retreat for those seeking a tranquil work environment, imagined amidst lush greenery and modern amenities where the balance between focus and relaxation is seamlessly achieved.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.5!2d77.2800!3d28.5180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567892!2sMohan+Cooperative+Industrial+Estate%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "connaught-place",
      centres: 2,
      name: "Connaught Place",
      type: "Managed Space + Coworking",
      address: "Outer Circle & Barakhamba Road, Connaught Place, New Delhi",
      seats: "550+ Desks",
      transit: "2 min walk to Rajiv Chowk Metro",
      highlight: "CBD Landmark with Executive Boardrooms & Private Suites",
      features: ["Valet Parking", "24/7 Access", "Executive Boardrooms", "Cafeteria Lounge"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/centres-in-delhi/connaught-place.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/top-banner-onward-in-cp.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/connaught-place.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/gallery/6.webp",
      ],
      description:
        "Discover the best coworking space in Connaught Place, Delhi's most iconic central business district. State-of-the-art design meets easy accessibility from the metro, built and designed for teams of all sizes who want a landmark address at the heart of the city.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.2170!3d28.6320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught+Place%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "janakpuri",
      centres: 1,
      name: "Janakpuri",
      type: "Coworking",
      address: "District Centre, Janakpuri, West Delhi",
      seats: "300+ Desks",
      transit: "Direct Access from Janakpuri West Metro Station",
      highlight: "Accessible West Delhi Hub for Local Teams & Startups",
      features: ["Metro-Adjacent", "Flexible Lease Terms", "High-Speed WiFi", "Meeting Credits"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/centres-in-delhi/janakpuri.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/top-banner-onward-in-janakpuri.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/janakpuri.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/gallery/6.webp",
      ],
      description:
        "A well-connected West Delhi address, Onward's Janakpuri centre offers accessible coworking for local teams, freelancers, and startups alike, with the same hospitality-driven standards as every Onward space across the city.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8!2d77.0860!3d28.6200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04b0b0b0b1%3A0x1234567893!2sJanakpuri+District+Centre%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
  ],
};

export const noidaCity: CityData = {
  slug: "noida",
  name: "Noida",
  basePath: "/locations/noida",
  heroImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/top-section-hero-image-managed-office-space-in-noida.webp",
  whyChooseImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/why-choose-onward-for-your-workspace-in-noida.webp",
  heroDescription:
    "Noida continues to be one of India's leading business and technology hubs, attracting enterprises, GCCs, and high-growth companies across sectors. As teams expand their footprint in the city, Onward brings coworking spaces that support flexibility, scalability, and seamless expressway connectivity across key commercial districts.",
  contactDescription:
    "From the institutional calm of Sector 4 to the expressway energy of Sector 126 and 132, our Noida centres put your team close to the city's biggest tech parks and best connected to Delhi NCR.",
  areas: [
    {
      slug: "sector-4",
      name: "Sector 4",
      type: "Managed Space",
      address: "Sector 4 Institutional Area, Noida",
      seats: "400+ Desks",
      transit: "10 min to Noida Sector 15 Metro Station",
      highlight: "Managed Enterprise Floors in a Well-Connected Civic Hub",
      features: ["24/7 Security", "Ample Parking", "Dedicated Server Room", "Cafeteria"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/centres-in-noida/sector-4.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/top-banner-onward-in-sector-4-noida.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-4.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/gallery/6.webp",
      ],
      description:
        "A well-established institutional pocket, Sector 4 gives your team a managed office floor close to Noida's key civic and administrative hubs, with the operational backbone to run enterprise-grade teams from day one.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.3150!3d28.5850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f95d0f0f1%3A0x1234567894!2sSector+4%2C+Noida!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sector-126",
      name: "Sector 126",
      type: "Coworking",
      address: "Noida-Greater Noida Expressway, Sector 126, Noida",
      seats: "480+ Desks",
      transit: "Direct Expressway Ramp & Okhla Bird Sanctuary Metro",
      highlight: "Custom-Fitted MNC Headquarters & High-Growth Pods",
      features: ["Green Certified", "Multi-Cuisine Cafe", "Dual High-Speed ISP", "Podcast Studio"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/centres-in-noida/sector-126.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/top-banner-onward-in-sector-126-noida.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-126.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/gallery/6.webp",
      ],
      description:
        "An expressway tech corridor lined with IT parks, Sector 126 is home to our most vibrant coworking community — custom-fitted for MNC headquarters and high-growth pods alike, with direct expressway access.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.0!2d77.3650!3d28.5050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f95d0f0f1%3A0x1234567895!2sSector+126%2C+Noida!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sector-132",
      name: "Sector 132",
      type: "Managed Space",
      address: "Sector 132 Expressway Commercial Hub, Noida",
      seats: "520+ Desks",
      transit: "Noida Expressway Arterial & Sector 137 Metro",
      highlight: "Sprawling Enterprise Floors with Bespoke Branding",
      features: ["Dedicated Entrance", "Private Breakout Zones", "Biometric Turnstiles", "Creche Facility"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/centres-in-noida/sector-132.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/top-banner-onward-in-sector-132.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-132.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/gallery/6.webp",
      ],
      description:
        "A growing enterprise expressway address, Sector 132 offers sprawling managed floors built for scale, with bespoke branding options and biometric-secured private entrances for larger teams.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5!2d77.3900!3d28.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f95d0f0f1%3A0x1234567896!2sSector+132%2C+Noida!5e0!3m2!1sen!2sin!4v1",
    },
  ],
};

export const gurgaonCity: CityData = {
  slug: "gurgaon",
  name: "Gurugram",
  basePath: "/locations/gurgaon",
  heroImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/top-section-hero-image-managed-office-space-in-gurgaon.webp",
  whyChooseImage: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/why-choose-onward-for-your-workspace-in-gurgaon.webp",
  heroDescription:
    "Gurugram continues to be one of India's leading business and technology hubs, attracting enterprises, GCCs, and high-growth companies across sectors. As teams expand their footprint in the city, Onward brings coworking spaces that support flexibility, scalability, and seamless connectivity across key commercial districts.",
  contactDescription:
    "From MG Road's commercial core to the corporate energy of Udyog Vihar and the growth corridor of Sohna Road, our Gurugram centres put your team where the Millennium City actually does business.",
  areas: [
    {
      slug: "mg-road",
      name: "MG Road",
      type: "Managed Space",
      address: "MG Road, Sector 28, Gurugram",
      seats: "450+ Desks",
      transit: "Direct Access from MG Road Rapid Metro Station",
      highlight: "Managed Enterprise Suites on Gurugram's Original Commercial Spine",
      features: ["Rapid Metro Access", "Premium Reception", "24/7 Power Backup", "Cafeteria"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/centres-in-gurgaon/mg-road.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/top-banner-onward-in-mg-road.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/mg-road.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/gallery/6.webp",
      ],
      description:
        "Gurugram's original commercial spine, MG Road puts your managed office floor in the heart of the city's oldest business district, directly connected to the Rapid Metro.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0!2d77.0700!3d28.4780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567897!2sMG+Road%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "udyog-vihar",
      name: "Udyog Vihar",
      type: "Coworking",
      address: "Udyog Vihar Phase IV, Adjacent to Cyber City & NH-48, Gurugram",
      seats: "500+ Desks",
      transit: "5 min to IndusInd Bank Cyber City Metro & NH-48",
      highlight: "Independent Enterprise Buildings & Tailored Layouts",
      features: ["Direct Airport Link (IGI 15 min)", "Dedicated Server Labs", "Custom Signage", "Cafeteria"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/centres-in-gurgaon/udyog-vihar.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/top-banner-onward-in-udyog-vihar-phase-4.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/udyog-vihar.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/5.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/6.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/7.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/8.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/gallery/9.webp",
      ],
      description:
        "A strategic industrial-turned-corporate arterial hub, Udyog Vihar is home to our thriving coworking community, minutes from Cyber City with a direct link to the airport.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0!2d77.0800!3d28.4950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567898!2sUdyog+Vihar%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sohna-road",
      name: "Sohna Road",
      type: "Coworking",
      address: "Subhash Chowk, Sohna Road, Gurugram",
      seats: "380+ Desks",
      transit: "Subhash Chowk Junction & Direct Elevated Corridor",
      highlight: "Flexible Team Suites with Collaborative Open Commons",
      features: ["Ample Open Parking", "Recreation Area", "Flexible Lease Terms", "High-Speed WiFi"],
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/centres-in-gurgaon/sohna-road.webp",
      heroBanner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/top-banner-onward-in-sohna-road.webp",
      mapPopupImg: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/sohna-road.webp",
      gallery: [
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/gallery/1.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/gallery/2.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/gallery/3.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/gallery/4.webp",
        "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/gallery/5.webp",
      ],
      description:
        "A fast-growing corridor on the edge of the city, Sohna Road offers flexible coworking suites and collaborative open commons, built for teams that want room to grow.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.0!2d77.0400!3d28.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567899!2sSohna+Road%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
  ],
};

export const allCities: CityData[] = [delhiCity, noidaCity, gurgaonCity];

export function getCityBySlug(slug: string): CityData | undefined {
  return allCities.find((c) => c.slug === slug);
}
