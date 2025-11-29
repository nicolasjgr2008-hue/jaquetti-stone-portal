import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionDividerProps {
  variant?: "default" | "minimal";
}

const SectionDivider = ({ variant = "default" }: SectionDividerProps) => {
  const scrollRevealRef = useScrollReveal();

  if (variant === "minimal") {
    return (
      <div className="relative py-8 overflow-hidden">
        <div 
          ref={scrollRevealRef}
          className="scroll-reveal-scale"
        >
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      <div 
        ref={scrollRevealRef}
        className="scroll-reveal-scale relative z-10"
      >
        <div className="container mx-auto px-6">
          {/* Main Divider Line */}
          <div className="relative flex items-center justify-center gap-4">
            {/* Left Line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
            
            {/* Center Ornament */}
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 blur-xl animate-pulse" />
              </div>
              
              {/* Diamond Shape */}
              <div className="relative w-8 h-8 rotate-45 border-2 border-primary/30 bg-background">
                <div className="absolute inset-0 m-auto w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Right Line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
          </div>

          {/* Decorative Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
