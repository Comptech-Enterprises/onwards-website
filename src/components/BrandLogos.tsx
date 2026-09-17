import React from "react";

export function RazorpayLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M23.6 2.5L7.2 33.5H0.5L14.8 6.5H6.2L9.5 2.5H23.6Z"
        fill="#0C2340"
      />
      <path
        d="M17.4 14.5L12.8 23.2H19.5L17.2 27.5H8.2L16.2 12.2L20.8 12.2L17.4 14.5Z"
        fill="#0284C7"
      />
      <text
        x="32"
        y="25"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="21"
        letterSpacing="-0.5px"
        fill="#0C2340"
      >
        Razorpay
      </text>
    </svg>
  );
}

export function JioLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 85 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="18" cy="18" r="17" fill="#0A3A82" />
      {/* J */}
      <path
        d="M12.5 10.5H15.5V21C15.5 22.8 14.2 24.2 12 24.2C10.5 24.2 9.2 23.5 8.6 22.5L10.2 21.2C10.6 21.8 11.2 22.2 12 22.2C12.8 22.2 13.5 21.6 13.5 20.8V10.5H12.5Z"
        fill="white"
      />
      {/* Dot of i */}
      <circle cx="18.5" cy="12" r="1.4" fill="white" />
      {/* i stem */}
      <rect x="17.2" y="15" width="2.6" height="9.2" rx="0.5" fill="white" />
      {/* o */}
      <circle cx="25.5" cy="19.5" r="4.6" stroke="white" strokeWidth="2.4" />
      <text
        x="42"
        y="24"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="0.5px"
        fill="#0A3A82"
      >
        Jio
      </text>
    </svg>
  );
}

export function AramexLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="2"
        y="25"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="24"
        letterSpacing="-0.5px"
        fill="#E31837"
      >
        aramex
      </text>
    </svg>
  );
}

export function BcgLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="0"
        y="24"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="1px"
        fill="#005B38"
      >
        BCG
      </text>
      <text
        x="60"
        y="17"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="7.5"
        letterSpacing="0.8px"
        fill="#005B38"
      >
        BOSTON
      </text>
      <text
        x="60"
        y="25"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="7.5"
        letterSpacing="0.8px"
        fill="#005B38"
      >
        CONSULTING
      </text>
    </svg>
  );
}

export function LvmhLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="4"
        y="20"
        fontFamily="Didot, 'Bodoni MT', 'Times New Roman', serif"
        fontWeight="700"
        fontSize="19"
        letterSpacing="4px"
        fill="#1A1A2E"
      >
        LVMH
      </text>
      <text
        x="5"
        y="28"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize="5.5"
        letterSpacing="1.2px"
        fill="#64748B"
      >
        MOËT HENNESSY LOUIS VUITTON
      </text>
    </svg>
  );
}

export function BacardiLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bat Crest Disc */}
      <circle cx="18" cy="18" r="16" fill="#D32F2F" />
      <circle cx="18" cy="18" r="14" fill="#1A1A1A" />
      {/* Bat silhouette */}
      <path
        d="M18 10C17 12 14 13.5 11 13C12.5 15 14 17 12 21C14 20 16 19 18 22C20 19 22 20 24 21C22 17 23.5 15 25 13C22 13.5 19 12 18 10Z"
        fill="#D32F2F"
      />
      <text
        x="42"
        y="24"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="2.5px"
        fill="#1A1A1A"
      >
        BACARDÍ
      </text>
    </svg>
  );
}

export function PernodRicardLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Compass Star Monogram */}
      <circle cx="16" cy="18" r="14" fill="#00205B" />
      <path
        d="M16 7L18.5 15.5L27 18L18.5 20.5L16 29L13.5 20.5L5 18L13.5 15.5L16 7Z"
        fill="#D4AF37"
      />
      <circle cx="16" cy="18" r="3" fill="#00205B" />
      <text
        x="38"
        y="19"
        fontFamily="Georgia, serif"
        fontWeight="800"
        fontSize="14"
        letterSpacing="0.5px"
        fill="#00205B"
      >
        Pernod Ricard
      </text>
      <text
        x="38"
        y="27"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="6"
        letterSpacing="2px"
        fill="#D4AF37"
      >
        CRÉATEURS DE CONVIVIALITÉ
      </text>
    </svg>
  );
}

export function ItcLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="18,6 32,30 4,30" fill="#0A3A82" />
      <polygon points="18,11 28,28 8,28" fill="#F8FAFC" />
      <text
        x="18"
        y="25"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="900"
        fontSize="10"
        fill="#0A3A82"
      >
        ITC
      </text>
      <text
        x="40"
        y="20"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="800"
        fontSize="14"
        letterSpacing="0.5px"
        fill="#0A3A82"
      >
        ITC Limited
      </text>
      <text
        x="41"
        y="27"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="6.5"
        letterSpacing="1px"
        fill="#C59B27"
      >
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

export function ThermaxLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Thermax Flame Emblem */}
      <path
        d="M10 8C14 12 18 16 18 22C18 26 15 29 11 29C7 29 4 26 4 22C4 16 8 12 10 8Z"
        fill="#E53935"
      />
      <path
        d="M16 14C19 17 21 20 21 24C21 27 19 29 16 29C13 29 11 27 11 24C11 20 14 17 16 14Z"
        fill="#0288D1"
      />
      <text
        x="30"
        y="24"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="19"
        letterSpacing="0.8px"
        fill="#1E293B"
      >
        THERMAX
      </text>
    </svg>
  );
}

export function RadicoLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="18" r="13" stroke="#854D0E" strokeWidth="1.5" />
      <polygon points="16,9 18.5,15 25,15 20,19 22,25 16,21 10,25 12,19 7,15 13.5,15" fill="#854D0E" />
      <text
        x="36"
        y="19"
        fontFamily="Georgia, serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.5px"
        fill="#1E293B"
      >
        Radico Khaitan
      </text>
      <text
        x="37"
        y="27"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="6"
        letterSpacing="2px"
        fill="#854D0E"
      >
        SINCE 1943
      </text>
    </svg>
  );
}

export function DangalGamesLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="dangalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="24" rx="6" fill="url(#dangalGrad)" />
      <path
        d="M12 12H17C19.5 12 21.5 14 21.5 16.5V19.5C21.5 22 19.5 24 17 24H12V12ZM15 21H16.8C17.8 21 18.5 20.2 18.5 19.2V16.8C18.5 15.8 17.8 15 16.8 15H15V21Z"
        fill="white"
      />
      <text
        x="34"
        y="20"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="13.5"
        letterSpacing="0.5px"
        fill="#0F172A"
      >
        DANGAL
      </text>
      <text
        x="35"
        y="28"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="8"
        letterSpacing="2.5px"
        fill="#DC2626"
      >
        GAMES
      </text>
    </svg>
  );
}

export function StarWorldLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 145 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="15,6 18,13 25,14 20,19 21.5,26 15,22 8.5,26 10,19 5,14 12,13" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
      <text
        x="32"
        y="19"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="1px"
        fill="#0F172A"
      >
        STAR WORLD
      </text>
      <text
        x="33"
        y="27"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="6.5"
        letterSpacing="2px"
        fill="#64748B"
      >
        ENTERTAINMENT
      </text>
    </svg>
  );
}

export const brandPartners = [
  { name: "Razorpay", Logo: RazorpayLogo },
  { name: "Reliance Jio", Logo: JioLogo },
  { name: "Aramex", Logo: AramexLogo },
  { name: "Boston Consulting Group", Logo: BcgLogo },
  { name: "LVMH", Logo: LvmhLogo },
  { name: "Bacardi", Logo: BacardiLogo },
  { name: "Pernod Ricard", Logo: PernodRicardLogo },
  { name: "ITC Hotels", Logo: ItcLogo },
  { name: "Thermax", Logo: ThermaxLogo },
  { name: "Radico Khaitan", Logo: RadicoLogo },
  { name: "Dangal Games", Logo: DangalGamesLogo },
  { name: "Star World", Logo: StarWorldLogo },
];
