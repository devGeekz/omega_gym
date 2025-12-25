import { mockCommunityReviews, mockSuccessStories, mockGalleryImages } from "@/lib/mock-public-pages-data";
import { Card } from "@/components/ui/card";
import { Users, Heart, Image as ImageIcon, Zap } from "lucide-react";

export default function CommunityStatsSection() {
  const stats = [
    {
      icon: Users,
      label: "Active Members",
      value: "2,345",
      description: "Growing community",
    },
    {
      icon: Heart,
      label: "Success Stories",
      value: mockSuccessStories.length.toString(),
      description: "Inspiring transformations",
    },
    {
      icon: Zap,
      label: "Reviews & Ratings",
      value: mockCommunityReviews.length.toString(),
      description: "Member feedback",
    },
    {
      icon: ImageIcon,
      label: "Photos Shared",
      value: mockGalleryImages.length.toString(),
      description: "Community moments",
    },
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Community by Numbers</h2>
        <p className="text-lg text-muted-foreground">
          Join thousands of members achieving their fitness goals together
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
              <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <h3 className="font-semibold mb-1">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
