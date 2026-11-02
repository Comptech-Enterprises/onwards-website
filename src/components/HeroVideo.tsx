"use client";

export default function HeroVideo() {
  return (
    <video
      ref={(el) => { el?.play().catch(() => {}); }}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source
        src="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/home-page/hero-video-at-the-top.mp4"
        type="video/mp4"
      />
    </video>
  );
}
