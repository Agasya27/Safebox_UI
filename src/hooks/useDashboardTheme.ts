import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useDashboardTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("dashboard-theme");
    return (stored as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
