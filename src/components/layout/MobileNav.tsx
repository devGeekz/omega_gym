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

// const Links = [
//   { href: "/", label: "home", icon:  },
//   { href: "/community", label: "community", icon: CommunitySvg },
//   { href: "/membership", label: "membership", icon: CreditCardSvg },
// ];

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
          <DropdownMenuItem>
            <Link href={`/`} className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <HomeSvg />
              </DropdownMenuShortcut>
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/`} className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <CommunitySvg />
              </DropdownMenuShortcut>
              Community
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/`} className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <CreditCardSvg />
              </DropdownMenuShortcut>
              Membership
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
