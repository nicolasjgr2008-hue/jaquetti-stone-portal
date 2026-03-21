import { useEffect, useRef, useState } from 'react';

export const useScrollScale = (options = { threshold: 0.5, maxScale: 1.08 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rid: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rid = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const windowCenter = windowHeight / 2;
          
          const distanceFromCenter = Math.abs(elementCenter - windowCenter) / (windowHeight / 2);
          const proximity = Math.max(0, 1 - distanceFromCenter);
          const newScale = 1 + (options.maxScale - 1) * Math.pow(proximity, 2);
          
          setScale(newScale);
          setIsActive(proximity > options.threshold);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rid);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [options.threshold, options.maxScale]);

  return { ref, scale, isActive };
};
