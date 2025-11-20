import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { HomePageSections } from "@/components/ui/home-page-sections";
import { Hero } from "@/components/ui/hr";
export default function Home() {
  return (
    <div>
      <main className="pt-24 min-h-screen flex items-center justify-center">{ <GooeyText texts={["Omega", "Gym", "Is", "Awesome"]} />} </main>
      <Hero />
      <HomePageSections />
    </div>
  );
}
