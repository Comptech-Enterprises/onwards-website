"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay that covers screen then slides away */}
      <motion.div
        key={pathname + "-overlay"}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.2, 1] }}
        className="fixed inset-0 z-[9999] bg-[#faf8f5] pointer-events-none"
      />

      {/* Page content fades up */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
