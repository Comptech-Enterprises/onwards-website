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
  gallery: string[];
  description: string;
}

export interface CityData {
  slug: string;
  name: string;
  basePath: string;
  heroImage: string;
  heroDescription: string;
  contactDescription: string;
  areas: AreaDetail[];
}

export const delhiCity: CityData = {
  slug: "delhi",
  name: "Delhi",
  basePath: "/locations/delhi",
  heroImage: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/cities/1790613615409.webp",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719861.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720403.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720474.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720553.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613720620.webp",
      ],
      description:
        "Step into the dynamic realm of Okhla Phase 2, where Onward Workspaces invites you to experience a workspace like no other. Nestled amidst the industrial and commercial vibrancy of South Delhi, this centre blends modernity with a touch of local charm, backed by collaborative spaces, ergonomic design, and a thriving business community.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790287.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790382.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790526.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790610.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790666.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613791008.webp",
      ],
      description:
        "Okhla Phase 3 is synonymous with innovation and technological advancement. This industrial zone is home to a multitude of IT companies, creative agencies, and research institutions. Onward's centre here offers shared office spaces designed to foster creativity and collaboration, with a focus on modern amenities and a conducive work environment.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613881869.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882593.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882635.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882693.webp",
      ],
      description:
        "Escape the hustle and bustle without compromising on professionalism at Onward's Mohan Cooperative centre. This coworking space offers a serene retreat for those seeking a tranquil work environment, imagined amidst lush greenery and modern amenities where the balance between focus and relaxation is seamlessly achieved.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882809.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613882975.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613883015.webp",
      ],
      description:
        "Discover the best coworking space in Connaught Place, Delhi's most iconic central business district. State-of-the-art design meets easy accessibility from the metro, built and designed for teams of all sizes who want a landmark address at the heart of the city.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971152.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971190.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971604.webp",
      ],
      description:
        "A well-connected West Delhi address, Onward's Janakpuri centre offers accessible coworking for local teams, freelancers, and startups alike, with the same hospitality-driven standards as every Onward space across the city.",
    },
  ],
};

export const noidaCity: CityData = {
  slug: "noida",
  name: "Noida",
  basePath: "/locations/noida",
  heroImage: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/cities/1790613615668.webp",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971633.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971749.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971768.webp",
      ],
      description:
        "A well-established institutional pocket, Sector 4 gives your team a managed office floor close to Noida's key civic and administrative hubs, with the operational backbone to run enterprise-grade teams from day one.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613971906.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615093212.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615093986.webp",
      ],
      description:
        "An expressway tech corridor lined with IT parks, Sector 126 is home to our most vibrant coworking community — custom-fitted for MNC headquarters and high-growth pods alike, with direct expressway access.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615094214.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615094332.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615095013.webp",
      ],
      description:
        "A growing enterprise expressway address, Sector 132 offers sprawling managed floors built for scale, with bespoke branding options and biometric-secured private entrances for larger teams.",
    },
  ],
};

export const gurgaonCity: CityData = {
  slug: "gurgaon",
  name: "Gurugram",
  basePath: "/locations/gurgaon",
  heroImage: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/cities/1790613615802.webp",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615095108.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615095275.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615095509.webp",
      ],
      description:
        "Gurugram's original commercial spine, MG Road puts your managed office floor in the heart of the city's oldest business district, directly connected to the Rapid Metro.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615777181.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615777320.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615777778.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615778033.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615778333.webp",
      ],
      description:
        "A strategic industrial-turned-corporate arterial hub, Udyog Vihar is home to our thriving coworking community, minutes from Cyber City with a direct link to the airport.",
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
      img: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615850595.webp",
      gallery: [
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615850895.webp",
        "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790615851077.webp",
      ],
      description:
        "A fast-growing corridor on the edge of the city, Sohna Road offers flexible coworking suites and collaborative open commons, built for teams that want room to grow.",
    },
  ],
};

export const allCities: CityData[] = [delhiCity, noidaCity, gurgaonCity];

export function getCityBySlug(slug: string): CityData | undefined {
  return allCities.find((c) => c.slug === slug);
}
