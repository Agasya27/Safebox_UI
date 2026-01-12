import { useEffect, useRef } from "react";
import { FileText, Key, StickyNote, LogOut, LayoutGrid, PanelLeftClose, PanelLeft } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Category } from "@/data/dummyData";
import SafeboxLogo from "@/assets/safebox-logo.svg";

interface SidebarProps {
  activeCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems: { id: Category | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Items", icon: LayoutGrid },
  { id: "document", label: "Documents", icon: FileText },
  { id: "password", label: "Passwords", icon: Key },
  { id: "note", label: "Notes", icon: StickyNote },
];

const Sidebar = ({ activeCategory, onCategoryChange, isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      sidebarRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4 }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.3 },
        "-=0.2"
      )
      .fromTo(
        navItemsRef.current?.children || [],
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
        "-=0.15"
      );
  }, []);

  // Animate sidebar collapse/expand
  useEffect(() => {
    if (!sidebarRef.current || !contentRef.current) return;

    gsap.to(sidebarRef.current, {
      width: isCollapsed ? 72 : 288,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(contentRef.current, {
      opacity: isCollapsed ? 0 : 1,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [isCollapsed]);

  const handleIconHover = (iconElement: SVGSVGElement | null, isEnter: boolean) => {
    if (iconElement) {
      gsap.to(iconElement, {
        scale: isEnter ? 1.15 : 1,
        rotate: isEnter ? 3 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="hidden md:flex w-72 bg-sidebar text-sidebar-foreground flex-col min-h-screen overflow-hidden"
    >
      {/* Logo Header */}
      <div className="p-5 lg:p-6 border-b border-sidebar-border/50 flex items-center justify-between">
        <div ref={contentRef} className={isCollapsed ? "hidden" : "block"}>
          <img
            ref={logoRef}
            src={SafeboxLogo}
            alt="Safebox"
            className="h-6 lg:h-7 w-auto brightness-0 invert opacity-90"
          />
          <p className="text-xs text-sidebar-foreground/50 mt-2.5 font-medium tracking-wide uppercase">
            Family Dashboard
          </p>
        </div>
        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4">
        <p className={`text-2xs uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-3 mb-2 ${isCollapsed ? "hidden" : "block"}`}>
          Categories
        </p>
        <ul ref={navItemsRef} className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onCategoryChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-left transition-all duration-200 group ${
                    isCollapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    onMouseEnter={(e) => handleIconHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleIconHover(e.currentTarget, false)}
                    className="w-4.5 h-4.5 transition-colors duration-200 flex-shrink-0"
                  />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-sidebar-border/50">
        <Link
          to="/"
          className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 group ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Back to Home" : undefined}
        >
          <LogOut className="w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Back to Home</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
