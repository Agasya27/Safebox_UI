import { useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SafeboxLogo from "@/assets/safebox-logo.svg";
import ThemeToggle from "./ThemeToggle";
import gsap from "gsap";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

const MobileHeader = ({ onMenuToggle, theme, onThemeToggle }: MobileHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }

    if (logoContainerRef.current) {
      gsap.fromTo(
        logoContainerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, delay: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const handleMenuPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 0.92,
      duration: 0.08,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        });
      },
    });
    onMenuToggle();
  };

  return (
    <header
      ref={headerRef}
      className="md:hidden flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border/50 sticky top-0 z-40 transition-colors duration-300"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMenuPress}
        className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 h-9 w-9"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div ref={logoContainerRef}>
        <img
          src={SafeboxLogo}
          alt="Safebox"
          className="h-5 w-auto brightness-0 invert opacity-90"
        />
      </div>

      {/* Mobile Theme Toggle */}
      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </header>
  );
};

export default MobileHeader;
