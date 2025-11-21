import { GooeyText } from "@/components/home/gooey-text-morphing";
import { Hero } from "@/components/home/Hero";
import { HomePageSections } from "@/components/home/HomepageSections";
export default function Home() {
  return (
    <div>
      <div className="pt-24 min-h-screen flex items-center justify-center">
        {<GooeyText texts={["Omega", "Gym", "Is", "Awesome"]} />}{" "}
      </div>
      <Hero />
      <HomePageSections />
    </div>
  );
}
