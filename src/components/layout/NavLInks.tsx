"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Users,
  CreditCard,
  CalendarClock,
  FileText,
  LayoutDashboard,
} from "lucide-react";

export const Links = [
  { href: "/community", label: "community", icon: Users },
  { href: "/membership", label: "membership", icon: CreditCard },
  { href: "/schedule", label: "schedules", icon: CalendarClock },
  { href: "/article", label: "article", icon: FileText },
  { href: "/admin/dashboard", label: "admin panel", icon: LayoutDashboard },
];

export default function NavLinks() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ─── DESKTOP LINKS ─────────────────────────────────────── */}
      <div className="hidden md:flex items-center space-x-1">
        {Links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              className={`
                    flex items-center gap-3 px-4 py-2 roundded-md capitalize text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "font-semibold text-foreground border-b-2 border-primary/70"
                        : "text- hover:bg-accent/50 hover:text-accent-foreground"
                    }
                  `}
            >
              {Icon && <Icon className="hidden md:block size-4" />}
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
