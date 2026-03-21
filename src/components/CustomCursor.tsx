import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>();
  
  // Track cursor type state to apply classes
  const [cursorType, setCursorType] = useState<string | null>(null);

  // Use refs for positions to avoid re-renders on every frame
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);

  useEffect(() => {
    // Only run on devices with a real mouse
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    // Show cursor initially if needed, but we start hidden
    
    let rid: number;
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(() => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
        
        if (!isVisible.current) {
          isVisible.current = true;
          if (dotRef.current) dotRef.current.style.opacity = '1';
          if (ringRef.current) ringRef.current.style.opacity = '1';
        }
        
        // Update dot immediately for 0 delay
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`;
        }
      });
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current && !cursorType) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const onGlobalMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
      } else if (
        (e.target as HTMLElement).closest('a') || 
        (e.target as HTMLElement).closest('button')
      ) {
        // Fallback for generic links/buttons if they don't have data-cursor
        setCursorType('button');
      } else {
        setCursorType(null);
      }
    };

    const updateRing = () => {
      // Lerp ring position
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      }

      requestRef.current = requestAnimationFrame(updateRing);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseover', onGlobalMouseOver, { passive: true });
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      cancelAnimationFrame(rid);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onGlobalMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cursorType]);

  // If not on fine pointer, don't render anything
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  // Determine dynamic classes based on cursorType
  let dotClass = "fixed w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[99999] transition-opacity duration-300 left-0 top-0";
  let ringClass = "fixed w-[32px] h-[32px] border border-white/60 rounded-full pointer-events-none z-[99998] transition-all duration-200 ease-out left-0 top-0 flex items-center justify-center";
  let textContent = "";

  if (cursorType === 'button') {
    ringClass += " !w-[56px] !h-[56px] !bg-white/10 !border-transparent backdrop-blur-[2px]";
    dotClass += " !opacity-0";
  } else if (cursorType === 'link') {
    ringClass += " !w-[16px] !h-[16px] !border-white/80";
    dotClass += " !opacity-0";
  } else if (cursorType === 'view') {
    ringClass += " !w-[80px] !h-[80px] !bg-background/80 !border-white/20 backdrop-blur-md";
    dotClass += " !opacity-0";
    textContent = "VER";
  } else if (cursorType === 'quote') {
    ringClass += " !w-[64px] !h-[64px] !border-[#EF9F27] !bg-[#EF9F27]/10";
    dotClass += " !opacity-0";
  }

  return (
    <>
      <div 
        id="cursor-dot" 
        ref={dotRef} 
        className={dotClass}
        style={{ opacity: 0, transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      />
      <div 
        id="cursor-ring" 
        ref={ringRef} 
        className={ringClass}
        style={{ opacity: 0, transform: 'translate(-50%, -50%)', willChange: 'transform, width, height, background-color, border-color' }}
      >
        <span 
          ref={textRef}
          className={`text-[10px] font-bold uppercase tracking-widest text-white transition-opacity duration-200 ${textContent ? 'opacity-100' : 'opacity-0'}`}
        >
          {textContent}
        </span>
      </div>
    </>
  );
};
