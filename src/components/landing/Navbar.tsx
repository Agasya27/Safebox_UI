import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SafeboxLogo from "@/assets/safebox-logo.svg";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Navbar drops in from top with fade
    tl.fromTo(
      navRef.current,
      { opacity: 0, y: -30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
        "-=0.4"
      );
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-5 px-3 md:px-6">
      <nav
        ref={navRef}
        className="w-full max-w-4xl bg-background/90 backdrop-blur-xl border border-border/60 rounded-xl md:rounded-2xl shadow-soft px-4 md:px-8 py-3 md:py-4"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              ref={logoRef}
              src={SafeboxLogo}
              alt="Safebox"
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          {/* Navigation Buttons */}
          <div ref={buttonsRef} className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-foreground/80 hover:text-foreground hover:bg-accent/60 font-medium text-xs md:text-sm px-3 md:px-4 h-8 md:h-9 rounded-full"
            >
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 md:px-6 h-8 md:h-9 font-medium text-xs md:text-sm shadow-subtle cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
