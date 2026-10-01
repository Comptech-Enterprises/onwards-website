"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* A full 360° ring of photo cards, carousel-style — each card sits on a
   circle (rotateY + translateZ), facing outward. The browser's own 3D
   perspective naturally foreshortens/shrinks cards as they swing toward
   the back. Rotation tracks page scroll position (scrub, reversible);
   hovering takes over and the ring tracks the mouse position instead. */
const srcs = [
  "/images/locations/delhi/gallery/okhla-3/2.jpg",
  "/images/locations/delhi/gallery/okhla-2/3.jpg",
  "/images/locations/delhi/gallery/okhla-3/5.jpg",
  "/images/locations/delhi/gallery/okhla-2/2.jpg",
  "/images/locations/delhi/gallery/okhla-2/6.jpg",
  "/images/locations/delhi/gallery/okhla-3/6.jpg",
  "/images/locations/delhi/gallery/okhla-2/4.jpg",
  "/images/locations/delhi/gallery/okhla-3/7.jpg",
  "/images/locations/delhi/gallery/okhla-2/5.jpg",
  "/images/locations/delhi/gallery/okhla-3/1.jpg",
];

const R = 240;
const CARD_W = 130;
const CARD_H = 172;
const step = 360 / srcs.length;
const DEG_PER_PX = 0.15;

const cards = srcs.map((src, i) => ({ src, theta: i * step }));

export default function RotatingPhotoStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateY, setRotateY] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (hovering.current) return;
      setRotateY(window.scrollY * DEG_PER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    hovering.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    setRotateY((relX - 0.5) * 2 * 220);
  };

  const handleMouseLeave = () => {
    hovering.current = false;
    setRotateY(window.scrollY * DEG_PER_PX);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] cursor-grab"
      style={{ perspective: "1600px" }}
    >
      <div
        style={{ transform: `rotateY(${rotateY}deg)`, transformStyle: "preserve-3d" }}
        className="absolute left-1/2 top-1/2 w-0 h-0 transition-transform duration-150 ease-out"
      >
        {cards.map((c, i) => (
          <div
            key={c.src + i}
            style={{
              transform: `rotateY(${c.theta}deg) translateZ(${R}px)`,
              transformStyle: "preserve-3d",
              width: CARD_W,
              height: CARD_H,
              marginLeft: -CARD_W / 2,
              marginTop: -CARD_H / 2,
            }}
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/30"
          >
            <Image src={c.src} alt="Onward Workspaces" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
