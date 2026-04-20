import React, { useRef, useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const innerRef = useRef<HTMLElement>(null);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // Combine forwarded ref and internal ref
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(innerRef.current as HTMLButtonElement);
      } else {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          innerRef.current as HTMLButtonElement;
      }
    }, [ref]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);

      if (props.onMouseEnter) props.onMouseEnter(e as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    const Comp: any = asChild ? Slot : "button";

    return (
      <Comp
        ref={innerRef as any}
        className={cn("relative overflow-hidden group", className)}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        <>
          {children}
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
        </>
      </Comp>
    );
  }
);

LiquidButton.displayName = "LiquidButton";
