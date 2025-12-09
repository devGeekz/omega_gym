import ReviewStatistics from "@/components/community/ReviewStatistics";
import ReviewForm from "@/components/community/ReviewForm";
import ReviewsSection from "@/components/community/ReviewSection";
import SuccessStories from "@/components/community/SuccessStories";
import CoverHero from "@/components/home/CoverHero";

export default function Cpage() {
  return (
    <>
      <CoverHero
        header="Our Community"
        subHeader="Join thousands of members sharing their fitness journeys, success stories, and motivation."
        coverImg="/images/community.jpg"
      />

there is someting needs to be dones
      <ReviewStatistics />
      <SuccessStories />
      <ReviewsSection />
      <ReviewForm />
      {/* <div><PhotoGallery/></div> */}
    </>
  );
}
