"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommunitySvg, CreditCardSvg, HomeSvg } from "@/components/ui/Svg";

export const Links = [
  { href: "/", label: "home", icon: HomeSvg },
  { href: "/community", label: "community", icon: CommunitySvg },
  { href: "/membership", label: "membership", icon: CreditCardSvg },
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
    </>
  );
}
