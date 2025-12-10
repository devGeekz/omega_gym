import Logo from "./Logo";
import NavLinks from "./NavLInks";
import { auth } from "auth";
import { Button } from "../ui/button";
import { DarkthemeBtn } from "./DarkthemeBtn";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import LogoutButton from "../auth/signout";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
      <nav className="relative backdrop-blur-xl bg-background/40 dark:bg-background/30 border border-border/50 md:rounded-full rounded-2xl px-6 py-3 shadow-lg">
        {/* ─── TOP BAR ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <Logo />

          {/* ─── DESKTOP LINKS ─────────────────────────────────────── */}

          <NavLinks />

          {/* ─── RIGHT CONTROLS ───────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <MobileNav />

            {session ? (
              <LogoutButton />
            ) : (
              <>
                <Link href={"/login"}>
                  <Button variant={"outline"}>Become a member</Button>
                </Link>
              </>
            )}
            <DarkthemeBtn />
          </div>
        </div>
      </nav>
    </header>
  );
}
