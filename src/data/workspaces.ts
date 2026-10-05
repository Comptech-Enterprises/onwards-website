import type { AreaDetail } from "@/data/locations";

export interface WorkspaceUnit {
  id: string;
  badge: "MANAGED OFFICE" | "COWORKING" | "ENTERPRISE SUITE";
  category: "managed" | "coworking";
  title: string;
  tagline: string;
  seats: string;
  transit: string;
  img: string;
  bannerImg?: string;
  slug: string;
}

const areaWorkspaceAssetMap: Record<
  string,
  {
    managed?: { img: string; banner: string };
    coworking?: { img: string; banner: string };
  }
> = {
  "okhla-phase-2": {
    managed: {
      img: "/images/redesigned/locations/delhi/okhla-phase-2-page/managed-space.webp",
      banner: "/images/redesigned/locations/delhi/okhla-phase-2-page/managed-space-banner-centre-page.webp",
    },
    coworking: {
      img: "/images/redesigned/locations/delhi/okhla-phase-2-page/coworking.webp",
      banner: "/images/redesigned/locations/delhi/okhla-phase-2-page/coworking-banner-centre-page.webp",
    },
  },
  "okhla-phase-3": {
    managed: {
      img: "/images/redesigned/locations/delhi/okhla-phase-3-page/managed-space-1.webp",
      banner: "/images/redesigned/locations/delhi/okhla-phase-3-page/managed-space-1-banner-centre-page.webp",
    },
    coworking: {
      img: "/images/redesigned/locations/delhi/okhla-phase-3-page/coworking.webp",
      banner: "/images/redesigned/locations/delhi/okhla-phase-3-page/coworking-banner-centre-page.webp",
    },
  },
  "mohan-cooperative": {
    coworking: {
      img: "/images/redesigned/locations/delhi/mohan-cooperative-page/coworking.webp",
      banner: "/images/redesigned/locations/delhi/mohan-cooperative-page/coworking-banner-centre-page.webp",
    },
  },
  "connaught-place": {
    managed: {
      img: "/images/redesigned/locations/delhi/connaught-place-page/managed-space.webp",
      banner: "/images/redesigned/locations/delhi/connaught-place-page/managed-space-banner-centre-page.webp",
    },
    coworking: {
      img: "/images/redesigned/locations/delhi/connaught-place-page/coworking.webp",
      banner: "/images/redesigned/locations/delhi/connaught-place-page/coworking-banner-centre-page.webp",
    },
  },
  "janakpuri": {
    coworking: {
      img: "/images/redesigned/locations/delhi/janakpuri-page/coworking.webp",
      banner: "/images/redesigned/locations/delhi/janakpuri-page/coworking-banner-centre-page.webp",
    },
  },
  "sector-4": {
    managed: {
      img: "/images/redesigned/locations/noida/sector-4-page/managed-space.webp",
      banner: "/images/redesigned/locations/noida/sector-4-page/managed-space-banner-centre-page.webp",
    },
  },
  "sector-126": {
    coworking: {
      img: "/images/redesigned/locations/noida/sector-126-page/coworking.webp",
      banner: "/images/redesigned/locations/noida/sector-126-page/coworking-banner-centre-page.webp",
    },
  },
  "sector-132": {
    managed: {
      img: "/images/redesigned/locations/noida/sector-132-page/managed-space.webp",
      banner: "/images/redesigned/locations/noida/sector-132-page/managed-space-banner-centre-page.webp",
    },
  },
  "mg-road": {
    managed: {
      img: "/images/redesigned/locations/gurgaon/mg-road-page/managed-space.webp",
      banner: "/images/redesigned/locations/gurgaon/mg-road-page/managed-space-banner-centre-page.webp",
    },
  },
  "udyog-vihar": {
    coworking: {
      img: "/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/coworking.webp",
      banner: "/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/coworking-banner-centre-page.webp",
    },
  },
  "sohna-road": {
    coworking: {
      img: "/images/redesigned/locations/gurgaon/sohna-road-page/coworking.webp",
      banner: "/images/redesigned/locations/gurgaon/sohna-road-page/coworking-banner-centre-page.webp",
    },
  },
};

export function getWorkspacesForArea(area: AreaDetail): WorkspaceUnit[] {
  const isBoth =
    area.type.toLowerCase().includes("managed") &&
    area.type.toLowerCase().includes("coworking");
  const isManagedOnly =
    area.type.toLowerCase().includes("managed") && !isBoth;

  const assets = areaWorkspaceAssetMap[area.slug] || {};

  if (isBoth) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Enterprise workspace for growing teams.",
        seats: area.seats || "500+ Seats",
        transit: area.transit || "Near Metro Station",
        img: assets.managed?.img || area.img,
        bannerImg: assets.managed?.banner || area.heroBanner || area.img,
        slug: area.slug,
      },
      {
        id: `${area.slug}-coworking`,
        badge: "COWORKING",
        category: "coworking",
        title: `Onward ${area.name} — Coworking Space`,
        tagline: "Flexible desks and collaborative zones for agile teams.",
        seats: "250+ Desks",
        transit: area.transit || "Near Metro Station",
        img: assets.coworking?.img || area.gallery?.[0] || area.img,
        bannerImg: assets.coworking?.banner || area.heroBanner || area.img,
        slug: area.slug,
      },
    ];
  }

  if (isManagedOnly) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Custom-fitted enterprise floors with dedicated management.",
        seats: area.seats || "400+ Seats",
        transit: area.transit || "Near Metro Station",
        img: assets.managed?.img || area.img,
        bannerImg: assets.managed?.banner || area.heroBanner || area.img,
        slug: area.slug,
      },
    ];
  }

  return [
    {
      id: `${area.slug}-coworking`,
      badge: "COWORKING",
      category: "coworking",
      title: `Onward ${area.name} — Coworking Space`,
      tagline: "Dynamic community hub with premium shared amenities.",
      seats: area.seats || "350+ Seats",
      transit: area.transit || "Near Metro Station",
      img: assets.coworking?.img || area.img,
      bannerImg: assets.coworking?.banner || area.heroBanner || area.img,
      slug: area.slug,
    },
  ];
}
