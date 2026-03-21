import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (barRef.current) {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        barRef.current.style.width = `${pct}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-white/70 to-white z-[9999]"
      style={{ width: "0%", transition: "none" }}
    />
  );
};

export default ScrollProgress;
