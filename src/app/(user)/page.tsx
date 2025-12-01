import { Hero } from "@/components/home/Hero";
import { HomePageSections } from "@/components/home/HomepageSections";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="pt-32 px-10">
      <HeroSection />
      <Hero />
      <HomePageSections />
    </div>
  );
}
