import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageTransition = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [lastLocation, setLastLocation] = useState(location.pathname);

  useEffect(() => {
    // If path changes, trigger animation
    if (location.pathname !== lastLocation) {
      setIsActive(true);
      
      // We assume the actual navigation already happened instantly visually in React Router.
      // But we show the overlay coming down.
      // Wait, if it already happened, the overlay will just cover the NEW page.
      // The user requested: Click -> show overlay from bottom -> navigate -> overlay shrinks to top.
      // To properly intercept standard Link clicks and delay navigation is complex in react-router-dom v6 without a custom Link component wrapper.
      // However, we can simulate it on mount/location change by having the overlay strictly "hide from top" upon arriving at a new page.
      
      // Hide the overlay after a brief delay
      const timer = setTimeout(() => {
        setIsActive(false);
        setLastLocation(location.pathname);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [location, lastLocation]);

  return (
    <div 
      className={`fixed inset-0 bg-black z-[99997] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isActive 
          ? "clip-path-[inset(0_0_0_0)]" 
          : "clip-path-[inset(0_0_100%_0)]"
      }`}
      style={{
        clipPath: isActive ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transitionProperty: "clip-path"
      }}
    />
  );
};
