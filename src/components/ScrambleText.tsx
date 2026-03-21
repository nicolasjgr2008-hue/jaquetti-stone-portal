import { useEffect, useRef } from "react";

export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.innerText = text;
      return;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-\\/[]{}—=+*^?#';
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        observer.unobserve(el);
        
        const length = text.length;
        let iteration = 0;
        
        const interval = setInterval(() => {
          el.innerText = text.split('').map((char, index) => {
            if (index < iteration) return text[index];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
          
          if (iteration >= length) {
            clearInterval(interval);
            el.innerText = text; // safeguard
          }
          iteration += 0.4;
        }, 30);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    observer.observe(el);
    
    return () => observer.disconnect();
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
};
