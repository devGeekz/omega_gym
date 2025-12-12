import { CoverHero } from "@/components/home/CoverHero";
import Cta from "@/components/home/Cta";
import Memberships from "@/components/home/MembershipCards";

export default function MembershipPage() {
  return (
    <div className="space-y-40">
      <CoverHero
        header="Membership & Pricing"
        subHeader="Join thousands of members sharing their fitness journeys, success stories, and motivation."
        coverImg="/images/kettles.jpg"
      />

      {/* <div className="text-white px-6 pt-32 pb-20 space-y-40"> */}
      <Memberships />
      <Cta />
    </div>
  );
}
