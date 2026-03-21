import { useRef, useEffect } from "react";

export const useTilt = (active: boolean = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    // Disable on mobile touch devices
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return;

    // Respect reduced motion
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mqReduced.matches) return;

    let rid: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.02)`;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rid);
      el.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rid);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.style.transform = "";
    };
  }, [active]);

  return ref;
};
