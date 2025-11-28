"use client";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
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
