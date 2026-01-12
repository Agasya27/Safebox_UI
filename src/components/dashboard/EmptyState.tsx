import { useEffect, useRef } from "react";
import { Search, FolderOpen, Shield } from "lucide-react";
import SafeboxLogo from "@/assets/safebox-logo.svg";
import gsap from "gsap";

const EmptyState = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }

    // Subtle floating animation for the icon
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Very subtle pulse for the shield
    if (shieldRef.current) {
      gsap.to(shieldRef.current, {
        scale: 1.05,
        opacity: 0.15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Shield Watermark */}
      <Shield
        ref={shieldRef}
        className="absolute w-32 h-32 text-primary/5 -z-10"
      />
      
      {/* Main Icon */}
      <div
        ref={iconRef}
        className="w-16 h-16 rounded-2xl bg-muted/60 border border-border/50 flex items-center justify-center mb-5 shadow-subtle"
      >
        <FolderOpen className="w-7 h-7 text-muted-foreground/50" />
      </div>

      {/* Title with Search Icon */}
      <div className="flex items-center gap-2 mb-2">
        <Search className="w-4 h-4 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold text-foreground">No items found</h3>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
        Try adjusting your search or filter to find what you're looking for.
      </p>

      {/* Safebox Logo Watermark */}
      <img 
        src={SafeboxLogo} 
        alt="Safebox" 
        className="h-5 w-auto opacity-15 mt-10"
      />
    </div>
  );
};

export default EmptyState;
