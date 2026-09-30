"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardItem {
  type: "image" | "brand";
  src?: string;
  alt?: string;
  tag?: string;
  bg?: string;
  title?: string;
  subtitle?: string;
}

const CARDS: CardItem[] = [
  {
    type: "image",
    src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp",
    alt: "Enterprise Workspace Okhla",
    tag: "Enterprise Hub",
  },
  {
    type: "brand",
    bg: "bg-gradient-to-br from-[#d4622b] to-[#b8501f] text-white",
    title: "Your vision,",
    subtitle: "our workspace.",
    tag: "Onward Vision",
  },
  {
    type: "image",
    src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790287.webp",
    alt: "Executive Boardroom",
    tag: "Boardrooms",
  },
  {
    type: "brand",
    bg: "bg-gradient-to-br from-[#1a1a2e] via-[#242638] to-[#1a1a2e] text-white",
    title: "11+ Prime Hubs",
    subtitle: "Delhi · Noida · Gurugram",
    tag: "NCR Network",
  },
  {
    type: "image",
    src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613881869.webp",
    alt: "Lush Atrium Lounge",
    tag: "Atrium Lounge",
  },
  {
    type: "brand",
    bg: "bg-gradient-to-br from-[#f1ff66] to-[#e4f542] text-[#1a1a2e]",
    title: "75-Day Turnkey",
    subtitle: "From brief to move-in",
    tag: "Custom Build",
  },
  {
    type: "image",
    src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp",
    alt: "Bespoke Office Interior",
    tag: "Turnkey Interiors",
  },
  {
    type: "image",
    src: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790614051010.webp",
    alt: "Community Barista Lounge",
    tag: "Community",
  },
];

export default function ThreeDCardCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [tilt, setTilt] = useState({ x: -10, y: 0 });

  const totalCards = CARDS.length;
  const angleStep = 360 / totalCards;

  // Auto rotation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered) {
        setRotation((prev) => (prev + delta * 20) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Mouse move tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -10 + (y / (rect.height / 2)) * -8;
    const tiltY = (x / (rect.width / 2)) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: -10, y: 0 });
  };

  const currentRotation = rotation + dragOffset;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[400px] h-[250px] sm:h-[280px] lg:h-[310px] flex items-center justify-center select-none overflow-visible cursor-grab active:cursor-grabbing mx-auto lg:mx-0"
      style={{
        perspective: "800px",
      }}
    >
      {/* Central Ambient Glow */}
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#d4622b]/10 blur-2xl pointer-events-none -z-10" />

      {/* 3D Carousel Cylinder */}
      <motion.div
        className="relative w-[150px] h-[95px] sm:w-[175px] sm:h-[110px] lg:w-[195px] lg:h-[120px]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${currentRotation + tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "none",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDrag={(_, info) => {
          setDragOffset((prev) => prev + info.delta.x * 0.45);
        }}
      >
        {CARDS.map((card, i) => {
          const cardAngle = i * angleStep;
          // Compact 3D cylinder depth radius
          const radius = 200;

          return (
            <div
              key={i}
              className="absolute inset-0 rounded-xl overflow-hidden shadow-xl border border-white/25 backface-visible bg-[#1a1a2e]"
              style={{
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "visible",
                WebkitBackfaceVisibility: "visible",
              }}
            >
              {card.type === "image" && card.src ? (
                <div className="relative w-full h-full">
                  <Image
                    src={card.src}
                    alt={card.alt || "Onward Workspace"}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  {card.tag && (
                    <span className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                  )}
                </div>
              ) : (
                <div className={`w-full h-full p-3 sm:p-3.5 flex flex-col justify-between ${card.bg}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest opacity-80">
                      {card.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold leading-tight tracking-tight">
                      {card.title}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] font-medium opacity-90 mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
