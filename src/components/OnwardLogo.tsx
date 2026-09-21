"use client";

import { motion, type MotionValue } from "framer-motion";

type OnwardLogoProps = {
  className?: string;
  size?: number | string;
  color?: string;
  strokeProgress?: MotionValue<number> | number;
  dotProgress?: MotionValue<number> | number;
  animated?: boolean;
};

/**
 * High-precision vector SVG representation of the Onward Logo.
 * Strictly uses flat solid colors (black, white, or orange #d4622b) with no gradients.
 */
export default function OnwardLogo({
  className = "",
  size = 48,
  color = "#d4622b",
  strokeProgress,
  dotProgress,
  animated = false,
}: OnwardLogoProps) {
  const cornerD = "M 22 26 H 62 C 75.25 26 86 36.75 86 50 V 82";

  if (animated && strokeProgress !== undefined) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <motion.path
          d={cornerD}
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: strokeProgress }}
        />
        <motion.circle
          cx="36"
          cy="64"
          r="14"
          fill={color}
          style={{
            scale: dotProgress ?? strokeProgress,
            opacity: dotProgress ?? strokeProgress,
          }}
          className="origin-[36px_64px]"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={cornerD}
        stroke={color}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="36"
        cy="64"
        r="14"
        fill={color}
      />
    </svg>
  );
}
