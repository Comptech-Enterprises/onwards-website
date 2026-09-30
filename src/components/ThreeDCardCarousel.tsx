"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CardData {
  type: "image" | "brand";
  imgUrl?: string;
  tag: string;
  title: string;
  subtitle: string;
  bgColor?: string;
  textColor?: string;
  tagBg?: string;
}

const CARDS_DATA: CardData[] = [
  {
    type: "image",
    imgUrl: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613719810.webp",
    tag: "Enterprise Hub",
    title: "Okhla Phase 2",
    subtitle: "500+ Desks · South Delhi",
  },
  {
    type: "brand",
    tag: "Our Vision",
    title: "Your vision,\nour workspace.",
    subtitle: "Built for scaling teams",
    bgColor: "#f1ff66",
    textColor: "#1a1a2e",
    tagBg: "#1a1a2e",
  },
  {
    type: "image",
    imgUrl: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613790287.webp",
    tag: "Enterprise Suites",
    title: "Okhla Phase 3",
    subtitle: "900+ Desks · Tech Hub",
  },
  {
    type: "brand",
    tag: "NCR Network",
    title: "11+ Prime Hubs",
    subtitle: "Delhi · Noida · Gurugram",
    bgColor: "#d4622b",
    textColor: "#ffffff",
    tagBg: "#ffffff",
  },
  {
    type: "image",
    imgUrl: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/locations/1790613881869.webp",
    tag: "Atrium Lounge",
    title: "Mohan Estate",
    subtitle: "Direct Metro Connectivity",
  },
  {
    type: "brand",
    tag: "Turnkey Build",
    title: "75-Day Delivery",
    subtitle: "From brief to move-in",
    bgColor: "#1a1a2e",
    textColor: "#ffffff",
    tagBg: "#d4622b",
  },
  {
    type: "image",
    imgUrl: "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev/onward/about/1790662449490.webp",
    tag: "Executive CBD",
    title: "Connaught Place",
    subtitle: "Landmark Business Address",
  },
];

export default function ThreeDCardCarousel() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.4);
    camera.lookAt(0, -0.05, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Carousel 3D Group
    const carouselGroup = new THREE.Group();
    carouselGroup.position.set(0, -0.05, 0);
    scene.add(carouselGroup);

    // 4. Generate Card Canvas Textures
    const cardWidth = 1.45;
    const cardHeight = 0.95;
    const count = CARDS_DATA.length;
    const radius = 1.7; // Radius of 3D circular fan
    const angleStep = (Math.PI * 2) / count;

    // Helper: Draw rounded card on dynamic 2D canvas for texture
    const createCardTexture = (card: CardData): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 330;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Rounded rectangle path helper
      const r = 28;
      const w = canvas.width;
      const h = canvas.height;

      const drawRoundedCard = () => {
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.quadraticCurveTo(w, 0, w, r);
        ctx.lineTo(w, h - r);
        ctx.quadraticCurveTo(w, h, w - r, h);
        ctx.lineTo(r, h);
        ctx.quadraticCurveTo(0, h, 0, h - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
      };

      if (card.type === "brand") {
        ctx.save();
        drawRoundedCard();
        ctx.clip();

        // Background
        ctx.fillStyle = card.bgColor || "#1a1a2e";
        ctx.fillRect(0, 0, w, h);

        // Subtle gradient sheen
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.0)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0.15)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Top tag pill
        ctx.fillStyle = card.textColor === "#1a1a2e" ? "#1a1a2e" : "#ffffff";
        ctx.font = "bold 18px Inter, sans-serif";
        ctx.letterSpacing = "2px";
        ctx.fillText(card.tag.toUpperCase(), 34, 52);

        // Indicator dot
        ctx.beginPath();
        ctx.arc(w - 40, 46, 6, 0, Math.PI * 2);
        ctx.fillStyle = card.textColor === "#1a1a2e" ? "#1a1a2e" : "#ffffff";
        ctx.fill();

        // Main Title (Support multi-line)
        ctx.fillStyle = card.textColor || "#ffffff";
        ctx.font = "900 36px Inter, sans-serif";
        ctx.letterSpacing = "-0.5px";
        const lines = card.title.split("\n");
        let yOffset = 180 - (lines.length - 1) * 20;
        lines.forEach((line) => {
          ctx.fillText(line, 34, yOffset);
          yOffset += 42;
        });

        // Subtitle
        ctx.fillStyle = card.textColor === "#1a1a2e" ? "rgba(26,26,46,0.85)" : "rgba(255,255,255,0.85)";
        ctx.font = "600 20px Inter, sans-serif";
        ctx.fillText(card.subtitle, 34, yOffset + 4);

        // Border stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.restore();
      } else {
        // Image card: render placeholder & load asynchronous image
        ctx.save();
        drawRoundedCard();
        ctx.clip();

        // Dark background while image loads
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, w, h);

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        if (card.imgUrl) {
          img.src = card.imgUrl;
          img.onload = () => {
            ctx.save();
            drawRoundedCard();
            ctx.clip();

            // Cover draw image
            const imgAspect = img.width / img.height;
            const canvasAspect = w / h;
            let dw = w;
            let dh = h;
            let dx = 0;
            let dy = 0;
            if (imgAspect > canvasAspect) {
              dw = h * imgAspect;
              dx = (w - dw) / 2;
            } else {
              dh = w / imgAspect;
              dy = (h - dh) / 2;
            }
            ctx.drawImage(img, dx, dy, dw, dh);

            // Vignette gradient
            const vGrad = ctx.createLinearGradient(0, 0, 0, h);
            vGrad.addColorStop(0, "rgba(0,0,0,0.1)");
            vGrad.addColorStop(0.5, "rgba(0,0,0,0.2)");
            vGrad.addColorStop(1, "rgba(0,0,0,0.85)");
            ctx.fillStyle = vGrad;
            ctx.fillRect(0, 0, w, h);

            // Bottom Tag Pill
            ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
            ctx.beginPath();
            ctx.roundRect(28, h - 68, 180, 36, 8);
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.25)";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 16px Inter, sans-serif";
            ctx.fillText(card.tag.toUpperCase(), 42, h - 44);

            // Border outline
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.restore();
            texture.needsUpdate = true;
          };
        }

        ctx.restore();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    // 5. Create 3D Planes for each card
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

    CARDS_DATA.forEach((card, i) => {
      const texture = createCardTexture(card);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);

      const angle = i * angleStep;
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = Math.cos(angle) * radius;

      // Face directly outward from the circle center (exact Brilean fan geometry)
      mesh.rotation.y = angle;

      // Subtle initial isometric tilt
      mesh.rotation.x = -0.06;

      carouselGroup.add(mesh);
    });

    // 6. Interactive Mouse Drag & Parallax
    let isDragging = false;
    let previousMouseX = 0;
    let dragVelocity = 0;
    let targetTiltX = 0.16; // Top-down perspective angle
    let targetTiltY = 0;
    let currentTiltX = 0.16;
    let currentTiltY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      targetTiltY = nx * 0.25;
      targetTiltX = 0.16 + ny * -0.15;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        dragVelocity = deltaX * 0.008;
        carouselGroup.rotation.y += dragVelocity;
        previousMouseX = e.clientX;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMouseX;
        dragVelocity = deltaX * 0.008;
        carouselGroup.rotation.y += dragVelocity;
        previousMouseX = e.touches[0].clientX;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation Render Loop
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Continuous automatic rotation with momentum damping
      if (!isDragging) {
        if (Math.abs(dragVelocity) > 0.001) {
          carouselGroup.rotation.y += dragVelocity;
          dragVelocity *= 0.94; // inertia decay
        } else {
          carouselGroup.rotation.y += delta * 0.32; // smooth auto revolve
        }
      }

      // Smooth camera / carousel tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;
      carouselGroup.rotation.x = currentTiltX;
      carouselGroup.rotation.z = -currentTiltY * 0.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] h-[260px] sm:h-[300px] lg:h-[330px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing mx-auto lg:mx-0 overflow-visible"
    />
  );
}
