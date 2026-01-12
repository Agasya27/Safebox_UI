import { useEffect, useRef } from "react";
import { FileText, Key, StickyNote, LogOut, LayoutGrid, X } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Category } from "@/data/dummyData";
import SafeboxLogo from "@/assets/safebox-logo.svg";
import { Button } from "@/components/ui/button";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
}

const navItems: { id: Category | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Items", icon: LayoutGrid },
  { id: "document", label: "Documents", icon: FileText },
  { id: "password", label: "Passwords", icon: Key },
  { id: "note", label: "Notes", icon: StickyNote },
];

const MobileSidebar = ({ isOpen, onClose, activeCategory, onCategoryChange }: MobileSidebarProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Animate in - smooth slide with slight scale for depth
      gsap.set(sidebarRef.current, { x: "-100%", opacity: 1, scale: 0.98 });
      gsap.set(overlayRef.current, { opacity: 0 });
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
      })
      .to(sidebarRef.current, {
        x: 0,
        scale: 1,
        duration: 0.35,
      }, "-=0.25")
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25 },
        "-=0.15"
      );
      
      if (navItemsRef.current) {
        tl.fromTo(
          navItemsRef.current.children,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.04 },
          "-=0.2"
        );
      }
    } else {
      // Animate out - slightly faster, with subtle scale
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      
      tl.to(sidebarRef.current, {
        x: "-100%",
        scale: 0.98,
        duration: 0.28,
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
      }, "-=0.15");
    }
  }, [isOpen]);

  const handleCategorySelect = (category: Category | "all") => {
    onCategoryChange(category);
    // Small delay for visual feedback before closing
    setTimeout(onClose, 120);
  };

  const handleIconHover = (iconElement: SVGSVGElement | null, isEnter: boolean) => {
    if (iconElement) {
      gsap.to(iconElement, {
        scale: isEnter ? 1.12 : 1,
        rotate: isEnter ? 2 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 opacity-0"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar text-sidebar-foreground flex flex-col shadow-xl -translate-x-full"
      >
        {/* Logo Header */}
        <div className="p-5 border-b border-sidebar-border/50 flex items-center justify-between">
          <div ref={logoRef}>
            <img
              src={SafeboxLogo}
              alt="Safebox"
              className="h-6 w-auto brightness-0 invert opacity-90"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-sidebar-foreground/50 font-medium tracking-wide uppercase px-5 pt-4 pb-2">
          Family Dashboard
        </p>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <p className="text-2xs uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-3 mb-2">
            Categories
          </p>
          <ul ref={navItemsRef} className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleCategorySelect(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <Icon
                      onMouseEnter={(e) => handleIconHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleIconHover(e.currentTarget, false)}
                      className="w-5 h-5 transition-colors duration-200"
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border/50">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5" />
            <span className="font-medium text-sm">Back to Home</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
