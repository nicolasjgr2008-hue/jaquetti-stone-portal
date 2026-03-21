import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // Combine forwarded ref and internal ref
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(buttonRef.current);
      } else {
        ref.current = buttonRef.current;
      }
    }, [ref]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes (500ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);

      if (props.onMouseEnter) props.onMouseEnter(e);
    };

    return (
      <button
        ref={buttonRef}
        className={cn("relative overflow-hidden group", className)}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center pointer-events-none">
          {children}
        </span>
        
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none liquid-blob"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </button>
    );
  }
);

LiquidButton.displayName = "LiquidButton";
