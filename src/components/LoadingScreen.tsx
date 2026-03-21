import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Check if the user is visiting for the first time in the session
    const visited = sessionStorage.getItem("visited");
    
    // Disable on reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!visited && !mq.matches) {
      setShow(true);
      
      // Start exit animation at 1.5s
      const exitTimer = setTimeout(() => {
        setExit(true);
      }, 1500);

      // Unmount complete at 2s
      const unmountTimer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("visited", "1");
      }, 2000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(unmountTimer);
      };
    } else {
      // Ensure we immediately mark as visited if we skipped
      sessionStorage.setItem("visited", "1");
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <div 
        className={`fixed inset-0 z-[99998] bg-black flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          exit ? "clip-path-top-hidden" : "clip-path-visible"
        }`}
        style={{
          clipPath: exit ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        }}
      >
        <div className="relative flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest uppercase mb-4"
          >
            Jaquetti
          </motion.h1>
          
          <div className="w-48 h-[2px] bg-white/20 rounded overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
