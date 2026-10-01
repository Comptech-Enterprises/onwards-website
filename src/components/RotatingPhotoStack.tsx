"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, type AnimationPlaybackControls } from "framer-motion";
import Image from "next/image";

/* A full 360° ring of photo cards, carousel-style — each card sits on a
   circle (rotateY + translateZ), facing outward. The browser's own 3D
   perspective naturally foreshortens/shrinks cards as they swing toward
   the back. Once the viewer scrolls, the ring auto-spins in a continuous
   loop; hovering takes over and the ring tracks the mouse position. */
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

const cards = srcs.map((src, i) => ({ src, theta: i * step }));

export default function RotatingPhotoStack() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const loop = useRef<AnimationPlaybackControls | null>(null);
  const scrollStarted = useRef(false);
  const hovering = useRef(false);

  const startLoop = (from: number) => {
    loop.current?.stop();
    loop.current = animate(rotateY, [from, from + 360], {
      duration: 14,
      ease: "linear",
      repeat: Infinity,
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (scrollStarted.current || hovering.current) return;
      scrollStarted.current = true;
      startLoop(rotateY.get());
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    hovering.current = true;
    loop.current?.stop();
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    rotateY.set((relX - 0.5) * 2 * 220);
  };

  const handleMouseLeave = () => {
    hovering.current = false;
    if (scrollStarted.current) startLoop(rotateY.get());
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] cursor-grab"
      style={{ perspective: "1600px" }}
    >
      <motion.div
        style={{ rotateY, transformStyle: "preserve-3d" }}
        className="absolute left-1/2 top-1/2 w-0 h-0"
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
      </motion.div>
    </div>
  );
}
