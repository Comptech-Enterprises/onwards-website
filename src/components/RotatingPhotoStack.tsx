"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* A compact, responsive 360° ring of photo cards.
   Each card sits in 3D circular perspective with smooth auto-rotation,
   mouse-drag steering, and scroll-linked rotation. */
const srcs = [
  "/images/locations/delhi/gallery/okhla-3/2.jpg",
  "/images/locations/delhi/gallery/okhla-2/3.jpg",
  "/images/locations/delhi/gallery/okhla-3/5.jpg",
  "/images/locations/delhi/gallery/okhla-2/2.jpg",
  "/images/locations/delhi/gallery/okhla-2/6.jpg",
  "/images/locations/delhi/gallery/okhla-3/6.jpg",
  "/images/locations/delhi/gallery/okhla-2/4.jpg",
  "/images/locations/delhi/gallery/okhla-3/7.jpg",
];

const R = 180;
const CARD_W = 100;
const CARD_H = 135;
const step = 360 / srcs.length;

const cards = srcs.map((src, i) => ({ src, theta: i * step }));

export default function RotatingPhotoStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateY, setRotateY] = useState(0);
  const rotateYRef = useRef(0);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotate = useRef(0);

  // Auto-rotation loop
  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (!isHovering.current && !isDragging.current) {
        rotateYRef.current += 0.25;
        setRotateY(rotateYRef.current);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Scroll scrub rotation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      rotateYRef.current += delta * 0.18;
      setRotateY(rotateYRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse move steering
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const delta = (e.clientX - startX.current) * 0.5;
      rotateYRef.current = startRotate.current + delta;
      setRotateY(rotateYRef.current);
      return;
    }
    isHovering.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    rotateYRef.current += (relX - 0.5) * 1.5;
    setRotateY(rotateYRef.current);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRotate.current = rotateYRef.current;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    isDragging.current = false;
  };

  // Touch drag steering for mobile responsiveness
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startRotate.current = rotateYRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const delta = (e.touches[0].clientX - startX.current) * 0.5;
    rotateYRef.current = startRotate.current + delta;
    setRotateY(rotateYRef.current);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[250px] sm:h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "1100px" }}
    >
      <div
        style={{
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="absolute left-1/2 top-1/2 w-0 h-0 transition-transform duration-75 ease-out"
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
            className="absolute rounded-xl overflow-hidden shadow-xl border border-black/10 bg-gray-100 group"
          >
            <Image
              src={c.src}
              alt="Onward Workspaces workspace preview"
              fill
              sizes="110px"
              className="object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
