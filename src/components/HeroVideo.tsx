"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start video after initial paint so FCP/LCP are preserved
    const timer = setTimeout(() => {
      setCanLoadVideo(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (canLoadVideo && videoRef.current) {
      const v = videoRef.current;
      v.muted = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires interaction
        });
      }
    }
  }, [canLoadVideo]);

  if (!canLoadVideo) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    >
      <source
        src="/r2/images/redesigned/home-page/hero-video-at-the-top.mp4"
        type="video/mp4"
      />
    </video>
  );
}
