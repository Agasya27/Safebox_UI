import { useRef, useEffect } from "react";
import { Eye, Trash2, FileText, Key, StickyNote, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardItem, Category, getCategoryLabel } from "@/data/dummyData";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import gsap from "gsap";

interface ItemCardProps {
  item: CardItem;
  onRemove: (id: string) => void;
  index: number;
}

const categoryConfig: Record<Category, { icon: React.ElementType; bg: string; text: string; border: string }> = {
  document: {
    icon: FileText,
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  password: {
    icon: Key,
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
  },
  note: {
    icon: StickyNote,
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100",
  },
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const { label, colorClass, strength } = usePasswordStrength(password);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barsRef.current) {
      gsap.fromTo(
        barsRef.current.children,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, []);

  const strengthBars = {
    weak: 1,
    medium: 2,
    strong: 3,
  };

  return (
    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-border/50">
      <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground/50" />
      <span className="text-xs text-muted-foreground/70">Strength</span>
      <div ref={barsRef} className="flex gap-1">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={`w-5 h-1 rounded-full transition-colors duration-200 origin-left ${
              bar <= strengthBars[strength]
                ? strength === "weak"
                  ? "bg-strength-weak"
                  : strength === "medium"
                  ? "bg-strength-medium"
                  : "bg-strength-strong"
                : "bg-border"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${colorClass}`}>{label}</span>
    </div>
  );
};

const ItemCard = ({ item, onRemove, index }: ItemCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const config = categoryConfig[item.category];
  const CategoryIcon = config.icon;

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: index * 0.06,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  const handleRemove = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.96,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => onRemove(item.id),
      });
    }
  };

  const handleIconHover = (isEnter: boolean) => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: isEnter ? 1.05 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(iconRef.current.querySelector("svg"), {
        rotate: isEnter ? 5 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const icon = e.currentTarget.querySelector("svg");
    if (icon) {
      gsap.to(icon, {
        scale: isEnter ? 1.1 : 1,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  };

  return (
    <Card
      ref={cardRef}
      className="bg-card border-border/60 shadow-card overflow-hidden group transition-[transform,box-shadow] duration-[220ms] ease-out md:hover:-translate-y-1 md:hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              ref={iconRef}
              onMouseEnter={() => handleIconHover(true)}
              onMouseLeave={() => handleIconHover(false)}
              className={`w-9 h-9 rounded-lg ${config.bg} ${config.border} border flex items-center justify-center shrink-0 cursor-pointer transition-shadow duration-200 hover:shadow-subtle`}
            >
              <CategoryIcon className={`w-4 h-4 ${config.text}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-card-foreground truncate leading-tight">
                {item.title}
              </h3>
              <span className={`text-xs font-medium ${config.text} mt-0.5 inline-block`}>
                {getCategoryLabel(item.category)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-5 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        {item.category === "password" && item.password && (
          <PasswordStrengthIndicator password={item.password} />
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            className="flex-1 text-muted-foreground/70 border-border/60 hover:text-foreground hover:bg-accent/50 hover:border-border h-9 text-xs font-medium"
            disabled
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            className="flex-1 text-destructive/80 border-destructive/20 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive h-9 text-xs font-medium transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
