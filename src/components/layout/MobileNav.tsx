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
  HomeSvg,
  HamburgerMenuSvg,
  CreditCardSvg,
} from "../ui/Svg"; // Assuming you have proper SVG components or icons
import Link from "next/link";
import { auth } from "auth";
import { AppWindowMacIcon, UserPen } from "lucide-react";

export async function MobileNav() {
  const session = await auth(); // Assuming session management via next-auth

  // Function to determine the role
  const isAdmin = session?.user?.role === "ADMIN"; // Check if the user is an admin
  const isUser = session?.user?.role === "CLIENT"; // Check if the user is a regular user

  return (
    <div className="md:hidden flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <HamburgerMenuSvg />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          {/* Home Link */}
          <DropdownMenuItem>
            <Link href="/" className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <HomeSvg />
              </DropdownMenuShortcut>
              Home
            </Link>
          </DropdownMenuItem>

          {/* Community Link */}
          <DropdownMenuItem>
            <Link href="/community" className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <CommunitySvg />
              </DropdownMenuShortcut>
              Community
            </Link>
          </DropdownMenuItem>

          {/* Membership Link */}
          <DropdownMenuItem>
            <Link href="/membership" className="flex gap-2 items-center">
              <DropdownMenuShortcut>
                <CreditCardSvg />
              </DropdownMenuShortcut>
              Membership
            </Link>
          </DropdownMenuItem>

          {/* Admin Panel (Only for admins) */}
          {isAdmin && (
            <DropdownMenuItem>
              <Link href="/admin" className="flex gap-2 items-center">
                <DropdownMenuShortcut>
                  <AppWindowMacIcon />
                </DropdownMenuShortcut>
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}

          {/* Profile (Only for users) */}
          {isUser && (
            <DropdownMenuItem>
              <Link href="/dashboard" className="flex gap-2 items-center">
                <DropdownMenuShortcut>
                  <UserPen />
                </DropdownMenuShortcut>
                Profile
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
