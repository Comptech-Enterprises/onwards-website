"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Route change overlay (only runs on client-side navigation after initial mount) */}
      {mounted && (
        <motion.div
          key={pathname + "-overlay"}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[#faf8f5] pointer-events-none"
        />
      )}

      {/* Page content rendered immediately on SSR and initial load */}
      <div key={pathname}>
        {children}
      </div>
    </>
  );
}
