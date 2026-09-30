"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";

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
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  const dragVelocity = useRef(0);
  const isDragging = useRef(false);

  // Smooth mouse tilt spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springTiltX = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const springTiltY = useSpring(mouseX, { stiffness: 120, damping: 20 });

  const totalCards = CARDS.length;
  const angleStep = 360 / totalCards;

  // Continuous animation loop for rotation + wave bobbing physics
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      setTime((t) => t + delta);

      if (!isDragging.current) {
        // Apply inertia decay or continuous slow spin
        if (Math.abs(dragVelocity.current) > 0.1) {
          setRotation((r) => (r + dragVelocity.current) % 360);
          dragVelocity.current *= 0.94; // friction damping
        } else {
          const speed = isHovered ? 8 : 18; // Slow down gracefully on hover
          setRotation((r) => (r + delta * speed) % 360);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Handle mouse move for responsive 3D perspective tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    mouseX.set(x * 12);
    mouseY.set(-14 + y * -8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredCardIdx(null);
    mouseX.set(0);
    mouseY.set(-14);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[400px] h-[260px] sm:h-[290px] lg:h-[320px] flex items-center justify-center select-none overflow-visible cursor-grab active:cursor-grabbing mx-auto lg:mx-0"
      style={{
        perspective: "950px",
      }}
    >
      {/* Dynamic Ambient Color Aura */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#d4622b]/15 via-[#f1ff66]/10 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* 3D Rotating Assembly */}
      <motion.div
        className="relative w-[155px] h-[100px] sm:w-[180px] sm:h-[115px] lg:w-[200px] lg:h-[125px]"
        style={{
          transformStyle: "preserve-3d",
          rotateX: springTiltX,
          rotateY: springTiltY,
          rotateZ: -4, // Signature dynamic isometric slant
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDrag={(_, info) => {
          setRotation((r) => (r + info.delta.x * 0.45) % 360);
          dragVelocity.current = info.velocity.x * 0.02;
        }}
        onDragEnd={() => {
          isDragging.current = false;
        }}
      >
        {CARDS.map((card, i) => {
          const baseAngle = (i * angleStep + rotation) % 360;
          const rad = (baseAngle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);

          // 3D cylinder depth radius
          const cylinderRadius = 210;
          const isFront = cos > 0;
          const isHoveredCard = hoveredCardIdx === i;

          // Floating wave oscillation
          const floatY = Math.sin(time * 2.2 + i * 0.8) * 8;
          const floatRotateZ = Math.cos(time * 1.8 + i) * 3;

          // Depth-based opacity & scaling
          const depthNorm = (cos + 1) / 2; // 0 (back) to 1 (front)
          const scale = 0.86 + depthNorm * 0.22 + (isHoveredCard ? 0.08 : 0);
          const opacity = 0.4 + depthNorm * 0.6;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCardIdx(i)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/30 backface-visible transition-shadow duration-300"
              style={{
                transform: `rotateY(${i * angleStep + rotation}deg) translateZ(${
                  cylinderRadius + (isHoveredCard ? 25 : 0)
                }px) translateY(${floatY}px) rotateZ(${floatRotateZ}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "visible",
                WebkitBackfaceVisibility: "visible",
                opacity,
                zIndex: Math.round(depthNorm * 100),
                boxShadow: isFront
                  ? "0 20px 35px -10px rgba(0,0,0,0.35), 0 0 15px rgba(212,98,43,0.15)"
                  : "0 10px 20px -5px rgba(0,0,0,0.2)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15 }}
            >
              {card.type === "image" && card.src ? (
                <div className="relative w-full h-full bg-[#1a1a2e]">
                  <Image
                    src={card.src}
                    alt={card.alt || "Onward Workspace"}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  {/* Glossy top shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

                  {card.tag && (
                    <span className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
                      {card.tag}
                    </span>
                  )}
                </div>
              ) : (
                <div className={`w-full h-full p-3 sm:p-3.5 flex flex-col justify-between ${card.bg} relative`}>
                  {/* Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest opacity-80">
                      {card.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-ping" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xs sm:text-sm font-black leading-tight tracking-tight">
                      {card.title}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] font-semibold opacity-90 mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
