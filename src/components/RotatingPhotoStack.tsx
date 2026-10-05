"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* A full 360° ring of photo cards in 3D perspective.
   Full-size on desktop, scales down progressively and smoothly
   on tablet, laptop, and mobile viewports. */
const srcs = [
  "/images/redesigned/about-us/crafting-workspaces-1st-section/1.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/2.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/3.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/4.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/5.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/6.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/7.webp",
  "/images/redesigned/about-us/crafting-workspaces-1st-section/8.webp",
];

const R = 230;
const CARD_W = 125;
const CARD_H = 168;
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

  // Smooth continuous auto-rotation
  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (!isHovering.current && !isDragging.current) {
        rotateYRef.current += 0.22;
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
      rotateYRef.current += delta * 0.16;
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
    rotateYRef.current += (relX - 0.5) * 1.4;
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

  // Touch drag steering for mobile
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
      className="relative w-full h-[220px] sm:h-[270px] md:h-[310px] lg:h-[340px] xl:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
      style={{ perspective: "1400px" }}
    >
      <div
        style={{
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="absolute left-1/2 top-1/2 w-0 h-0 transition-transform duration-75 ease-out scale-[0.56] sm:scale-[0.72] md:scale-[0.84] lg:scale-[0.92] xl:scale-100 origin-center"
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
            className="absolute rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-gray-100"
          >
            <Image
              src={c.src}
              alt="Onward Workspaces workspace"
              fill
              sizes="140px"
              className="object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
