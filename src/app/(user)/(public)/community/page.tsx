import { CoverHero } from "@/components/home/CoverHero";
import CommunityStatsSection from "@/components/community/CommunityStatsSection";
import SuccessStoriesSection from "@/components/community/SuccessStoriesSection";
import ReviewsSection from "@/components/community/ReviewsSection";
import PhotoGallerySection from "@/components/community/PhotoGallerySection";

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <CoverHero
        header="Our Community"
        subHeader="Join thousands of members sharing their fitness journeys, success stories, and motivation."
        coverImg="/images/community.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityStatsSection />
        <SuccessStoriesSection />
        <ReviewsSection />
        <PhotoGallerySection />
      </div>
    </div>
  );
}
