export interface AreaDetail {
  slug: string;
  name: string;
  type: string;
  address: string;
  seats: string;
  transit: string;
  highlight: string;
  features: string[];
  img: string;
  mapPopupImg?: string;
  gallery: string[];
  clients?: string[];
  description: string;
  mapEmbed?: string;
}

export interface CityData {
  slug: string;
  name: string;
  basePath: string;
  heroImage: string;
  whyChooseImage?: string;
  heroDescription: string;
  contactDescription: string;
  areas: AreaDetail[];
}

export const delhiCity: CityData = {
  slug: "delhi",
  name: "Delhi",
  basePath: "/locations/delhi",
  heroImage: "/images/redesigned/locations/delhi/top-section-hero-image-managed-office-space-in-delhi.png",
  whyChooseImage: "/images/redesigned/locations/delhi/why-choose-onward-for-your-workspace-in-delhi.png",
  heroDescription:
    "Delhi continues to be one of India's leading business hubs, attracting enterprises, startups, and high-growth companies across sectors. As teams expand their footprint in the city, Onward brings coworking spaces that support flexibility, scalability, and seamless metro connectivity across key commercial districts.",
  contactDescription:
    "From Connaught Place's CBD energy to the industrial hum of Okhla, our 5 Delhi centres put your team on the metro line, near your clients, and inside a workspace built for how the city actually works.",
  areas: [
    {
      slug: "okhla-phase-2",
      name: "Okhla Phase 2",
      type: "Managed Space + Coworking",
      address: "Okhla Industrial Area Phase II, South Delhi",
      seats: "500+ Desks",
      transit: "3 min to Harkesh Nagar Okhla Metro",
      highlight: "Scalable Enterprise Campuses & Turnkey Layouts",
      features: ["Large Team Suites", "Loading Bay", "High-Power Backup", "Gaming Zone"],
      img: "/images/redesigned/locations/delhi/centres-in-delhi/okhla-phasee-2.png",
      mapPopupImg: "/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/okhla-phase-3-1.png",
      gallery: [
        "/images/okhla-phase-2/office-gallery/1.png",
        "/images/okhla-phase-2/office-gallery/2.png",
        "/images/okhla-phase-2/office-gallery/3.png",
        "/images/okhla-phase-2/office-gallery/4.png",
        "/images/okhla-phase-2/office-gallery/5.png",
        "/images/okhla-phase-2/office-gallery/6.png",
        "/images/okhla-phase-2/office-gallery/7.png",
      ],
      clients: [
        "/images/okhla-phase-2/clients/1.png",
        "/images/okhla-phase-2/clients/2.png",
        "/images/okhla-phase-2/clients/3.png",
      ],
      description:
        "Step into the dynamic realm of Okhla Phase 2, where Onward Workspaces invites you to experience a workspace like no other. Nestled amidst the industrial and commercial vibrancy of South Delhi, this centre blends modernity with a touch of local charm, backed by collaborative spaces, ergonomic design, and a thriving business community.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8!2d77.2716!3d28.5312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567890!2sOkhla+Phase+2%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "okhla-phase-3",
      name: "Okhla Phase 3",
      type: "Managed Space + Coworking",
      address: "Okhla Industrial Area Phase III, South Delhi",
      seats: "900+ Desks",
      transit: "5 min to Govind Puri Metro Station",
      highlight: "Custom-Fitted Enterprise Floors & Collaborative Studios",
      features: ["Dedicated Server Room", "Cafeteria", "24/7 Security", "Ample Parking"],
      img: "/images/redesigned/locations/delhi/centres-in-delhi/okhla-phase-3.png",
      mapPopupImg: "/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/okhla-phase-3.png",
      gallery: [
        "/images/okhla-phase-3/gallery-images/1.png",
        "/images/okhla-phase-3/gallery-images/2.png",
        "/images/okhla-phase-3/gallery-images/3.png",
        "/images/okhla-phase-3/gallery-images/4.png",
        "/images/okhla-phase-3/gallery-images/5.png",
        "/images/okhla-phase-3/gallery-images/6.png",
        "/images/okhla-phase-3/gallery-images/7.png",
      ],
      clients: [
        "/images/okhla-phase-3/clients/4.png",
        "/images/okhla-phase-3/clients/5.png",
        "/images/okhla-phase-3/clients/6.png",
        "/images/okhla-phase-3/clients/7.png",
        "/images/okhla-phase-3/clients/9.png",
        "/images/okhla-phase-3/clients/10.png",
      ],
      description:
        "Okhla Phase 3 is synonymous with innovation and technological advancement. This industrial zone is home to a multitude of IT companies, creative agencies, and research institutions. Onward's centre here offers shared office spaces designed to foster creativity and collaboration, with a focus on modern amenities and a conducive work environment.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.2!2d77.2750!3d28.5250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567891!2sOkhla+Phase+3%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "mohan-cooperative",
      name: "Mohan Cooperative",
      type: "Coworking",
      address: "Mohan Cooperative Industrial Estate, Mathura Road, New Delhi",
      seats: "600+ Desks",
      transit: "Direct Access from Mohan Estate Metro",
      highlight: "Grand Atrium Offices & Logistics-Connected Suites",
      features: ["National Highway Access", "Ample Parking", "Terrace Garden", "High-Speed WiFi"],
      img: "/images/redesigned/locations/delhi/centres-in-delhi/mohan-cooperative.png",
      mapPopupImg: "/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/mohan-cooperative.png",
      gallery: [
        "/images/delhi/our-spaces-in-delhi-ncr/mohan-estate.jpg",
        "/images/delhi/office-space-solutions/img-0508-1.jpg",
        "/images/delhi/office-space-solutions/img-0527.jpg",
        "/images/delhi/office-space-solutions/img-0568-4.jpg",
      ],
      description:
        "Escape the hustle and bustle without compromising on professionalism at Onward's Mohan Cooperative centre. This coworking space offers a serene retreat for those seeking a tranquil work environment, imagined amidst lush greenery and modern amenities where the balance between focus and relaxation is seamlessly achieved.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.5!2d77.2800!3d28.5180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e1a4b0b0b1%3A0x1234567892!2sMohan+Cooperative+Industrial+Estate%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "connaught-place",
      name: "Connaught Place",
      type: "Coworking",
      address: "Outer Circle & Barakhamba Road, Connaught Place, New Delhi",
      seats: "550+ Desks",
      transit: "2 min walk to Rajiv Chowk Metro",
      highlight: "CBD Landmark with Executive Boardrooms & Private Suites",
      features: ["Valet Parking", "24/7 Access", "Executive Boardrooms", "Cafeteria Lounge"],
      img: "/images/redesigned/locations/delhi/centres-in-delhi/connaught-place.png",
      mapPopupImg: "/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/connaught-place.png",
      gallery: [
        "/images/delhi/delhi-cp.png",
        "/images/delhi/our-spaces-in-delhi-ncr/okhla-phase-2-44.jpg",
        "/images/delhi/our-spaces-in-delhi-ncr/okhla-phase-3-41.jpg",
      ],
      description:
        "Discover the best coworking space in Connaught Place, Delhi's most iconic central business district. State-of-the-art design meets easy accessibility from the metro, built and designed for teams of all sizes who want a landmark address at the heart of the city.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.2170!3d28.6320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught+Place%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1",
    },
    {
      slug: "janakpuri",
      name: "Janakpuri",
      type: "Coworking",
      address: "District Centre, Janakpuri, West Delhi",
      seats: "300+ Desks",
      transit: "Direct Access from Janakpuri West Metro Station",
      highlight: "Accessible West Delhi Hub for Local Teams & Startups",
      features: ["Metro-Adjacent", "Flexible Lease Terms", "High-Speed WiFi", "Meeting Credits"],
      img: "/images/redesigned/locations/delhi/centres-in-delhi/janakpuri.png",
      mapPopupImg: "/images/redesigned/locations/delhi/map-pop-ups-micro-markets-in-delhi/janakpuri.png",
      gallery: [
        "/images/delhi/our-spaces-in-delhi-ncr/okhla-phse-3-20.jpg",
        "/images/delhi/our-spaces-in-delhi-ncr/okhla-phase-3-41.jpg",
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
  heroImage: "/images/redesigned/locations/noida/top-section-hero-image-managed-office-space-in-noida.png",
  whyChooseImage: "/images/redesigned/locations/noida/why-choose-onward-for-your-workspace-in-noida.png",
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
      img: "/images/redesigned/locations/noida/centres-in-noida/sector-4.png",
      mapPopupImg: "/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-4.png",
      gallery: [
        "/images/noida/img-0364.jpg",
        "/images/noida/img-0367.jpg",
        "/images/noida/1-1.png",
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
      img: "/images/redesigned/locations/noida/centres-in-noida/sector-126.png",
      mapPopupImg: "/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-126.png",
      gallery: [
        "/images/noida/img-0331-1.jpg",
        "/images/noida/img-0336.jpg",
        "/images/noida/img-0387.jpg",
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
      img: "/images/redesigned/locations/noida/centres-in-noida/sector-132.png",
      mapPopupImg: "/images/redesigned/locations/noida/map-pop-ups-micro-markets-in-noida/sector-132.png",
      gallery: [
        "/images/noida/9bdc3c13-14d9-4de0-a660-540a03adf91e.png",
        "/images/noida/img-0387.jpg",
        "/images/noida/img-0364.jpg",
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
  heroImage: "/images/redesigned/locations/gurgaon/top-section-hero-image-managed-office-space-in-gurgaon.png",
  whyChooseImage: "/images/redesigned/locations/gurgaon/why-choose-onward-for-your-workspace-in-gurgaon.png",
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
      img: "/images/redesigned/locations/gurgaon/centres-in-gurgaon/mg-road.png",
      mapPopupImg: "/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/mg-road.png",
      gallery: [
        "/images/mg-road/dsc04206.jpg",
        "/images/mg-road/img-4113-1.jpg",
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
      img: "/images/redesigned/locations/gurgaon/centres-in-gurgaon/udyog-vihar.png",
      mapPopupImg: "/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/udyog-vihar.png",
      gallery: [
        "/images/udyog-vihar/img-0504.jpg",
        "/images/udyog-vihar/img-0508-1.jpg",
        "/images/udyog-vihar/img-0527.jpg",
        "/images/udyog-vihar/img-0568-4.jpg",
        "/images/udyog-vihar/img-0577-2.jpg",
        "/images/udyog-vihar/img-0740.jpg",
        "/images/udyog-vihar/img-0753.jpg",
        "/images/udyog-vihar/img-0775.jpg",
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
      img: "/images/redesigned/locations/gurgaon/centres-in-gurgaon/sohna-road.png",
      mapPopupImg: "/images/redesigned/locations/gurgaon/map-pop-ups-micro-markets-in-gurgaon/sohna-road.png",
      gallery: [
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-51-31-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-51-51-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-52-07-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-52-16-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-52-33-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-53-02-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-53-16-am-1.png",
        "/images/sohna-road-3ds/screenshot-2026-08-01-at-11-53-50-am-1.png",
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
