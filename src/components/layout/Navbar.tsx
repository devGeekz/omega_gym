import {
  CommunitySvg,
  CreditCardSvg,
  HamburgerMenuSvg,
  HomeSvg,
} from "@/components/ui/Svg";
import { DarkthemeBtn } from "./DarkthemeBtn";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <nav className="relative backdrop-blur-xl bg-background/40 dark:bg-background/30 border border-border/50 dark:border-border/50 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#home"
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-foreground"
            >
              <HomeSvg />
              <span>Home</span>
              <span className="absolute inset-0 rounded-full bg-accent/30 -z-10 animate-in fade-in zoom-in-95 duration-300"></span>
            </a>
            <a
              href="#community"
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground"
            >
              <CommunitySvg />
              <span>Community</span>
            </a>
            <a
              href="#membership"
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground"
            >
              <CreditCardSvg />
              <span>Membership</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <DarkthemeBtn />
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-accent/50 hover:bg-accent transition-colors"
              aria-label="Open menu"
            >
              <HamburgerMenuSvg />
            </button>
          </div>
        </div>

        <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
          <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
            <a
              href="#home"
              className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 bg-accent/30 text-foreground"
            >
              <HomeSvg />
              <span>Home</span>
            </a>
            <a
              href="#community"
              className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 text-muted-foreground"
            >
              <CommunitySvg />
              <span>Community</span>
            </a>
            <a
              href="#membership"
              className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 text-muted-foreground"
            >
              <CreditCardSvg />
              <span>Membership</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
