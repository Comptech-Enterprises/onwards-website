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

export function DpWorldLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M80 12C92 12 102 20 102 31C102 37 98 42 92 45C86 48 76 49 68 47C58 45 52 38 52 32C52 24 60 17 72 15C76 14 82 14 86 16"
        stroke="#E6007E"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 38C60 46 70 54 82 54C94 54 104 46 104 38C104 34 100 30 94 28"
        stroke="#00A3A6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <text
        x="80"
        y="72"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="15"
        letterSpacing="2px"
        fill="#0A1E4A"
      >
        DP WORLD
      </text>
    </svg>
  );
}

export function ClarksonsLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(4, 11)">
        <path d="M0 4C4 1 8 7 12 4C16 1 20 7 24 4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0 10C4 7 8 13 12 10C16 7 20 13 24 10" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0 16C4 13 8 19 12 16C16 13 20 19 24 16" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0 22C4 19 8 25 12 22C16 19 20 25 24 22" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="7" y="6" width="10" height="15" rx="2" fill="white" />
        <text x="12" y="18" textAnchor="middle" fill="#DC2626" fontFamily="sans-serif" fontWeight="900" fontSize="11">C</text>
      </g>
      <text
        x="38"
        y="30"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="16.5"
        letterSpacing="1px"
        fill="#DC2626"
      >
        CLARKSONS
      </text>
    </svg>
  );
}

export function ThermaxGridLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 75" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="23" y="4" width="64" height="15" rx="1.5" fill="#E31837" />
      <rect x="35" y="19" width="16" height="36" rx="1.5" fill="#E31837" />
      <rect x="59" y="19" width="16" height="36" rx="1.5" fill="#E31837" />
      <text
        x="55"
        y="70"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="1.2px"
        fill="#111827"
      >
        THERMAX
      </text>
    </svg>
  );
}

export function OpraahLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="25" r="14" fill="#F36F21" />
      <circle cx="28" cy="25" r="6" fill="white" />
      <text
        x="45"
        y="33"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.5px"
        fill="#F36F21"
      >
        praah
      </text>
    </svg>
  );
}

export function SageLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(10, 12)">
        <path
          d="M18 4C10 4 5 8 5 13C5 18 10 20 17 22C24 24 28 27 28 32C28 38 21 41 12 41C5 41 0 37 0 37"
          stroke="#001E62"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <text
        x="48"
        y="33"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.5px"
        fill="#001E62"
      >
        Sage
      </text>
    </svg>
  );
}

export function TvsSupplyChainLogo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M42 16C26 22 18 36 22 49C26 62 42 68 56 64"
        stroke="#0284C7"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 40C20 25 32 12 48 10C64 8 76 18 78 28"
        stroke="#1E3A8A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="36"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="0.5px"
        fill="#1E3A8A"
      >
        TVS
      </text>
      <text
        x="50"
        y="48"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="6.5"
        letterSpacing="0.3px"
        fill="#0284C7"
      >
        Supply Chain
      </text>
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="6.5"
        letterSpacing="0.3px"
        fill="#0284C7"
      >
        Solutions
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

/* ═══════════════════════════════════════════
   NEWS & MEDIA LOGOS
   ═══════════════════════════════════════════ */

export function BwHotelierLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(6, 4)">
        <rect x="0" y="0" width="4" height="4" fill="#E53935" />
        <rect x="0" y="6" width="4" height="4" fill="#E53935" />
        <rect x="0" y="12" width="4" height="4" fill="#E53935" />
        <rect x="0" y="18" width="4" height="4" fill="#E53935" />
        <rect x="0" y="24" width="4" height="4" fill="#E53935" />
        <rect x="6" y="6" width="4" height="4" fill="#E53935" />
        <rect x="6" y="18" width="4" height="4" fill="#E53935" />
        <rect x="6" y="24" width="4" height="4" fill="#E53935" />
      </g>
      <text x="22" y="22" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="16" letterSpacing="1px" fill="#D32F2F">
        BW
      </text>
      <text x="22" y="32" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="2px" fill="#1E293B">
        HOTELIER
      </text>
    </svg>
  );
}

export function RealtyPlusLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="2" y="29" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" letterSpacing="-0.5px" fill="#E53935">
        Realty<tspan fontSize="28" fontWeight="900" dy="-4" fill="#E53935">+</tspan>
      </text>
    </svg>
  );
}

export function OutlookLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="2" y="27" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="900" fontSize="26" letterSpacing="-0.5px" fill="#E53935">
        Outlook
      </text>
    </svg>
  );
}

export function SugermintLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="2" y="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="-0.5px" fill="#111827">
        suger<tspan fill="#E53935">mint</tspan>
      </text>
    </svg>
  );
}

export function AbpLiveLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="35,2 62,34 8,34" fill="#E53935" />
      <polygon points="35,10 52,34 18,34" fill="#B71C1C" />
      <text x="35" y="29" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" fill="white">
        abp
      </text>
      <text x="35" y="47" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="9" letterSpacing="1px" fill="#111827">
        LIVE
      </text>
    </svg>
  );
}

export function News18Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="5" width="86" height="30" rx="4" fill="#0A2540" />
      <text x="45" y="27" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px" fill="white">
        NEWS
      </text>
      <rect x="92" y="5" width="38" height="30" rx="4" fill="#E53935" />
      <text x="111" y="27" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" fill="white">
        18
      </text>
    </svg>
  );
}

export function MoneycontrolLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="158" height="28" rx="4" fill="#0066B2" />
      <path d="M4 26C30 30 70 24 100 28C130 32 150 26 158 24" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" />
      <text x="80" y="23" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.2px" fill="white">
        moneycontrol
      </text>
    </svg>
  );
}

export function NdtvLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="2" y="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="27" letterSpacing="0.5px" fill="#111827">
        N<tspan fill="#111827">D</tspan>TV
      </text>
      <circle cx="51" cy="18" r="3.5" fill="#E53935" />
    </svg>
  );
}

export function IndianRetailerLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="7" width="22" height="22" rx="4" fill="#E53935" />
      <text x="13" y="23" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="13" fill="white">
        R
      </text>
      <text x="30" y="23" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="13.5" letterSpacing="-0.2px" fill="#111827">
        IndianRetailer<tspan fontSize="9" fill="#E53935">.com</tspan>
      </text>
    </svg>
  );
}

export function EconomicTimesLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="3" width="34" height="34" rx="8" fill="#E53935" />
      <text x="19" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="21" fill="white">
        ET
      </text>
      <text x="44" y="20" fontFamily="Georgia, serif" fontWeight="800" fontSize="10" letterSpacing="0.5px" fill="#111827">
        THE ECONOMIC
      </text>
      <text x="44" y="31" fontFamily="Georgia, serif" fontWeight="800" fontSize="10" letterSpacing="0.5px" fill="#111827">
        TIMES
      </text>
    </svg>
  );
}

export const newsMediaOutlets = [
  { name: "BW Hotelier", Logo: BwHotelierLogo },
  { name: "Realty+", Logo: RealtyPlusLogo },
  { name: "Outlook", Logo: OutlookLogo },
  { name: "Sugermint", Logo: SugermintLogo },
  { name: "ABP Live", Logo: AbpLiveLogo },
  { name: "News18", Logo: News18Logo },
  { name: "Moneycontrol", Logo: MoneycontrolLogo },
  { name: "NDTV", Logo: NdtvLogo },
  { name: "Indian Retailer", Logo: IndianRetailerLogo },
  { name: "Economic Times", Logo: EconomicTimesLogo },
];
