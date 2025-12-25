import { mockSuccessStories } from "@/lib/mock-public-pages-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TrendingUp, Eye, Share2 } from "lucide-react";

export default function SuccessStoriesSection() {
  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Success Stories</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real transformations from our amazing community members
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockSuccessStories.map((story) => (
          <Card
            key={story.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="grid md:grid-cols-2 gap-4 p-6">
              {/* Before/After Images */}
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    // src={story.beforeImage}
                    src={'/images/trainer1.jpg'}
                    alt="Before"
                    width={200}
                    height={250}
                    unoptimized
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-gray-600">Before</Badge>
                </div>
                <div className="relative">
                  <Image
                    src={'/images/trainer2.jpg'}
                    // src={story.afterImage}
                    alt="After"
                    width={200}
                    unoptimized
                    height={250}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-600">After</Badge>
                </div>
              </div>

              {/* Story Content */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={story.memberAvatar}
                      alt={story.memberName}
                      width={40}
                      unoptimized
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{story.memberName}</p>
                      {/* <p className="text-xs text-muted-foreground">
                        {new Date(story.startDate).toLocaleDateString()} -{" "}
                        {new Date(story.endDate).toLocaleDateString()}
                      </p> */}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{story.goal}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{story.story}</p>
                </div>

                {/* Results */}
                <div className="mt-auto space-y-3 pt-4 border-t">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Key Results
                  </h4>
                  <ul className="space-y-1">
                    {story.results.slice(0, 3).map((result, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {result}
                      </li>
                    ))}
                  </ul>

                  {story.weight && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs font-semibold mb-1">Weight Change</p>
                      <p className="text-sm font-bold">
                        {story.weight.before}kg → {story.weight.after}kg
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {story.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {story.shares}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
