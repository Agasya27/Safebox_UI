import { useState, useMemo, useEffect, useRef } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import SearchBar from "@/components/dashboard/SearchBar";
import CategoryTabs from "@/components/dashboard/CategoryTabs";
import ItemCard from "@/components/dashboard/ItemCard";
import EmptyState from "@/components/dashboard/EmptyState";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { dummyCards, CardItem, Category } from "@/data/dummyData";
import { useDashboardTheme } from "@/hooks/useDashboardTheme";
import gsap from "gsap";

const Dashboard = () => {
  const { theme, toggleTheme } = useDashboardTheme();
  const [cards, setCards] = useState<CardItem[]>(dummyCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || card.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [cards, searchQuery, activeCategory]);

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleCategoryChange = (category: Category | "all") => {
    setActiveCategory(category);
  };

  const categoryCount = useMemo(() => {
    const counts = { all: cards.length, document: 0, password: 0, note: 0 };
    cards.forEach((card) => {
      counts[card.category]++;
    });
    return counts;
  }, [cards]);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-background flex flex-col md:flex-row transition-colors duration-300">
        {/* Mobile Header - Fixed at top */}
        <MobileHeader onMenuToggle={() => setIsMobileSidebarOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 overflow-auto transition-colors duration-300">
          {/* Header with Theme Toggle */}
          <header ref={headerRef} className="mb-6 md:mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 md:mb-1.5 tracking-tight transition-colors duration-300">
                  Your Items
                </h1>
                <p className="text-muted-foreground text-sm md:text-base transition-colors duration-300">
                  Manage your documents, passwords, and notes securely.
                  <span className="text-muted-foreground/60 ml-1.5">
                    {categoryCount.all} total items
                  </span>
                </p>
              </div>
              {/* Desktop Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
            </div>
          </header>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-6 md:mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 lg:gap-6">
            {filteredCards.map((card, index) => (
              <ItemCard key={card.id} item={card} onRemove={handleRemoveCard} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  </div>
);
};

export default Dashboard;
