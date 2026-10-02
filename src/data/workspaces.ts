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
  slug: string;
}

export function getWorkspacesForArea(area: AreaDetail): WorkspaceUnit[] {
  const isBoth =
    area.type.toLowerCase().includes("managed") &&
    area.type.toLowerCase().includes("coworking");
  const isManagedOnly =
    area.type.toLowerCase().includes("managed") && !isBoth;

  if (isBoth) {
    return [
      {
        id: `${area.slug}-managed`,
        badge: "MANAGED OFFICE",
        category: "managed",
        title: `Onward ${area.name} — Managed Office`,
        tagline: "Enterprise workspace for growing teams.",
        seats: area.seats || "500+ Seats",
        transit: area.transit || "3 min from Harkesh Nagar Okhla Metro",
        img: area.img,
        slug: area.slug,
      },
      {
        id: `${area.slug}-coworking`,
        badge: "COWORKING",
        category: "coworking",
        title: `Onward ${area.name} — Coworking Space`,
        tagline: "Flexible desks and collaborative zones for agile teams.",
        seats: "250+ Desks",
        transit: area.transit || "3 min from Metro Station",
        img: area.gallery?.[0] || area.img,
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
        img: area.img,
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
      img: area.img,
      slug: area.slug,
    },
  ];
}
