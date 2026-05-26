"use client"
import React, { useEffect, useRef } from "react"

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaDelta: number;
    }

    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = 35;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -(Math.random() * 0.4 + 0.1),
          alpha: Math.random() * 0.6 + 0.2,
          alphaDelta: (Math.random() - 0.5) * 0.008,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Update alpha (twinkle)
        p.alpha += p.alphaDelta;
        if (p.alpha > 0.8) { p.alpha = 0.8; p.alphaDelta = -Math.abs(p.alphaDelta); }
        if (p.alpha < 0.1) { p.alpha = 0.1; p.alphaDelta = Math.abs(p.alphaDelta); }

        // Wrap around
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        // Draw gold dot with glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = "rgba(245, 200, 66, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fillStyle = "#f5c842";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}
