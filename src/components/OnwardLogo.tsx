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
 * Features the signature 90-degree rounded top-right corner arm and core inner dot.
 */
export default function OnwardLogo({
  className = "",
  size = 48,
  color = "#d4622b",
  strokeProgress,
  dotProgress,
  animated = false,
}: OnwardLogoProps) {
  // Corner path definition
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
        <defs>
          <linearGradient id="onwardLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#d4622b" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Outer rounded chevron arm */}
        <motion.path
          d={cornerD}
          stroke="url(#onwardLogoGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: strokeProgress }}
        />

        {/* Inner dot */}
        <motion.circle
          cx="36"
          cy="64"
          r="14"
          fill="url(#onwardLogoGrad)"
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
      <defs>
        <linearGradient id="onwardStaticGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d={cornerD}
        stroke={color === "currentColor" ? "currentColor" : "url(#onwardStaticGrad)"}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="36"
        cy="64"
        r="14"
        fill={color === "currentColor" ? "currentColor" : "url(#onwardStaticGrad)"}
      />
    </svg>
  );
}
