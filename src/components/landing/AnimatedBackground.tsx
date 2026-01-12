import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradient1Ref = useRef<HTMLDivElement>(null);
  const gradient2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable animation on mobile for performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // First gradient - slow breathing motion
      gsap.to(gradient1Ref.current, {
        x: 80,
        y: 40,
        scale: 1.1,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Second gradient - counter movement for depth
      gsap.to(gradient2Ref.current, {
        x: -60,
        y: -30,
        scale: 0.95,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle opacity pulse for ambient feel
      gsap.to([gradient1Ref.current, gradient2Ref.current], {
        opacity: 0.4,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* First gradient - positioned top-right */}
      <div
        ref={gradient1Ref}
        className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, hsl(145 30% 45% / 0.25) 0%, hsl(145 25% 40% / 0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Second gradient - positioned bottom-left */}
      <div
        ref={gradient2Ref}
        className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, hsl(150 25% 45% / 0.2) 0%, hsl(140 20% 35% / 0.1) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
