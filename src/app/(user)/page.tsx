import Cta from "@/components/home/Cta";
import EquipmentCards from "@/components/home/EquipementCards";
import { UnlockSection } from "@/components/home/UnlockSection";
import Memberships from "@/components/home/MembershipCards";
import Testimonial from "@/components/home/Testimonial";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="pt-32 px-5 md:px-10">
      <HeroSection />
      <UnlockSection />
      <div className="space-y-20">
        <EquipmentCards />
        <Memberships />
        <Testimonial />
        <Cta />
      </div>
    </div>
  );
}
