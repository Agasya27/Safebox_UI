import { useState, useMemo, useEffect, useRef } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import SearchBar from "@/components/dashboard/SearchBar";
import CategoryTabs from "@/components/dashboard/CategoryTabs";
import ItemCard from "@/components/dashboard/ItemCard";
import EmptyState from "@/components/dashboard/EmptyState";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import ChatWidget from "@/components/dashboard/ChatWidget";
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
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-background transition-colors duration-300 md:flex-row">
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
        <main className="flex-1 overflow-auto p-4 transition-colors duration-300 md:p-6 lg:p-8 xl:p-10">
          {/* Header with Theme Toggle */}
          <header ref={headerRef} className="mb-6 md:mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-1 text-xl font-bold tracking-tight text-foreground transition-colors duration-300 md:mb-1.5 md:text-2xl lg:text-3xl">
                  Your Items
                </h1>
                <p className="text-sm text-muted-foreground transition-colors duration-300 md:text-base">
                  Manage your documents, passwords, and notes securely.
                  <span className="ml-1.5 text-muted-foreground/60">{categoryCount.all} total items</span>
                </p>
              </div>
              {/* Desktop Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
            </div>
          </header>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-center md:gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          </div>

          {/* Cards Grid */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:grid-cols-3">
              {filteredCards.map((card, index) => (
                <ItemCard key={card.id} item={card} onRemove={handleRemoveCard} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>

      {/* Static floating assistant preview */}
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
