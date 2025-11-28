"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CommunitySvg,
  CreditCardSvg,
  HamburgerMenuSvg,
  HomeSvg,
} from "@/components/ui/Svg";
import Logo from "./Logo";
import { useState } from "react";
import { DarkthemeBtn } from "./DarkthemeBtn";

const navLinks = [
  { href: "/", label: "home", icon: HomeSvg },
  { href: "/community", label: "community", icon: CommunitySvg },
  { href: "/membership", label: "membership", icon: CreditCardSvg },
  { href: "/login", label: "login" },
  { href: "/register", label: "register" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <nav className="relative backdrop-blur-xl bg-background/40 dark:bg-background/30 border border-border/50 md:rounded-full rounded-2xl px-6 py-3 shadow-lg">
        {/* ─── TOP BAR ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <Logo />

          {/* ─── DESKTOP LINKS ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-md capitalize text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "font-semibold text-foreground bg-accent/30"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    }
                  `}
                >
                  {Icon && <Icon className="hidden md:block" />}
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          {/* ─── RIGHT CONTROLS ───────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <DarkthemeBtn />

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-accent/50 hover:bg-accent transition-colors"
              aria-label="Open menu"
            >
              <HamburgerMenuSvg />
            </button>
          </div>
        </div>

        {/* ─── MOBILE DROPDOWN ────────────────────────────────────── */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all 
                    ${
                      active
                        ? "bg-accent/30 text-foreground"
                        : "text-muted-foreground hover:bg-accent/40"
                    }
                  `}
                >
                  {Icon && <Icon />}
                  <span className="capitalize">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
