"use client";

import { useState, useEffect, useRef } from "react";

interface LazyGoogleMapProps {
  src: string;
  title: string;
}

export default function LazyGoogleMap({ src, title }: LazyGoogleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] bg-[#f8f5f0] rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm flex items-center justify-center"
    >
      {isVisible ? (
        <iframe
          src={src}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-gray-500 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#c24f1c]/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#c24f1c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-600">
            Interactive Map Loading...
          </span>
        </div>
      )}
    </div>
  );
}
