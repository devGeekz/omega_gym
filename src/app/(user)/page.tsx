import ClassSchdules from "@/components/home/ClassSchedules";
import Cta from "@/components/home/Cta";
import EquipmentCards from "@/components/home/EquipementCards";
import { Hero } from "@/components/home/Hero";
import Memberships from "@/components/home/MembershipCards";
import Testimonial from "@/components/home/Testimonial";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="pt-32 px-10">
      <HeroSection />
      <Hero />
      <div className="space-y-20">
        <EquipmentCards />
        <ClassSchdules />
        <Memberships />
        <Testimonial />
        <Cta />
      </div>
    </div>
  );
}
