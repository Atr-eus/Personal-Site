"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: { x: number; y: number; z: number }[] = [];
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const maxDim = Math.max(canvas.width, canvas.height);
      stars = Array.from({ length: 300 }, () => ({
        x: (Math.random() - 0.5) * maxDim * 3,
        y: (Math.random() - 0.5) * maxDim * 3,
        z: Math.pow(Math.random(), 1.5) * maxDim,
      }));
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.z -= 0.3;
        if (star.z <= 1) star.z = Math.max(canvas.width, canvas.height);

        const k = 128 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size =
            (1 - star.z / Math.max(canvas.width, canvas.height)) * 1.8;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + (1 - star.z / canvas.width) * 0.5})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none"
    />
  );
}
