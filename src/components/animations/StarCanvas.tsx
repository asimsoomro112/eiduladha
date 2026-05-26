"use client"
import React, { useEffect, useRef } from "react"

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  delta: number;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (stars.length === 0) {
        initStars();
      }
    };

    const initStars = () => {
      stars = [];
      const numStars = 120;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.4,
          speed: Math.random() * 0.02 + 0.005,
          alpha: Math.random(),
          delta: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff8e7"; // soft warm gold stars

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle logic
        star.alpha += star.speed * star.delta;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.delta = -1;
        } else if (star.alpha <= 0.05) {
          star.alpha = 0.05;
          star.delta = 1;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
