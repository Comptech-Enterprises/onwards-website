"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useCallback } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
};

/**
 * Premium Bento Card featuring:
 * 1. 3D perspective spring tilt on mouse hover
 * 2. Flat solid crisp white card surface and border
 */
export default function SpotlightCard({
  children,
  className = "",
  enableTilt = true,
}: SpotlightCardProps) {
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

      if (enableTilt) {
        normX.set(x / rect.width - 0.5);
        normY.set(y / rect.height - 0.5);
      }
    },
    [enableTilt, normX, normY],
  );

  const handleMouseLeave = useCallback(() => {
    normX.set(0);
    normY.set(0);
  }, [normX, normY]);

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
      className={`relative rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:border-[#d4622b] transition-colors duration-300 ${className}`}
    >
      {/* Content wrapper */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
