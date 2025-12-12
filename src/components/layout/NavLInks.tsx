"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"; // Assuming session management with next-auth
import {
  Users,
  CreditCard,
  CalendarClock,
  FileText,
  LayoutDashboard,
} from "lucide-react";

// Links for both user and admin
const allLinks = [
  { href: "/community", label: "Community", icon: Users },
  { href: "/membership", label: "Membership", icon: CreditCard },
  { href: "/schedule", label: "Schedules", icon: CalendarClock },
  { href: "/article", label: "Article", icon: FileText },
];

// Admin-specific links
const adminLinks = [
  { href: "/admin/dashboard", label: "Admin Panel", icon: LayoutDashboard },
];

// User-specific links
const userLinks = [
  { href: "/profile", label: "Profile", icon: LayoutDashboard },
];

export default function NavLinks() {
  const { data: session } = useSession(); // Fetch session data
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Check role for conditional rendering
  const isAdmin = session?.user?.role === "ADMIN";
  const isUser = session?.user?.role === "CLIENT";

  return (
    <>
      {/* ─── DESKTOP LINKS ─────────────────────────────────────── */}
      <div className="hidden md:flex items-center space-x-1">
        {/* Common Links for All Users */}
        {allLinks.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md capitalize text-sm font-medium transition-all duration-200 ${
                active
                  ? "font-semibold text-foreground border-b-2 border-primary/70"
                  : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              {Icon && <Icon className="hidden md:block size-4" />}
              <span>{label}</span>
            </Link>
          );
        })}

        {/* Admin-specific Links */}
        {/* {isAdmin && */}
        {
          adminLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md capitalize text-sm font-medium transition-all duration-200 ${
                  active
                    ? "font-semibold text-foreground border-b-2 border-primary/70"
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                }`}
              >
                {Icon && <Icon className="hidden md:block size-4" />}
                <span>{label}</span>
              </Link>
            );
          })}

        {/* User-specific Links */}
        {isUser &&
          userLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md capitalize text-sm font-medium transition-all duration-200 ${
                  active
                    ? "font-semibold text-foreground border-b-2 border-primary/70"
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                }`}
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
