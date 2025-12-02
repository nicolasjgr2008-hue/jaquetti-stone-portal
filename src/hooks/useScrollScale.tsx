import { useEffect, useRef, useState } from 'react';

export const useScrollScale = (options = { threshold: 0.5, maxScale: 1.08 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      
      // Calculate distance from center (0 = perfectly centered, 1 = at edge)
      const distanceFromCenter = Math.abs(elementCenter - windowCenter) / (windowHeight / 2);
      
      // Calculate scale based on proximity to center
      const proximity = Math.max(0, 1 - distanceFromCenter);
      const newScale = 1 + (options.maxScale - 1) * Math.pow(proximity, 2);
      
      setScale(newScale);
      setIsActive(proximity > options.threshold);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [options.threshold, options.maxScale]);

  return { ref, scale, isActive };
};
