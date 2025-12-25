import Cta from "@/components/home/Cta";
import EquipmentCards from "@/components/home/EquipementCards";
import { UnlockSection } from "@/components/home/UnlockSection";
import Memberships from "@/components/home/MembershipCards";
import Testimonial from "@/components/home/Testimonial";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="pt-32 px-5 md:px-10 animate-in fade-in duration-500">
      <div className="animate-in slide-in-from-top-4 duration-500">
        <HeroSection />
      </div>
      <div className="animate-in slide-in-from-top-4 duration-500 delay-200">
        <UnlockSection />
      </div>
      <div className="space-y-20 animate-in fade-in duration-500 delay-300">
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <EquipmentCards />
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
          <Memberships />
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-500">
          <Testimonial />
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-600">
          <Cta />
        </div>
      </div>
    </div>
  );
}
