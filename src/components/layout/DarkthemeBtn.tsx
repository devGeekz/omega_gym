"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkthemeBtn() {
  // Track if the component has mounted in the client
  const [mounted, setMounted] = useState(false);

  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Ensure client-side theme application happens only after initial mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDarkMode(stored === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;

      // Add a transition class for smooth theme switching
      root.classList.add("theme-transition");
      const timeout = setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 300);

      // Apply dark mode class and save theme in localStorage
      if (isDarkMode) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return () => clearTimeout(timeout);
    }
  }, [isDarkMode, mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Return early if not mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="flex items-center justify-center h-9 w-9 rounded-full bg-accent/50 hover:bg-accent transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
