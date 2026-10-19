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
  centreKey: string;
  copy?: import("@/data/locations").CentreCopy;
  cardTitle?: string;
  cardSubline?: string;
  cardTag?: "h2" | "h3";
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
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/managed-space.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/managed-space-banner-centre-page.webp",
    },
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-2-page/coworking-banner-centre-page.webp",
    },
  },
  "okhla-phase-3": {
    managed: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/managed-space-1.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/managed-space-1-banner-centre-page.webp",
    },
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/okhla-phase-3-page/coworking-banner-centre-page.webp",
    },
  },
  "mohan-estate": {
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/mohan-cooperative-page/coworking-banner-centre-page.webp",
    },
  },
  "connaught-place": {
    managed: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/managed-space.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/managed-space-banner-centre-page.webp",
    },
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/connaught-place-page/coworking-banner-centre-page.webp",
    },
  },
  "janakpuri": {
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/delhi/janakpuri-page/coworking-banner-centre-page.webp",
    },
  },
  "noida-sector-4": {
    managed: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/managed-space.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-4-page/managed-space-banner-centre-page.webp",
    },
  },
  "noida-sector-126": {
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-126-page/coworking-banner-centre-page.webp",
    },
  },
  "noida-sector-132": {
    managed: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/managed-space.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/noida/sector-132-page/managed-space-banner-centre-page.webp",
    },
  },
  "mg-road": {
    managed: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/managed-space.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/mg-road-page/managed-space-banner-centre-page.webp",
    },
  },
  "udyog-vihar": {
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/udyog-vihar-phase-4-page/coworking-banner-centre-page.webp",
    },
  },
  "sohna-road": {
    coworking: {
      img: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/coworking.webp",
      banner: "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/locations/gurgaon/sohna-road-page/coworking-banner-centre-page.webp",
    },
  },
};

export function getWorkspacesForArea(area: AreaDetail): WorkspaceUnit[] {
  const base = getBaseWorkspaces(area).map((w) => ({ ...w, centreKey: w.category as string }));
  const first = base.find((w) => w.category === "managed");
  if (area.secondManaged && first) {
    base.splice(base.indexOf(first) + 1, 0, {
      ...first,
      id: `${area.slug}-managed-2`,
      centreKey: "managed-2",
    });
  }
  return base.map((w) => {
    const card = area.cardCopy?.[w.category];
    const baseCopy = area.centreCopy?.[w.category];
    const copy = baseCopy && w.centreKey === "managed-2" ? { ...baseCopy, ...area.secondManaged } : baseCopy;
    return { ...w, centreKey: copy?.slug ?? w.centreKey, ...(card ? { cardTitle: card.title, cardSubline: card.subline, cardTag: card.tag } : {}), ...(copy ? { copy } : {}) };
  });
}

function getBaseWorkspaces(area: AreaDetail): Omit<WorkspaceUnit, "centreKey">[] {
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
