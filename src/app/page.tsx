import { Hero } from "@/components/home/Hero";
import { HomePageSections } from "@/components/home/HomepageSections";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <Hero />
      <HomePageSections />
    </div>
  );
}
