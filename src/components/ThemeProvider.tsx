"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(t);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Read the stored preference lazily (SSR-safe). The effect below only syncs
  // the external DOM class, so there's no setState inside an effect.
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined"
      ? "dark"
      : ((localStorage.getItem("portfolio-theme") as Theme | null) ?? "dark")
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
    applyTheme(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* reducedMotion="user" makes every Framer Motion animation honour the
          OS prefers-reduced-motion setting, site-wide. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
