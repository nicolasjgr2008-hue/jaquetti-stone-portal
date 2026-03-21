import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const CONNECT_DIST = 120;
    const MOUSE_FACTOR = isMobile ? 0 : 0.02;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.15 + Math.random() * 0.2,
      size: Math.random() * 1.5 + 0.5,
    }));

    // Mouse tracking (desktop only)
    const handleMouse = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    if (!isMobile) {
      canvas.addEventListener("mousemove", handleMouse);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      const offsetX = (mx - canvas.width / 2) * MOUSE_FACTOR;
      const offsetY = (my - canvas.height / 2) * MOUSE_FACTOR;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Apply parallax offset only at draw time
        const dx = (mx > -1000) ? offsetX : 0;
        const dy = (my > -1000) ? offsetY : 0;

        const drawX = p.x + dx;
        const drawY = p.y + dy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const qx = q.x + dx;
          const qy = q.y + dy;
          
          const ddx = drawX - qx;
          const ddy = drawY - qy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(qx, qy);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / CONNECT_DIST)})`;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        canvas.removeEventListener("mousemove", handleMouse);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-auto"
      style={{ opacity: 1 }}
    />
  );
};

export default HeroParticles;
