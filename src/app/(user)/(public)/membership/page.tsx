import { CoverHero } from "@/components/home/CoverHero";
import Cta from "@/components/home/Cta";
import MembershipPlansSection from "@/components/membership/MembershipPlansSection";
import MembershipFAQSection from "@/components/membership/MembershipFAQSection";
import MembershipComparisonSection from "@/components/membership/MembershipComparisonSection";

export default function MembershipPage() {
  return (
    <div className="space-y-20">
      <CoverHero
        header="Membership & Pricing"
        subHeader="Choose the perfect plan for your fitness goals. Flexible memberships, no contracts."
        coverImg="/images/kettles.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MembershipPlansSection />
        <MembershipComparisonSection />
        <MembershipFAQSection />
      </div>

      <Cta />
    </div>
  );
}
