"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function DarkthemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Switch
      id="dark-mode"
      checked={isDarkMode}
      onCheckedChange={setIsDarkMode}
    />
  );
}

export function DarkthemeBtn() {
  // Track if the component has mounted in the client
  const [mounted, setMounted] = useState(true);

  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Ensure client-side theme application happens only after initial mount
  useEffect(() => {
    // Deferring state update to avoid immediate cascading render
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;

      // Add a transition class for smooth theme switching
      root.classList.add("theme-transition");
      const timeout = setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 300); // duration matches CSS transition

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
    // Listen for system theme change
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
