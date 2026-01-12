import { useRef, useEffect } from "react";
import { LayoutGrid, FileText, Key, StickyNote } from "lucide-react";
import { Category } from "@/data/dummyData";
import gsap from "gsap";

interface CategoryTabsProps {
  activeCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
}

const tabs: { id: Category | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "document", label: "Documents", icon: FileText },
  { id: "password", label: "Passwords", icon: Key },
  { id: "note", label: "Notes", icon: StickyNote },
];

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.25, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, []);

  const handleTabClick = (tabId: Category | "all", e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    
    // Micro bounce feedback
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.15,
          ease: "back.out(2)",
        });
      },
    });
    
    onCategoryChange(tabId);
  };

  const handleIconHover = (iconElement: SVGSVGElement | null, isEnter: boolean) => {
    if (iconElement) {
      gsap.to(iconElement, {
        rotate: isEnter ? 5 : 0,
        scale: isEnter ? 1.1 : 1,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={containerRef} className="flex gap-1.5 flex-wrap md:flex-nowrap overflow-x-auto pb-1 -mb-1 scrollbar-hide">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeCategory === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={(e) => handleTabClick(tab.id, e)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-subtle"
                : "bg-secondary/60 text-secondary-foreground/80 hover:bg-secondary hover:text-secondary-foreground"
            }`}
          >
            <Icon
              onMouseEnter={(e) => handleIconHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleIconHover(e.currentTarget, false)}
              className="w-3.5 h-3.5"
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
