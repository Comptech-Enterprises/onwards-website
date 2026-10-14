export interface CentreCopy {
  contactBody?: string;
  faqs?: { q: string; a: string }[];
  metaTitle?: string;
  metaDescription?: string;
  cta?: string;
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
  secondManaged?: Partial<CentreCopy>;
  metaTitle?: string;
  metaDescription?: string;
  contactBody?: string;
  faqs?: { q: string; a: string }[];
  cardHeading?: string;
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
  metaTitle?: string;
  metaDescription?: string;
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
      metaTitle: "Coworking Space in Okhla Phase 3, Delhi | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Okhla Phase 3, Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Okhla Phase 3, Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Okhla Phase 3?", a: "Explore Onward Workspaces options in Okhla Phase 3, Delhi and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Okhla Phase 3?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Okhla Phase 3?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      secondManaged: { address: "Plot No. 151, Okhla Industrial Estate, Phase III, New Delhi, 110020" },
      centreCopy: {
        managed: {
          h1: "Custom-Built Space in Okhla Phase 3",
          body: "Explore Onward Workspaces' Custom-built space in Okhla Phase 3, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Plot No. 41, Okhla Industrial Estate, Phase III, New Delhi, 110020",
          connectivity: "Close to Okhla NSIC Metro Station",
          capacity: "300+ Seats",
          features: ["Dedicated Entrance", "Custom Layout and IT", "Power Backup", "Branded Workspace"],
        },
        coworking: {
          h1: "Coworking Space in Okhla Phase 3",
          body: "Explore Onward Workspaces' coworking centre in Okhla Phase 3, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Plot No. 20, Okhla Industrial Estate, Phase III, New Delhi, 110020",
          connectivity: "Close to Okhla NSIC Metro Station",
          capacity: "870+ Seats",
          features: ["Power Backup", "Meeting Rooms", "Pantry and Café Area", "Parking Available"],
        },
      },
      h1: "Office spaces in Okhla Phase 3",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "300+ Seats" },
        coworking: { title: "Coworking Centre", subline: "870+ Seats" },
      },
      description:
        "Looking for coworking space in Okhla Phase 3 or a private office in Okhla Phase 3, Delhi? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
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
      metaTitle: "Coworking Space in Mohan Estate, Delhi | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Mohan Estate, Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Mohan Estate, Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Mohan Estate?", a: "Explore Onward Workspaces options in Mohan Estate, Delhi and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Mohan Estate?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Mohan Estate?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        coworking: {
          h1: "Coworking Centre in Mohan Estate",
          body: "Explore Onward Workspaces Mohan Estate, an Onward Workspaces location associated with Mohan Estate, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "B1/A5, Block E, Mohan Cooperative Industrial Estate, Badarpur, New Delhi, 110044",
          connectivity: "Close to Mohan Estate Metro Station",
          capacity: "480+ Seats",
          features: ["Power Backup", "Meeting Rooms", "Pantry and Café Area", "Parking Available"],
        },
      },
      h1: "Office space in Mohan Estate",
      cardCopy: {
        coworking: { title: "Coworking Centre", subline: "480+ Seats" },
      },
      description:
        "Looking for coworking space in Mohan Estate or a private office in Mohan Estate, Delhi? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
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
      contactBody:
        "Ready to explore Connaught Place, Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Connaught Place?", a: "Explore Onward Workspaces options in Connaught Place, Delhi and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Connaught Place?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Connaught Place?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        managed: {
          h1: "Custom-Built Space in Connaught Place",
          body: "Explore Onward Workspaces' Custom-built space in Connaught Place, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Second Floor, L-51 to 54, Connaught Circus, Connaught Place, New Delhi, 110001",
          connectivity: "Close to Rajiv Chowk Metro Station",
          capacity: "240+ Seats",
          features: ["Custom Layout and IT", "Branded Workspace", "Dedicated Entrance", "24/7 Access", "Power Backup"],
        },
        coworking: {
          h1: "Coworking Space in Connaught Place",
          body: "Explore Onward Workspaces' coworking centre in Connaught Place, Delhi. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "ECE House, Plot No. 28, Kasturba Gandhi Marg, Connaught Place, New Delhi, 110001",
          connectivity: "Close to Rajiv Chowk Metro Station",
          capacity: "250+ Seats",
          features: ["Central Delhi Address", "Meeting Rooms", "Power Backup", "Pantry and Café Area"],
        },
      },
      h1: "Office space in Connaught Place",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "240+ Seats" },
        coworking: { title: "Coworking Centre", subline: "250+ Seats" },
      },
      description:
        "Looking for coworking space in Connaught Place or a private office in Connaught Place, Delhi? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
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
      metaTitle: "Coworking Space in Janakpuri, Delhi | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Janakpuri, Delhi with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Janakpuri, Delhi? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Janakpuri?", a: "Explore Onward Workspaces options in Janakpuri, Delhi and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Janakpuri?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Janakpuri?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      h1: "Office space in Janakpuri",
      cardCopy: {
        coworking: { title: "Coworking Centre", subline: "600+ Seats" },
      },
      description:
        "Looking for coworking space in Janakpuri or a private office in Janakpuri, Delhi? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
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
  metaTitle: "Coworking Space in Noida | Office Space | Onward",
  metaDescription:
    "Explore coworking space and office space in Noida with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
  h1: "Office space in Noida",
  centresHeading: "Explore Office Space Across Noida",
  expect: delhiCity.expect,
  faqs: [
    { q: "Where can I find coworking space in Noida?", a: "Explore Onward Workspaces options in Noida and ask the team to confirm current availability and the exact property address." },
    { q: "Can I rent private office space in Noida?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
    { q: "How much does office space cost in Noida?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
    { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
    { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
  ],
  contactTitle: "Book a Workspace Tour or Request Pricing",
  contactHighlight: "Request Pricing",
  contactBody:
    "Ready to explore Noida? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
  heroDescription:
    "Your next office should work for the people using it, not just look good in photographs. Find a workspace that fits the way your team works in Noida. Onward Workspaces helps businesses explore coworking space in Noida, furnished private offices and managed office solutions without the complexity of starting an office from scratch. Compare neighbourhoods, shortlist the right setting and arrange a tour before making a decision.",
  contactDescription:
    "From the institutional calm of Sector 4 to the expressway energy of Sector 126 and 132, our Noida centres put your team close to the city's biggest tech parks and best connected to Delhi NCR.",
  areas: [
    {
      slug: "sector-4",
      centres: 1,
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
      metaTitle: "Coworking Space in Sector 4, Noida | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Sector 4, Noida with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Sector 4, Noida? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Sector 4?", a: "Explore Onward Workspaces options in Sector 4, Noida and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Sector 4?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Sector 4?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        managed: {
          metaTitle: "Onward Workspaces Sector 4 Noida | Office Space in Sector 4, Noida",
          metaDescription:
            "Explore Onward Workspaces Sector 4 Noida in Sector 4, Noida. View workspace options, amenities and location details, and request a tailored quote or office",
          cta: "Schedule a Visit",
          h1: "Office space in Sector 4",
          body: "Explore Onward Workspaces' Custom built space in Sector 4, Noida. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "First Floor, A-110, Sector 4, Noida, Uttar Pradesh, 201301",
          connectivity: "Nearest metro station: Noida Sector 16",
          capacity: "900+ Seats",
          features: ["Custom Layout and IT", "Branded Workspace", "24/7 Access", "Power Backup"],
        },
      },
      h1: "Office space in Sector 4",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "900+ Seats" },
      },
      description:
        "Looking for coworking space in Sector 4 or a private office in Sector 4, Noida? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.3150!3d28.5850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f95d0f0f1%3A0x1234567894!2sSector+4%2C+Noida!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sector-126",
      centres: 1,
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
      metaTitle: "Coworking Space in Sector 126, Noida | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Sector 126, Noida with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      faqs: [
        { q: "Where can I find coworking space in Sector 126?", a: "Explore Onward Workspaces options in Sector 126, Noida and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Sector 126?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Sector 126?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      contactBody:
        "Ready to explore Sector 126, Noida? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      centreCopy: {
        coworking: {
          metaTitle: "Onward Workspaces Sector 126 Noida | Office Space in Sector 126, Noida",
          metaDescription:
            "Explore Onward Workspaces Sector 126 Noida in Sector 126, Noida. View workspace options, amenities and location details, and request a tailored quote or office",
          h1: "Office space in Sector 126",
          body: "Explore Onward Workspaces' coworking space in Sector 126, Noida. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "3rd and 4th Floor, Ace Studio, Plot No. 1B, Raipur Khadar, Sector 126, Noida, Uttar Pradesh, 201313",
          connectivity: "Near Noida Sector 142 Metro Station",
          capacity: "480+ Seats",
          features: ["Power Backup", "Meeting Rooms", "Pantry and Café Area", "Parking Available"],
        },
      },
      h1: "Office space in Sector 126",
      cardCopy: {
        coworking: { title: "Coworking Centre", subline: "480+ Seats" },
      },
      description:
        "Looking for coworking space in Sector 126 or a private office in Sector 126, Noida? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.0!2d77.3650!3d28.5050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f95d0f0f1%3A0x1234567895!2sSector+126%2C+Noida!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sector-132",
      centres: 1,
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
      metaTitle: "Coworking Space in Sector 132, Noida | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Sector 132, Noida with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Sector 132, Noida? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Sector 132?", a: "Explore Onward Workspaces options in Sector 132, Noida and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Sector 132?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Sector 132?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        managed: {
          metaTitle: "Onward Workspaces Sector 132 Noida | Office Space in Sector 132, Noida",
          metaDescription:
            "Explore Onward Workspaces Sector 132 Noida in Sector 132, Noida. View workspace options, amenities and location details, and request a tailored quote or office",
          cta: "Schedule a Visit",
          h1: "Office space in Sector 132",
          body: "Explore Onward Workspaces' Custom built space in Sector 132, Noida. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Floors 2, 3, 4, 7, 13, 14 and 15, ACE Capitol Tower 2, L-1, Noida-Greater Noida Expressway, Sector 132, Noida, Uttar Pradesh, 201304",
          connectivity: "Direct access to the Noida-Greater Noida Expressway",
          capacity: "3,300+ Seats",
          features: ["Large Team Floors", "Expressway Access", "Power Backup", "Custom Layout and IT"],
        },
      },
      h1: "Office space in Sector 132",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "3,300+ Seats" },
      },
      description:
        "Looking for coworking space in Sector 132 or a private office in Sector 132, Noida? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
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
  metaTitle: "Coworking Space in Gurgaon | Office Space | Onward",
  metaDescription:
    "Explore coworking space and office space in Gurgaon with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
  h1: "Office space in Gurgaon",
  centresHeading: "Explore Office Space Across Gurgaon",
  expect: delhiCity.expect,
  faqs: [
    { q: "Where can I find coworking space in Gurgaon?", a: "Explore Onward Workspaces options in Gurgaon and ask the team to confirm current availability and the exact property address." },
    { q: "Can I rent private office space in Gurgaon?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
    { q: "How much does office space cost in Gurgaon?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
    { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
    { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
  ],
  contactTitle: "Book a Workspace Tour or Request Pricing",
  contactHighlight: "Request Pricing",
  contactBody:
    "Ready to explore Gurgaon? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
  heroDescription:
    "Your next office should work for the people using it, not just look good in photographs. Find a workspace that fits the way your team works in Gurgaon. Onward Workspaces helps businesses explore coworking space in Gurgaon, furnished private offices and managed office solutions without the complexity of starting an office from scratch. Compare neighbourhoods, shortlist the right setting and arrange a tour before making a decision.",
  contactDescription:
    "From MG Road's commercial core to the corporate energy of Udyog Vihar and the growth corridor of Sohna Road, our Gurugram centres put your team where the Millennium City actually does business.",
  areas: [
    {
      slug: "mg-road",
      centres: 1,
      cardHeading: "M.G. Road",
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
      metaTitle: "Coworking Space in Mg Road, Gurgaon | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Mg Road, Gurgaon with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Mg Road, Gurgaon? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Mg Road?", a: "Explore Onward Workspaces options in Mg Road, Gurgaon and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Mg Road?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Mg Road?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        managed: {
          metaTitle: "Onward Workspaces MG road Gurgaon | Office Space in MG road, Gurgaon",
          metaDescription:
            "Explore Onward Workspaces MG road Gurgaon in MG road, Gurgaon. View workspace options, amenities and location details, and request a tailored quote or office",
          cta: "Schedule a Visit",
          h1: "Office space in MG road",
          body: "Explore Onward Workspaces' Custom built space in MG road, Gurgaon. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "10th Floor, CT2, Emaar MGF Capital Tower 1, Unit 10-003, Sikanderpur, Sector 26, Gurugram, Haryana, 122002",
          connectivity: "Close to Sikanderpur Metro Station",
          capacity: "350+ Seats",
          features: ["Custom Layout and IT", "Branded Workspace", "Premium Tower Address", "Power Backup"],
          contactBody:
            "Ready to explore MG road, Gurgaon? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
          faqs: [
            { q: "Where can I find coworking space in MG road?", a: "Explore Onward Workspaces options in MG road, Gurgaon and ask the team to confirm current availability and the exact property address." },
            { q: "Can I rent private office space in MG road?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
            { q: "How much does office space cost in MG road?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
            { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
            { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
          ],
        },
      },
      h1: "Office space in MG Road",
      cardCopy: {
        managed: { title: "Custom-Built Office", subline: "350+ Seats" },
      },
      description:
        "Looking for coworking space in Mg Road or a private office in Mg Road, Gurgaon? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0!2d77.0700!3d28.4780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567897!2sMG+Road%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "udyog-vihar",
      centres: 1,
      cardHeading: "Udyog Vihar Phase 4",
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
      metaTitle: "Coworking Space in Udyog Vihar, Gurgaon | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Udyog Vihar, Gurgaon with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Udyog Vihar, Gurgaon? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Udyog Vihar?", a: "Explore Onward Workspaces options in Udyog Vihar, Gurgaon and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Udyog Vihar?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Udyog Vihar?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        coworking: {
          metaTitle: "Onward Workspaces Udyog Vihar Gurgaon | Office Space in Udyog Vihar Phase 4, Gurgaon",
          metaDescription:
            "Explore Onward Workspaces Udyog Vihar Gurgaon in Udyog Vihar, Gurgaon. View workspace options, amenities and location details, and request a tailored quote or office",
          h1: "Office space in Udyog Vihar",
          body: "Explore Onward Workspaces' Coworking space in Udyog Vihar, Gurgaon. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Plot No. 27-28, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana, 122015",
          connectivity: "Near Sector 18 and DLF Phase IV, Udyog Vihar",
          capacity: "900+ Seats",
          features: ["Power Backup", "Meeting Rooms", "Pantry and Café Area", "Parking Available"],
        },
      },
      h1: "Office space in Udyog Vihar",
      cardCopy: {
        coworking: { title: "Coworking Space", subline: "900+ Seats" },
      },
      description:
        "Looking for coworking space in Udyog Vihar or a private office in Udyog Vihar, Gurgaon? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0!2d77.0800!3d28.4950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567898!2sUdyog+Vihar%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "sohna-road",
      centres: 1,
      cardHeading: "Sohna Road",
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
      metaTitle: "Coworking Space in Sohna Road, Gurgaon | Office Space | Onward",
      metaDescription:
        "Explore coworking space and office space in Sohna Road, Gurgaon with Onward Workspaces. Compare workspace options, request pricing and book a site visit.",
      contactBody:
        "Ready to explore Sohna Road, Gurgaon? Share your team size, budget, preferred move-in date and contact details. Onward Workspaces can help you shortlist a practical option and arrange a discussion.",
      faqs: [
        { q: "Where can I find coworking space in Sohna Road?", a: "Explore Onward Workspaces options in Sohna Road, Gurgaon and ask the team to confirm current availability and the exact property address." },
        { q: "Can I rent private office space in Sohna Road?", a: "Private office and managed office configurations may be available depending on the location and current inventory. Request a proposal for your team size." },
        { q: "How much does office space cost in Sohna Road?", a: "Pricing depends on seating, layout, contract length, amenities and availability. Request a written quotation for current rates." },
        { q: "Can I visit the workspace before booking?", a: "Yes. Submit a tour request and confirm a suitable visit time with the Onward Workspaces team." },
        { q: "What should I check before signing?", a: "Review the complete inclusions list, deposit, lock-in, notice period, access hours, connectivity and meeting room policy." },
      ],
      centreCopy: {
        coworking: {
          metaTitle: "Onward Workspaces Sohna Road Gurgaon | Office Space in Sohna Road, Gurgaon",
          metaDescription:
            "Explore Onward Workspaces Sohna Road Gurgaon in Sohna Road, Gurgaon. View workspace options, amenities and location details, and request a tailored quote or office",
          h1: "Office space in Sohna Road",
          body: "Explore Onward Workspaces' Coworking space in Sohna Road, Gurgaon. If you need an office that supports focused work, team collaboration and professional client meetings, start by sharing your headcount, preferred move-in date and desired layout. Our team can confirm available inventory, exact address, amenities and current commercial terms.",
          address: "Capital Business Park, Badshahpur, Sohna Road, Sector 48, Gurugram, Haryana, 122018",
          connectivity: "On the Sohna Road corridor, Gurugram",
          capacity: "700+ Seats",
          features: ["Power Backup", "Meeting Rooms", "Pantry and Café Area", "Parking Available"],
        },
      },
      h1: "Office space in Sohna Road",
      cardCopy: {
        coworking: { title: "Coworking Space", subline: "700+ Seats" },
      },
      description:
        "Looking for coworking space in Sohna Road or a private office in Sohna Road, Gurgaon? Onward Workspaces helps growing teams assess practical workspace options in this business district. Review how many seats you need, the level of privacy you prefer and the facilities required for your day-to-day operations, then request a location-specific proposal.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.0!2d77.0400!3d28.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d3b0b0b0b1%3A0x1234567899!2sSohna+Road%2C+Gurugram!5e0!3m2!1sen!2sin!4v1",
    },
  ],
};

export const allCities: CityData[] = [delhiCity, noidaCity, gurgaonCity];

export function getCityBySlug(slug: string): CityData | undefined {
  return allCities.find((c) => c.slug === slug);
}
