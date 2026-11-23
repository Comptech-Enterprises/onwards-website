"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

export default function LazySection({
  children,
  minHeight = "200px",
  rootMargin = "300px",
}: {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: inView ? undefined : minHeight }}>
      {inView ? children : null}
    </div>
  );
}
