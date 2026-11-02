"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    // Only load video on desktop devices (width >= 768px) and after mount to avoid choking initial LCP & mobile bandwidth
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        setCanLoadVideo(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!canLoadVideo) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source
        src="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/home-page/hero-video-at-the-top.mp4"
        type="video/mp4"
      />
    </video>
  );
}
