"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { type ReactNode, useCallback } from "react";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
} & Omit<HTMLMotionProps<"a">, "href" | "ref">;

/** Anchor that gently pulls toward the cursor on hover and springs back on leave. */
export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.35,
  ...rest
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
