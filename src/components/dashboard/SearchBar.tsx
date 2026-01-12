import { useRef, useEffect } from "react";
import { Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import gsap from "gsap";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const handleFocus = () => {
    if (searchIconRef.current) {
      gsap.to(searchIconRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    if (searchIconRef.current) {
      gsap.to(searchIconRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Search
        ref={searchIconRef}
        className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/60 transition-colors duration-200"
      />
      <Input
        type="text"
        placeholder="Search items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="pl-10 pr-4 py-2.5 w-full md:w-72 lg:w-80 bg-card border-border/80 rounded-xl h-10 text-sm placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200 shadow-subtle"
      />
      {value && (
        <Shield className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
      )}
    </div>
  );
};

export default SearchBar;
