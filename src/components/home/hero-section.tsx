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
    <section className="min-h-screend flex items-center justify-center px-4 md:py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">Omega Gym</span>
          <br />
          <span className="inline-flex items-center justify-center flex-wrap gap-2 mt-4 sm:mt-6 md:mt-8">
            <span className="text-foreground">Elevate Your</span>
            <RotatingText
              texts={["Physique", "Mind", "Experience", "Performance"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
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
        <p className="text-base sm:text-xs md:text-base text-black text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light dark:text-white">
          Join Omega Gym and embark on a transformative fitness journey tailored
          to your goals. Experience state-of-the-art facilities, expert
          trainers, and a supportive community dedicated to helping you achieve
          your best self.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
            asChild
          >
            <Link href="/login">
              Sign Up Now!!!
              <ArrowRight />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <Link href={"/community"} className="flex items-center">
              <Play />
              Read Community Stories
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center px-4 hidden sm:block overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-black mb-6 dark:text-white">
            Train Like a Champion
          </p>
          <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-8 opacity-60 hover:opacity-80 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">
                  24/7 Access
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Expert Personal Training
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Olympic-Grade Equipment
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Group Fitness Classes
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Recovery Zone
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Nutrition Coaching
                </div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">
                  24/7 Access
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Expert Personal Training
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Olympic-Grade Equipment
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Group Fitness Classes
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Recovery Zone
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Nutrition Coaching
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="text-center px-4 mb-8 sm:hidden overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Train Like a Champion</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-8 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-8 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-6 opacity-60 animate-slide-left-mobile">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">
                  24/7 Access
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Expert Personal Training
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Olympic-Grade Equipment
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Group Fitness Classes
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Recovery Zone
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Nutrition Coaching
                </div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">
                  24/7 Access
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Expert Personal Training
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Olympic-Grade Equipment
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Group Fitness Classes
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Recovery Zone
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  Nutrition Coaching
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
