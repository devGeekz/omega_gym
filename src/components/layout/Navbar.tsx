/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const Navbar = () => {
  return (

<header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
  <nav className="relative backdrop-blur-xl bg-background/40 dark:bg-background/30 border border-border/50 rounded-full px-6 py-3 shadow-lg">
   
    <div className="flex items-center justify-between">

      <div className="flex items-center">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary rounded-full"></div>
          <span className="relative text-primary-foreground font-bold text-sm">L</span>
        </div>
        <span className="ml-2 text-lg font-semibold text-foreground hidden sm:inline">Omega</span>
      </div>

      <div className="hidden md:flex items-center space-x-1">
        <a href="#home" className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house w-4 h-4" aria-hidden="true">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span>Home</span>
          <span className="absolute inset-0 rounded-full bg-accent/30 -z-10 animate-in fade-in zoom-in-95 duration-300"></span>
        </a>
        <a href="#community" className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users w-4 h-4" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Community</span>
        </a>
        <a href="#membership" className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card w-4 h-4" aria-hidden="true">
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
          <span>Membership</span>
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex items-center justify-center h-9 w-9 rounded-full bg-accent/50 hover:bg-accent transition-colors" aria-label="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon w-4 h-4 text-foreground" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </button>
        <button className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-accent/50 hover:bg-accent transition-colors" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu w-5 h-5 text-foreground" aria-hidden="true">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
      <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
        <a href="#home" className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 bg-accent/30 text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house w-4 h-4" aria-hidden="true">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span>Home</span>
        </a>
        <a href="#community" className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users w-4 h-4" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Community</span>
        </a>
        <a href="#membership" className="relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 hover:bg-accent/50 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card w-4 h-4" aria-hidden="true">
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
          <span>Membership</span>
        </a>
      </div>
    </div>
  </nav>
</header>

  );
};

export default Navbar;
