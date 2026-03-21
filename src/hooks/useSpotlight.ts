import { useRef, useEffect } from "react";

export const useSpotlight = (active: boolean = true) => {
  const ref = useRef<HTMLElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    let rid: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rid);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
};
