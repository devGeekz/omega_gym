import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommunitySvg,
  CreditCardSvg,
  HamburgerMenuSvg,
  HomeSvg,
} from "../ui/Svg";
import Link from "next/link";

const Links = [
  { href: "/", label: "home", icon: HomeSvg },
  { href: "/community", label: "community", icon: CommunitySvg },
  { href: "/membership", label: "membership", icon: CreditCardSvg },
];

export function MobileNav() {
  return (
    <div className="md:hidden flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <HamburgerMenuSvg />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          {Links.map((link, index) => (
            <DropdownMenuItem key={index}>
              <Link href={`${link.href}`}>
                {link.label}
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
