import { Button } from "@/components/ui/button";
import RotatingText from "./RotatingText";
import Link from "next/link";

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const Play = () => (
  <svg
    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
);

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in duration-500">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-in slide-in-from-top-4 duration-500">
          <span className="bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Omega Gym
          </span>
          <br />
          <span className="inline-flex items-center justify-center flex-wrap gap-3 mt-4 sm:mt-6 md:mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <span className="text-foreground font-semibold">Elevate Your</span>
            <RotatingText
              texts={["Physique", "Mind", "Experience", "Performance"]}
              mainClassName="px-4 sm:px-4 md:px-6 bg-linear-to-r from-primary to-primary/90 text-white overflow-hidden py-2 sm:py-2 md:py-3 justify-center rounded-xl shadow-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-lg text-muted-foreground text-balance max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-in fade-in duration-500 delay-300 font-medium">
          Join Omega Gym and embark on a transformative fitness journey. Experience state-of-the-art facilities, expert trainers, and a supportive community dedicated to your success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-in fade-in duration-500 delay-400">
          <Button
            size="lg"
            className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 group relative overflow-hidden"
            asChild
          >
            <Link href="/login" className="flex items-center">
              Sign Up Now
              <ArrowRight />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-bold border-2 border-primary/50 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <Link href={"/community"} className="flex items-center">
              <Play />
              Read Community Stories
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center px-4 hidden sm:block overflow-hidden animate-in fade-in duration-500 delay-500">
          <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
            Train Like a Champion
          </p>
          <div className="relative overflow-hidden w-full max-w-4xl mx-auto py-4 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-8 opacity-70 hover:opacity-100 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🕐 24/7 Access
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  💪 Expert Training
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🏋️ Olympic Equipment
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  📚 Fitness Classes
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🧘 Recovery Zone
                </div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🕐 24/7 Access
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  💪 Expert Training
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🏋️ Olympic Equipment
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  📚 Fitness Classes
                </div>
                <div className="w-1 h-1 rounded-full bg-border/50" />
                <div className="text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  🧘 Recovery Zone
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="text-center px-4 mb-8 sm:hidden overflow-hidden animate-in fade-in duration-500 delay-500">
          <p className="text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Train Like a Champion</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto py-3 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/50">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-12 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-12 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 opacity-70 animate-slide-left-mobile">
              <div className="flex items-center gap-4 whitespace-nowrap">
                <div className="text-xs font-semibold text-foreground/80">🕐 24/7</div>
                <div className="text-xs font-semibold text-foreground/80">💪 Training</div>
                <div className="text-xs font-semibold text-foreground/80">🏋️ Equipment</div>
                <div className="text-xs font-semibold text-foreground/80">📚 Classes</div>
                <div className="text-xs font-semibold text-foreground/80">🧘 Recovery</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-4 whitespace-nowrap">
                <div className="text-xs font-semibold text-foreground/80">🕐 24/7</div>
                <div className="text-xs font-semibold text-foreground/80">💪 Training</div>
                <div className="text-xs font-semibold text-foreground/80">🏋️ Equipment</div>
                <div className="text-xs font-semibold text-foreground/80">📚 Classes</div>
                <div className="text-xs font-semibold text-foreground/80">🧘 Recovery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
