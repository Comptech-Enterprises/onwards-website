"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useCallback } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
};

/**
 * Next-level Bento Card featuring:
 * 1. Cursor-following radial spotlight glow
 * 2. 3D perspective spring tilt on mouse hover
 * 3. Luminescent glass border highlight
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(212, 98, 43, 0.12)",
  enableTilt = true,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized coordinates for 3D tilt
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(normY, [-0.5, 0.5], [6, -6]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateYSpring = useSpring(useTransform(normX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 260,
    damping: 24,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      if (enableTilt) {
        normX.set(x / rect.width - 0.5);
        normY.set(y / rect.height - 0.5);
      }
    },
    [enableTilt, mouseX, mouseY, normX, normY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000);
    mouseY.set(-1000);
    normX.set(0);
    normY.set(0);
  }, [mouseX, mouseY, normX, normY]);

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(380px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`,
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateXSpring : 0,
        rotateY: enableTilt ? rotateYSpring : 0,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`relative rounded-3xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(212,98,43,0.12)] transition-shadow duration-500 ${className}`}
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBg,
        }}
      />

      {/* Subtle top reflection sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Content wrapper with preserve-3d */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
